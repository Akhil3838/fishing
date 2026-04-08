"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerApi } from "../services/allApi";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, phone: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone) {
      toast.warning("Please enter phone number!", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    try {
      const result = await registerApi(formData);
      console.log(result);

      if (result.status === 200) {
        localStorage.setItem("user_id", result.data.user_id);

        toast.success("OTP sent successful!", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });

        setTimeout(() => {
router.replace("/register");
        }, 2000);
      } else {
        toast.error(result.data?.error || "Something went wrong!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Network error! Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Header />

      <div className="container" style={{ paddingTop: "150px" }}>
        <div className="login-box text-center">
          <Link href="/">
            <img
              style={{ height: "100px", width: "170px" }}
              src="assets/images/logo/log2.png"
              alt="Logo"
              className="img-fluid mb-3"
            />
          </Link>
          <h4 className="mb-3">Sign Up</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-custom w-100">
              Continue
            </button>
          </form>

          {/* <p className="privacy-link mt-3">
            Already have an account? <Link href="/login">Login</Link>
          </p> */}
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}

export default Register;
