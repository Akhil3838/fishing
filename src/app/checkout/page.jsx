'use client';
import React, { useEffect, useState } from "react";
import { getCartApi, placeOrderApi, paymentResponseApi } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SelectAddress from "../components/SelectedAddress";

function Checkout() {
    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState({ subTotal: "", total: "" });
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

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

        const token = sessionStorage.getItem("token");
        if (!token) return;

        const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await getCartApi(formData, reqHeader);
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

        const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
        const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await placeOrderApi({ address_id: selectedAddress }, reqHeader);
            console.log(result);
            
            if (result.data.order) {
                openRazorpay(result.data.order);
            } else {
                console.error("Invalid order response:", result);
                alert("Failed to create order.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setIsProcessing(false);
        }
    };

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
                const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
                const reqHeader = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };

                const reqBody = {
                    order_id: order.id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                };

                try {
                    const res = await paymentResponseApi(reqBody, reqHeader);
                    
                    
                    if (res.status === 200) {
                        toast.success("Order placed successfully!", {
                            position: "top-center",
                            autoClose: 1000,
                            theme: "colored",
                        });
                        setTimeout(() => {
                            router.push('/profile');
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
            theme: {
                color: "#3399cc",
            },
            modal: {
                ondismiss: function () {
                    setIsProcessing(false);
                }
            }
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
        <div className="container my-4">
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
                            Estimated delivery by <span className="fw-bold">25 Mar 2025</span>
                        </p>

                        <h6 className="fw-bold mt-3">PRICE DETAILS ({cart.length} Items)</h6>
                        <div className="d-flex justify-content-between">
                            <p>Total MRP</p>
                            <p>₹{summary.total}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>
                                Discount on MRP <span className="text-primary">Know More</span>
                            </p>
                            <p className="text-success">-</p>
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
                            <p>₹{summary.total}</p>
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
            <ToastContainer />
        </div>
    );
}

export default Checkout;
