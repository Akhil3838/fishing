"use client";
import React, { useEffect, useState } from 'react';
import { NewproctApi } from '../services/allApi';
import Link from 'next/link';

function Newproducts({ activeCategory }) {
  const [products, setProducts] = useState([]);

  const categoryProduct = async () => {
    try {
      console.log("Fetching products for category:", activeCategory);
      const result = await NewproctApi(activeCategory);

      if (result?.data?.products) {
        setProducts(result.data.products);
        console.log("Products fetched:", result.data.products);
      } else {
        console.warn("No products found or invalid response format:", result);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      categoryProduct();
    }
  }, [activeCategory]);

  return (
    <>
      <div className="tab-content">
        <div className="tab-pane fade show in active" id="all" role="tabpanel">
          <div className="row">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="product-item-1 text-center">
                    <div className="product-thumb">
                      <img
                        src={product.icon || "/assets/images/product/default.png"}
                        alt={product.name}
                      />
                      <div className="product-meta">
                        <Link href={`/productDetails/${product?.slug}`} className="view">
                          <i className="nss-eye1"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="product-details">
                      <h5>
                        <Link href={`/productDetails/${product._id}`}>
                          {product?.product_name || "Unnamed Product"}
                        </Link>
                      </h5>
                      <div className="ratings">
                        <i className="icon_star_alt"></i>
                        <i className="icon_star_alt"></i>
                        <i className="icon_star_alt"></i>
                        <i className="icon_star_alt"></i>
                        <i className="icon_star_alt"></i>
                        <span>({product.rating || 1})</span>
                      </div>
                      <div className="product_price clearfix">
                        <span className="price">
                          <span>
                            ₹
                            {product?.sku_new?.[0]?.special_price || 'N/A'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No products available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Newproducts;
