import React from 'react'

function CartItem() {
  return (
    <>
            <form className="woocommerce-cart-form" action="#">
          <table className="cart-table">
            <thead>
              <tr>
                <th className="product-remove">&nbsp;</th>
                <th className="product-name-thumbnail">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-total">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cart-item">
                <td className="product-remove">
                  <a href="#">X</a>
                </td>
                <td className="product-thumbnail-title">
                  <a href="#" className="pd-img">
                    <img src="assets/images/product/c1.jpg" alt="product" />
                  </a>
                  <a className="product-name" href="single-product.html">Black Moor Gold Fish</a>
                </td>
                <td className="product-unit-price">
                  <div className="product_price clearfix">
                    <span className="price"><span><span>$</span>120.00</span></span>
                  </div>
                </td>
                <td className="product-quantity clearfix">
                  <div className="quantityd clearfix">
                    <button className="qtyBtn btnMinus"><span>-</span></button>
                    <input name="qty" value="1" title="Qty" className="input-text qty text carqty" type="text" />
                    <button className="qtyBtn btnPlus">+</button>
                  </div>
                </td>
                <td className="product-total">
                  <div className="product_price clearfix">
                    <span className="price"><span><span>$</span>120.00</span></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="actions">
                  <div className="coupon">
                    <input type="text" name="coupon_code" placeholder="Coupon code" />
                    <button type="submit" className="button fishto-btn" name="apply_coupon">Apply coupon</button>
                  </div>
                  <button type="submit" className="button fishto-btn clear-cart">Clear All</button>
                  <button type="submit" className="button update fishto-btn" name="update_cart" value="Update cart">Update Cart</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

    </>
  )
}

export default CartItem