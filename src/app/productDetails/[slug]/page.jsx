'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SingleProduct from '../../components/SingleProduct';
import { getSignleProduct } from '@/app/services/allApi';

function ProductDetails() {
  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const fetchedProduct = await getSignleProduct(slug, reqHeader);
        const productData = fetchedProduct.data.product;
        setProduct(productData);
        setVariants(productData.variants || []);
      } catch (error) {
        console.error('Failed to fetch product', error);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      author: reviewerName,
      comment: reviewText,
      rating: rating
    };

    setProduct(prev => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview],
    }));

    setReviewerName('');
    setReviewText('');
    setRating(0);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <section className="singleproduct-section py-5">
        <div className="container">
          <SingleProduct product={product} variants={variants} />

          <div className="row mt-4">
            <div className="col-lg-12">
              <ul className="productTabs nav nav-tabs mb-3">
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('description')}
                    role="button"
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('additional')}
                    role="button"
                  >
                    Additional Information
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('reviews')}
                    role="button"
                  >
                    Reviews ({product?.reviews?.length || 0})
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="tab-pane fade show active">
                    <div className="tab-description">
                      <p>{product.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'additional' && (
                  <div className="tab-pane fade show active">
                    <div className="tab-info">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Size</th>
                            <td>{product.size}</td>
                          </tr>
                          <tr>
                            <th>Weight</th>
                            <td>{product.weight}</td>
                          </tr>
                          <tr>
                            <th>Color</th>
                            <td>{product.color}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="tab-pane fade show active">
                    <div className="tab-info">
                      <h5 className="mb-3">Customer Reviews</h5>

                      {/* Display Reviews */}
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                          <div key={index} className="mb-3 p-3 border rounded shadow-sm">
                            <p className="mb-1"><strong>{review.author}</strong></p>
                            <p className="mb-1">
                              {'★'.repeat(review.rating || 0)}
                              {'☆'.repeat(5 - (review.rating || 0))}
                            </p>
                            <p className="mb-0">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
                      )}

                      <hr className="my-4" />

                      {/* Add Review Form */}
                      <h6>Add Your Review</h6>
                      <form onSubmit={handleReviewSubmit}>
                        {/* Star Rating */}
                        <div className="mb-3">
                          <label className="form-label">Your Rating</label>
                          <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '1.5rem',
                                  color: star <= rating ? '#ffc107' : '#e4e5e9'
                                }}
                                onClick={() => setRating(star)}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="reviewerName" className="form-label">Your Name</label>
                          <input
                            type="text"
                            id="reviewerName"
                            className="form-control"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="reviewText" className="form-label">Your Review</label>
                          <textarea
                            id="reviewText"
                            className="form-control"
                            rows="3"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit Review</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetails;
