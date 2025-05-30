'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerApi } from '../services/allApi';

function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.c_password) {
      toast.warning("Passwords do not match!", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    try {
      const result = await registerApi(formData);
      if (result.status === 200) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/login");
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
      <div className="container">
        <div className="login-box text-center">

            <img src="assets/images/logo/log2.png" alt="Cabral Outdoors Logo" className="logo"  onClick={() => window.location.href = '/'} />
  
     <h4 className="mb-3">Sign Up</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <input type="text" className="form-control" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <input type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <input type="password" className="form-control" placeholder="Re-enter Password" name="c_password" value={formData.c_password} onChange={handleChange} required />
            </div>
            <div className="mb-3 text-start">
              <input type="tel" className="form-control" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-custom w-100">Register</button>
          </form>

          <p className="privacy-link mt-3">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
