"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendEmailApi } from "../services/allApi";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ForgotPassword() {
  const [formData, setFormData] = useState({ phone: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone } = formData;

    try {
      const response = await sendEmailApi({ phone });
      if (response.status === 200) {
        setMessage("OTP sent successfully.");
        console.log(response);
        // Encode the email for URL safety
        // const encodedEmail = encodeURIComponent(email);
        router.push(`/resetpassword`);
      } else {
        setMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error sending email. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light pt-5">
        <div
          className="card shadow-lg p-4 d-flex justify-content-center align-items-center"
          style={{ width: "400px", borderRadius: "10px" }}
        >
          <Link href="/">
            <img
              style={{ height: "100px", width: "170px" }}
              src="assets/images/logo/log2.png"
              alt="Logo"
              className="img-fluid mb-3"
            />
          </Link>

          <h4 className="text-center mb-3">Forgot Password</h4>
          <p className="text-muted text-center">
            Enter your mobile number to receive a OTP
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Mobile Number"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Send OTP
            </button>
          </form>
          {message && (
            <p className="mt-3 text-center text-success">{message}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
