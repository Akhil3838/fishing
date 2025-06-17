'use client'

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendEmailApi } from "../services/allApi";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;

    try {
      const response = await sendEmailApi({ email });
      if (response.status === 200) {
        setMessage("Password reset link sent successfully.");
      } else {
        setMessage("Failed to send reset link. Try again.");
      }
    } catch (error) {
      setMessage("Error sending email. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 d-flex justify-content-center align-items-center" style={{ width: "400px", borderRadius: "10px" }}>
        <Link href="/">
          <img
           style={{height:'100px',width:'170px'}}
            src="assets/images/logo/log2.png"
            alt="Logo"
            className="img-fluid mb-3"
          />
        </Link>

        <h4 className="text-center mb-3">Forgot Password</h4>
        <p className="text-muted text-center">Enter your email to receive a password reset link</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Send Reset Link</button>
        </form>
        {message && <p className="mt-3 text-center text-success">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
