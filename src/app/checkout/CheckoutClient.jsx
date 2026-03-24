"use client";
import React, { useEffect, useState } from "react";
import {
  getCartApi,
  placeOrderApi,
  paymentResponseApi,
  applyCouponApi,
} from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import SelectAddress from "../components/SelectedAddress";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CheckoutClient() {
  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState({ subTotal: "", total: "" });
  const [CouponSummary, setCouponSummary] = useState({
    subTotal: "",
    total: "",
    discount: "",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartType = searchParams?.keys().next().value;

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [coupon_id, setCouponId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      cartItem();
      loadRazorpayScript();
    }
  }, []);

  const cartItem = async () => {
    if (typeof window === "undefined") return;

    let browserId = localStorage.getItem("browser_id");
    if (!browserId) {
      browserId = Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem("browser_id", browserId);
    }

    const formData = new FormData();
    formData.append("session_id", browserId);
    if (cartType) formData.append("cart_type", cartType);

    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getCartApi(formData, reqHeader);
      console.log(result);

      setCart(result.data.cartItems || []);
      setSummary({
        subTotal: result.data.subTotal,
        total: result.data.total,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  const handlePaynow = async () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding.");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("address_id", selectedAddress);
    if (cartType) formData.append("cart_type", cartType);
    // if (coupon) formData.append("coupon_code", coupon_id); // ✅ Include coupon code if applied
    if (coupon_id) formData.append("coupon_id", coupon_id); // ✅ Include coupon ID if applied
    console.log(coupon);

    try {
      const result = await placeOrderApi(formData, reqHeader);
      console.log(result);

      if (result.data.order) {
        openRazorpay(result.data.order);
      } else {
        alert("Failed to create order.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setIsProcessing(false);
    }
  };
  const handleApplyCoupon = async () => {
    if (!coupon) {
      toast.error("❌ Please enter a coupon code");
      return;
    }

    if (typeof window === "undefined") return;

    let browserId = localStorage.getItem("browser_id");
    if (!browserId) {
      browserId = Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem("browser_id", browserId);
    }

    const formData = new FormData();
    formData.append("session_id", browserId);
    formData.append("coupon_code", coupon);
    if (cartType) formData.append("cart_type", cartType);

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ Please login to apply coupon");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await applyCouponApi(formData, reqHeader);

      console.log("coupon", result);

      // 🔴 IMPORTANT: Check backend status
      if (result.data.status === false) {
        const message = result.data.message;

        let displayMessage = "❌ Failed to apply coupon";

        if (message === "Invalid coupon code") {
          displayMessage = "❌ Invalid coupon code. Please try again.";
        } else if (message === "Coupon has expired") {
          displayMessage = "⌛ This coupon has expired.";
        } else if (message === "You have already used this coupon") {
          displayMessage = "⚠️ You have already used this coupon.";
        }

        toast.error(displayMessage);
        return; // 🚫 STOP execution
      }

      // ✅ SUCCESS FLOW
      setCouponId(result.data.coupon_id);

      setCouponSummary({
        subTotal: result.data.final_amount,
        total: result.data.total_amount,
        discount: result.data.discount_amount || 0,
      });

      toast.success("Coupon applied successfully!");
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("❌ Something went wrong");
    }
  };
  console.log(CouponSummary);

  const openRazorpay = (order) => {
    if (!order) {
      console.error("No order details found for Razorpay.");
      setIsProcessing(false);
      return;
    }

    const options = {
      key: "rzp_test_GDuAFX1SCW9H20",
      amount: order.amount,
      currency: order.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const token =
          typeof window !== "undefined"
            ? sessionStorage.getItem("token")
            : null;
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const reqBody = {
          payment_order_id: order.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          coupon_id: coupon_id, // ✅ Include coupon ID if applied
        };

        try {
          console.log(reqBody);

          const res = await paymentResponseApi(reqBody, reqHeader);
          if (res.status === 200) {
            toast.success("Order placed successfully!", {
              position: "top-center",
              autoClose: 1000,
              theme: "colored",
            });
            setTimeout(() => {
              router.push("/profile");
            }, 1200);
          } else {
            toast.error("Payment verification failed!", {
              position: "top-center",
              autoClose: 2000,
              theme: "colored",
            });
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("Something went wrong while verifying payment.", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
        }
        setIsProcessing(false);
      },
      prefill: {
        name: order.notes?.name || "",
        email: order.notes?.email || "",
        contact: order.notes?.phone || "",
      },
      method: {
        card: true,
        netbanking: true,
        upi: true,
        wallet: true,
        emi: true,
        paylater: true,
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const loadRazorpayScript = () => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay SDK loaded");
      document.body.appendChild(script);
    }
  };

  return (
    <>
      <Header />
      <div
        className="container checkout"
        style={{ paddingTop: "200px", paddingBottom: "60px" }}
      >
        <div className="row">
          <div className="col-md-7">
            <SelectAddress onSelectAddress={setSelectedAddress} />
          </div>
          <div className="col-md-5">
            <div className="p-3 border">
              <h6 className="fw-bold">DELIVERY ESTIMATES</h6>
              <p className="text-muted">
                {cart.length > 0 &&
                  cart.map((item, index) => (
                    <img
                      key={index}
                      src={item.product_items?.image}
                      alt="Cart Item"
                      width="20"
                      height="20"
                      className="me-1"
                    />
                  ))}
                {/* Estimated delivery by <span className="fw-bold">25 Mar 2025</span> */}
              </p>

              <h6 className="fw-bold mt-3">
                PRICE DETAILS ({cart.length} Items)
              </h6>
              <div className="d-flex justify-content-between">
                <p>Total MRP</p>
                <p>
                  {" "}
                  ₹{CouponSummary.total ? CouponSummary.total : summary.total}
                </p>
              </div>
              <div className="coupon-box mb-3 d-flex ">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="form-control mb-2"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-success w-50  ms-2 mb-2"
                  onClick={handleApplyCoupon}
                >
                  Apply Coupon
                </button>
              </div>

              <div className="d-flex justify-content-between">
                <p>
                  Discount on MRP{" "}
                  <span className="text-primary">Know More</span>
                </p>
                <p className="text-success">₹{CouponSummary.discount}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>
                  Platform Fee <span className="text-primary">Know More</span>
                </p>
                <p className="text-success">FREE</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>
                  Shipping Fee <span className="text-primary">Know More</span>
                </p>
                <p className="text-success">FREE</p>
              </div>

              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <p>Total Amount</p>
                <p>
                  ₹
                  {CouponSummary.subTotal
                    ? CouponSummary.subTotal
                    : summary.total}
                </p>
              </div>

              <button
                className="btn btn-success w-100 mt-2"
                onClick={handlePaynow}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
      <Footer />
    </>
  );
}

export default CheckoutClient;
