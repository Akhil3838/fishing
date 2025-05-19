'use client'; // Required if you're using app directory in Next.js 13+

import React, { useEffect, useState } from 'react';
import { logoutApi } from '../services/allApi';
import { useRouter } from 'next/navigation'; // next/router is deprecated in App Router

function Header() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Only run in the browser
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);
  }, []);

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
                <a href="/cart" className="btn-cart"><i className="nss-shopping-cart1"></i><span>1</span></a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
