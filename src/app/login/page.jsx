'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginApi } from '../services/allApi';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = formData;

    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
      if (!localStorage.getItem("browser_id")) {
    const browserId = Date.now() + Math.random().toString(36).substr(2, 10);
    localStorage.setItem("browser_id", browserId);
  }
  const session_id= localStorage.getItem("browser_id");
  console.log(session_id);


    try {

      console.log(password);
      
      
      const result = await loginApi({ email, password,session_id });
        console.log(result);
        
      if (result.status === 200) {
        sessionStorage.setItem('token', result.data.token);
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 1000,
          theme: 'colored',
        });

       setTimeout(() => {
  window.location.href = '/'; // Forces full reload of homepage
}, 2000);
      } else {
        toast.error('Invalid password or email!', {
          position: 'top-center',
          autoClose: 1000,
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('something went wrong', {
        position: 'top-center',
        autoClose: 1000,
        theme: 'colored',
      });
    }
  };

  return (
<>
      <div className="container">
        <div className="login-box text-center">
        
            <img
              src="assets/images/logo/log2.png"
              alt="Cabral Outdoors Logo"
              className="logo"
               onClick={() => window.location.href = '/'}
            />
          <h4 className="mb-3">Log in</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-custom w-100">
              Login
            </button>
          </form>
          <p className="privacy-link">
            Dont have an account? <Link href="/register">Sign Up</Link>
          </p>
        </div>
  
      </div>
      <ToastContainer />

</>  );
}

export default Login;
