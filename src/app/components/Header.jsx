'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getCartApi, logoutApi } from '../services/allApi';
import { useRouter } from 'next/navigation';
import { addResponseContext, deleteCartResponseContext} from '../context/Contextshare';


function Header() {
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
     const { deleteCartResponse } = useContext(deleteCartResponseContext);
     const {addCartResponse} =useContext(addResponseContext)
     
 
  // ✅ Define cartItem function at the component level
  const cartItem = async () => {

      let browserId = localStorage.getItem("browser_id");
  
  if (!browserId) {
    browserId = Date.now() + Math.random().toString(36).substr(2, 10);
    localStorage.setItem("browser_id", browserId);
  }


  const formData = new FormData();
  formData.append("session_id", browserId);

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getCartApi(formData,reqHeader);
      console.log("API Response:", result.data);

      setCartCount(result.data.cartItems.length); // adjust based on your API response
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // ✅ Set token & fetch cart on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);
    cartItem();
  }, [deleteCartResponse,addCartResponse]);

  // ✅ Logout handler
  const handleLogout = async (e) => {
    e.preventDefault();
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await logoutApi(reqHeader);
      console.log('Logout Response:', result);
    } catch (error) {
      console.error('Error during logout:', error);
    }

    sessionStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  return (
    <header className="header-01 h2 head-sticky">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="/">
                <img src="assets/images/logo/logo01.png" alt="" />
              </a>

              <button className="navbar-toggler" type="button">
                <i className="nss-bars1"></i>
              </button>

              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li><a href="/">Home</a></li>
                  <li><a href="/shopping">Shop</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="/contact">Contact</a></li>
                  {token ? (
                    <li>
                      <a href="#" onClick={handleLogout}>Logout</a>
                    </li>
                  ) : (
                    <li>
                      <a href="/login">Login</a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="access-btn">
                <a href="#" className="btn-search"><i className="nss-search1"></i></a>
                <a href="/account" className="btn-user"><i className="nss-user1"></i></a>
                <a href="/cart" className="btn-cart"><i className="nss-shopping-cart1"></i><span>{cartCount}</span></a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
