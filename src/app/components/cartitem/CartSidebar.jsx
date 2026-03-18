"use client";
import React from "react";
import { useRouter } from "next/navigation";

function CartSidebar({ summary }) {
  const token = sessionStorage.getItem("token");
  const router = useRouter();

  const handleCheckout = (e) => {
    e.preventDefault();
    if (token) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="cart-totals">
      <h4>Cart Totals</h4>
        {/* ✅ Coupon Section */}
      <div className="coupon-box mb-3">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="form-control mb-2"
          // value={coupon}
          // onChange={(e) => setCoupon(e.target.value)}
        />
        <button
          className="btn btn-dark w-100"
          // onClick={handleApplyCoupon}
        >
          Apply Coupon
        </button>
      </div>
      <table className="shop_table shop_table_responsive">
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td data-title="Subtotal">
              <span className="woocommerce-Price-amount amount">
                <span className="woocommerce-Price-currencySymbol">₹</span>
                {summary.subTotal}
              </span>
            </td>
          </tr>
          <tr className="woocommerce-shipping-totals shipping">
            <th>Shipping</th>
            <td>
              <p></p>
            </td>
          </tr>
          <tr className="order-total">
            <th>Total</th>
            <td data-title="Total">
              <span className="woocommerce-Price-amount amount">
                <span className="woocommerce-Price-currencySymbol">₹</span>
                {summary.total}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="wc-proceed-to-checkout">
        <button
          onClick={handleCheckout}
          className="fishto-btn button alt wc-forward"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartSidebar;
