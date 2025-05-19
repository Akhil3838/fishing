import React from 'react'

function CartSidebar() {
  return (
    <>
            <div className="cart-totals">
          <h4>Cart Totals</h4>
          <table className="shop_table shop_table_responsive">
            <tbody>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td data-title="Subtotal">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">$</span>120.00
                  </span>
                </td>
              </tr>
              <tr className="woocommerce-shipping-totals shipping">
                <th>Shipping</th>
                <td><p>Enter your address to view shipping options. Calculate shipping</p></td>
              </tr>
              <tr className="order-total">
                <th>Total</th>
                <td data-title="Total">
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">$</span>120.00
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="wc-proceed-to-checkout">
            <a href="#" className="fishto-btn button alt wc-forward">Proceed to checkout</a>
          </div>
        </div>

    </>
  )
}

export default CartSidebar