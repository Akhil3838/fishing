'use client';

import React from "react";
import axios from "axios";

const RazorpayPaymentPage = ({ order }) => {
    const openRazorpay = () => {
        const options = {
            key: "rzp_test_W4zbe21bswYPPS",
            amount: order.amount,
            currency: order.currency,
            name: "Your Company Name",
            description: "Test Transaction",
            order_id: order.id,
            handler: async function (response) {
                alert("Payment Processing...");

                try {
                    const verifyResponse = await axios.post(
                        "https://thenextindia.com/scalesstest/api/verify-payment",
                        {
                            razorpay_payment_id: response.razorpay_payment_id,
                            order_id: order.id,
                        }
                    );

                    if (verifyResponse.data.success) {
                        alert("Payment Successful!");
                    } else {
                        alert("Payment Pending! Please check again.");
                    }
                } catch (error) {
                    alert("Error verifying payment");
                    console.error(error);
                }
            },
            prefill: {
                name: order.notes?.name || "Guest",
                email: order.notes?.email || "guest@example.com",
                contact: order.notes?.phone || "0000000000",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg text-center" style={{ width: "400px", borderRadius: "10px" }}>
                <h2>Razorpay Payment</h2>
                <p>Click below to complete your payment securely.</p>
                <button className="btn btn-primary w-100" onClick={openRazorpay}>
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default RazorpayPaymentPage;
