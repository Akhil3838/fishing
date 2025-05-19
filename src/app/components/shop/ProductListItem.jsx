import Link from 'next/link'
import React from 'react'

const ProductListItem = ({ product }) => {
  return (
    <div className="product-list-view">
      <div className="row">
        <div className="col-lg-4 col-md-5">
          <div className="product-thumb">
            <img src={product.icon} alt="product" />
          </div>
        </div>
        <div className="col-lg-8 col-md-7">
          <div className="product-details">
            <h5> <Link href={`/productDetails/${product?.slug}`}>
            {product?.product_name}
          </Link></h5>
            <div className="ratings">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="icon_star_alt"></i>
              ))}
              <span>( 1 )</span>
            </div>
            <div className="product_price clearfix">
              <span className="price"><span><span>$</span>{product?.sku_new[0].special_price.toFixed(2)}</span></span>
            </div>
            <p>{product.short_description}</p>
            <div className="listing-meta">
              <a className="add-to-cart" href="cart.html"><i className="nss-shopping-cart1"></i>Add To Cart</a>
               <Link  className="view" href={`/productDetails/${product?.slug}`}>
          <i className="nss-eye1"></i>
          </Link>
              {/* <a href="single-product.html" className="view"></a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem