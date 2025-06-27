'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SingleProduct from '../../components/SingleProduct';
import { getSignleProduct, addReviewApi } from '@/app/services/allApi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function ProductDetails() {
  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [viewReview, setViewReview] = useState([]);

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
  console.log(fetchedProduct);
  
        setProduct(productData);
        setVariants(productData.variants || []);
        setViewReview(fetchedProduct?.data?.product?.reviews || []);
      } catch (error) {
        console.error('Failed to fetch product', error);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (reviewerName.trim() === '' || reviewText.trim() === '' || !rating) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const newReview = {
      name: reviewerName,
      comment: reviewText,
      rating: rating,
      product_id: product._id || product.id,
    };

    try {
      const response = await addReviewApi(newReview, reqHeader);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Review submitted successfully!',
          showConfirmButton: false,
          timer: 1000,
          position: 'top',
          toast: true
        });

        setProduct(prev => ({
          ...prev,
          reviews: [...(prev.reviews || []), {
            author: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment
          }]
        }));

        setViewReview(prev => [...prev, {
          author: newReview.name,
          rating: newReview.rating,
          comment: newReview.comment
        }]);

        setReviewerName('');
        setReviewText('');
        setRating(0);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  if (!product) {
    return <div></div>;
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
                  <a className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')} role="button">
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`} onClick={() => setActiveTab('additional')} role="button">
                    Additional Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')} role="button">
                    Reviews ({viewReview?.length || 0})
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="tab-pane fade show active">
<div className="tab-description">
  <p className="table-description">{product.description}</p>

  <div className="table-container ">
    <table className="custom-table start">
      <thead>
        <tr>
          <th>Model No.</th>
          <th>Length</th>
          <th>Weight (apprx)</th>
          <th>Sections</th>
          <th>Rod Action</th>
          <th>P.E</th>
          <th>Cast Weight</th>
          <th>No. of Guides</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>IND-3M-702MH</td>
          <td>7Ft</td>
          <td>135g</td>
          <td>2</td>
          <td>Regular<br />Fast</td>
          <td>1–2.5</td>
          <td>5–40Gm</td>
          <td>6+1</td>
        </tr>
        <tr>
          <td>IND-802MH</td>
          <td>8Ft</td>
          <td>186g</td>
          <td>2</td>
          <td>Regular<br />Fast</td>
          <td>1.5–3</td>
          <td>8–60Gm</td>
          <td>6+1</td>
        </tr>
        <tr>
          <td>IND-902MH</td>
          <td>9Ft</td>
          <td>220g</td>
          <td>2</td>
          <td>Regular<br />Fast</td>
          <td>1.5–3</td>
          <td>10–70Gm</td>
          <td>6+1</td>
        </tr>
      </tbody>
    </table>
  </div>
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

      {viewReview && viewReview.length > 0 ? (
        viewReview.map((review, index) => (
          <div key={index} className="mb-3 p-3 border rounded shadow-sm">
            <p className="mb-1"><strong>{review.name}</strong></p>
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

      {product?.allow_review ? (
        <>
          <h6>Add Your Review</h6>
          <form onSubmit={handleReviewSubmit}>
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
        </>
      ) : (
        <p className="text-muted">Reviews are not allowed for this product.</p>
      )}
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
