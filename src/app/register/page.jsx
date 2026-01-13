'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { loginApi } from '../services/allApi';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ otp: '' });

  const handleChange = (e) => {
    setFormData({ otp: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { otp } = formData;
    otp = otp.trim();

    if (!otp) {
      toast.error('Please enter OTP.', {
        position: 'top-center',
        autoClose: 1000,
        theme: 'colored',
      });
      return;
    }

    // session id (unchanged)
    if (!localStorage.getItem('browser_id')) {
      const browserId =
        Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem('browser_id', browserId);
    }
     
    const session_id = localStorage.getItem('browser_id');
        const user_id = localStorage.getItem('user_id');


    try {
      const result = await loginApi({ otp, session_id, user_id });
      console.log(result);
      
              sessionStorage.setItem('token', result.data.token);


            console.log(result);

      if (result.status === 200) {


        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 1000,
          theme: 'colored',
        });

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        toast.error('Invalid OTP!', {
          position: 'top-center',
          autoClose: 1000,
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'top-center',
        autoClose: 1000,
        theme: 'colored',
      });
    }
  };

  return (
    <>
      <Header />

      <div className="container" style={{ paddingTop: '150px' }}>
        <div className="login-box text-center">
           <Link href="/">
            <img
              style={{height:'100px',width:'170px'}}
              src="assets/images/logo/log2.png"
              alt="Logo"
              className="img-fluid mb-3"
            />
          </Link>
          <h4 className="mb-3">Log in</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <input
                type="number"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter OTP"
                required
              />
            </div>

            <button type="submit" className="btn btn-custom w-100">
              Login
            </button>
          </form>

          {/* <p className="privacy-link">
            Don&apos;t have an account? <Link href="/register">Sign Up</Link>
          </p> */}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default Login;
