'use client'

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { resetPasswordApi } from "../services/allApi";

const ResetPasswordWrapper = () => {
  return (
    <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setMessage({ text: "Password must be at least 8 characters", type: "error" });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords don't match", type: "error" });
      return false;
    }
    if (!formData.otp || formData.otp.length < 6) {
      setMessage({ text: "Please enter a valid 6-digit OTP", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    if (!validatePassword()) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPasswordApi({
        email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        otp: formData.otp
      });

      if (result.status === 200) {
        setMessage({ text: result.message || "Password reset successfully!", type: "success" });
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setMessage({ text: result.error || "Failed to reset password", type: "error" });
      }
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "An error occurred. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <Link href="/" className="d-flex justify-content-center mb-3">
          <Image
            src="/assets/images/logo/log2.png"
            alt="Company Logo"
            width={170}
            height={100}
            priority
          />
        </Link>

        <h5 className="text-center mb-3">Reset Password</h5>
        <p className="text-muted text-center mb-4">Enter your new password and the OTP sent to your email</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="email"         
              className="form-control" 
              value={email || ""} 
              readOnly 
              disabled
            />
          </div>
          
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="New Password (min 8 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              name="otp"
              className="form-control"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              pattern="\d{6}"
              maxLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-danger w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
        
        {message.text && (
          <div className={`mt-3 alert alert-${message.type === "error" ? "danger" : "success"}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordWrapper;