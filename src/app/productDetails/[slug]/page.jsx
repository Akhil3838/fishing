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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <section className="singleproduct-section">
        <div className="container">
          <SingleProduct product={product} variants={variants} />

          <div className="row">
            <div className="col-lg-12">
              <ul className="productTabs nav nav-tabs">
                <li>
                  <a 
                    className={activeTab === 'description' ? 'active' : ''} 
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </a>
                </li>
                {/* <li>
                  <a 
                    className={activeTab === 'additional' ? 'active' : ''} 
                    onClick={() => setActiveTab('additional')}
                  >
                    Additional Information
                  </a>
                </li> */}
                {/* <li>
                  <a 
                    className={activeTab === 'reviews' ? 'active' : ''} 
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({product?.reviews?.length || 0})
                  </a>
                </li> */}
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
                  <div className="tab-pane fade">
                    <div className="tab-info">
                      <table>
                        <tbody>
                          <tr>
                            <th>Size</th>
                            <td><p>{product.size}</p></td>
                          </tr>
                          <tr>
                            <th>Weight</th>
                            <td><p>{product.weight}</p></td>
                          </tr>
                          <tr>
                            <th>Color</th>
                            <td><p>{product.color}</p></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="tab-pane fade">
                    <div className="tab-info">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                          <div key={index}>
                            <p><strong>{review.author}:</strong> {review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
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
