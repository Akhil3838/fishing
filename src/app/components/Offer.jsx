import React, { useEffect, useState } from 'react'
import { OfferproductApi } from '../services/allApi'

function Offer() {

      const [products, setProducts] = useState([])
    
      const Hotproducts = async () => {
        const result = await OfferproductApi()
        setProducts(result.data.products)
      }
    
      useEffect(() => {
        Hotproducts()
      }, [])
    
    console.log(products);
    
  return (
    <>
      <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2 className="sec_titles">Deals & Offer</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 col-md-12">
        <div className="discount-product overlay-anim">
          <div className="content-ds">
            <h3>
              <span>Hurry Up</span>
              Deal of the Day
            </h3>
            <p>
              {products[0]?.product_name}
            </p>
<small className="two-line-text">{products[0]?.short_description}</small>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[0]?.sku_new[0]?.price}

                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[0]?.sku_new[0]?.special_price}
                  </span>
                </ins>
              </span>
            </div>
            <a className="fishto-btn" href="single-product.html">Buy Now</a>
          </div>
          <div className="ds-thumb">
            <img src={products[0]?.icon} alt="image" />
          </div>
        </div>
      </div>

      {/* Product Item 1 */}
      <div className="col-lg-3 col-md-6 ">
        <div className="product-item-2 text-center">
          <div className="product-thumb">
            <img src={products[1]?.icon} alt="image" />
          </div>
          <div className="product-details">
            <h5><a href="single-product.html">{products[1]?.product_name}</a></h5>
            <div className="ratings">
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <span>( 1 )</span>
            </div>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[1]?.sku_new[0]?.price}
                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[1]?.sku_new[0]?.special_price}
                  </span>
                </ins>
              </span>
            </div>
            <div className="product-meta">
              <a href="single-product.html" className="view"><i className="nss-eye1"></i></a>
              {/* <a href="wishlist.html" className="whishlist"><i className="nss-heart1"></i></a> */}
              <a href="cart.html" className="cart"><i className="nss-shopping-cart1"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Item 2 */}
      <div className="col-lg-3 col-md-6">
        <div className="product-item-2 text-center">
          <div className="product-thumb">
            <img src={products[2]?.icon} alt="image" />
          </div>
          <div className="product-details">
            <h5><a href="single-product.html">{products[2]?.product_name}</a></h5>
            <div className="ratings">
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <span>( 1 )</span>
            </div>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[2]?.sku_new[0]?.price}
                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[2]?.sku_new[0]?.special_price}
                  </span>
                </ins>
              </span>
            </div>
            <div className="product-meta">
              <a href="single-product.html" className="view"><i className="nss-eye1"></i></a>
              {/* <a href="wishlist.html" className="whishlist"><i className="nss-heart1"></i></a> */}
              <a href="cart.html" className="cart"><i className="nss-shopping-cart1"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default Offer