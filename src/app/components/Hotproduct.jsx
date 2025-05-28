import React, { useEffect, useState } from 'react'
import { HotproductApi } from '../services/allApi'

function Hotproduct() {
  const [products, setProducts] = useState([])

  const Hotproducts = async () => {
    const result = await HotproductApi()
    setProducts(result.data.products)
  }

  useEffect(() => {
    Hotproducts()
  }, [])

  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="product-item-2 text-center">
              <div className="product-thumb">
                <img src={product?.icon} alt="product" className="img-fluid" />
              </div>
              <div className="product-details">
                <h5><a href="single-product.html">{product?.product_name}</a></h5>
                <div className="ratings">
                  <i className="icon_star_alt"></i>
                  <i className="icon_star_alt"></i>
                  <i className="icon_star_alt"></i>
                  <i className="icon_star_alt"></i>
                  <i className="icon_star_alt"></i>
                  <span>(1)</span>
                </div>
                <div className="product_price clearfix">
                  <span className="price"><span> ₹</span>{product?.sku_new[0].price}</span>
                </div>
                <div className="product-meta">
                  <a href="single-product.html" className="view"><i className="nss-eye1"></i></a>
                  {/* <a href="cart.html" className="cart"><i className="nss-shopping-cart1"></i></a> */}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No products found.</p>
        </div>
      )}
    </div>
  )
}

export default Hotproduct
