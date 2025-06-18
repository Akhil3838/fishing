'use client'

import { useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { resetPasswordApi } from "../services/allApi";

// Wrapper component to handle suspense
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
  const { token } = useParams();

  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPasswordApi({
        email,
        password,
        password_confirmation: confirmPassword,
        token,
      });

      setMessage(result.message || result.error);
      if (result.status === 200) {
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 d-flex justify-content-center align-items-center" style={{ width: "400px", borderRadius: "10px" }}>
        <Link href="/">
          <Image
            src="/assets/images/logo/log2.png"
            alt="Company Logo"
            width={200}
            height={80}
            className="img-fluid mb-3"
            priority
          />
        </Link>

        <h5 className="text-center mb-3">Reset Password</h5>
        <p className="text-muted text-center">Enter your new password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="email"         
              placeholder="Enter email"
              className="form-control" 
              value={email || ""} 
              readOnly 
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
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
        {message && (
          <p className={`mt-3 text-center ${message.includes("wrong") ? "text-danger" : "text-success"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordWrapper;