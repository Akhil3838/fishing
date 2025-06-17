'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { resetPasswordApi } from "../services/allApi";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useParams();

  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
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
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 d-flex justify-content-center align-items-center " style={{ width: "400px", borderRadius: "10px" }}>
        <Link href="/">
          <img
            src="assets/images/logo/log2.png"
            alt="Logo"
            width={200}
            height={80}
            className="img-fluid mb-3"
          />
        </Link>

        <h5 className="text-center mb-3">Reset Password</h5>
        <p className="text-muted text-center">Enter your new password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email"         
         placeholder="enter email"
           className="form-control" value={email || ""} readOnly />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Reset Password</button>
        </form>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
