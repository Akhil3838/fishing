'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import { getCartApi, logoutApi, searchProductApi } from '../services/allApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addResponseContext, deleteCartResponseContext } from '../context/Contextshare';

function Header() {
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const { deleteCartResponse } = useContext(deleteCartResponseContext);
  const { addCartResponse } = useContext(addResponseContext);
  
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const searchTimeout = useRef(null);
  const searchDropdownRef = useRef(null);

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
      const result = await getCartApi(formData, reqHeader);
      console.log("API Response:", result.data);
      setCartCount(result.data.cartItems.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);
    cartItem();
  }, [deleteCartResponse, addCartResponse]);

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

  // Search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim() !== "") {
      searchTimeout.current = setTimeout(() => {
        searchProducts(searchQuery);
      }, 500);
    } else {
      setSearchResults([]);
    }

    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  const searchProducts = async (query) => {
    try {
      const response = await searchProductApi(query);
      console.log(response);
      setSearchResults(response.data.products || []);
      setSuggestion(response.data.suggestions || []);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
      setSuggestion([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="header-01 h2 head-sticky">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" href="/">
                  <img src="assets/images/logo/logo01.png" alt="" />
                </Link>

                <button className="navbar-toggler" type="button">
                  <i className="nss-bars1"></i>
                </button>

                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/shopping">Shop</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    {token ? (
                      <li>
                        <a href="" onClick={handleLogout}>Logout</a>
                      </li>
                    ) : (
                      <li>
                        <Link href="/login">Login</Link>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="access-btn">
                  {/* Search button modified to trigger the popup */}
                  <a href="#" className="btn-search" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('.popup_search_sec').style.display = 'block';
                  }}>
                    <i className="nss-search1"></i>
                  </a>
                  {token && (
                    <Link href="/profile" className="btn-user">
                      <i className="nss-user1"></i>
                    </Link>
                  )}
                  <Link href="/cart" className="btn-cart">
                    <i className="nss-shopping-cart1"></i>
                    <span>{cartCount}</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Modified Popup Search with the search functionality */}
      <section className="popup_search_sec" style={{ display: 'none' }}>
        <div className="popup_search_overlay" onClick={() => {
          document.querySelector('.popup_search_sec').style.display = 'none';
        }}></div>
        <div className="pop_search_background">
          <div className="middle_search">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="popup_search_form" ref={searchDropdownRef}>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input 
                        type="search" 
                        name="s" 
                        id="s" 
                        placeholder="Type Words and Hit Enter" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        autoComplete="off"
                      />
                      <button type="submit"><i className="nss-search1"></i></button>
                    </form>
                    
{searchResults.length > 0 && (
  <div 
    className="search-results-dropdown border mt-1 w-100"
    style={{
      position: 'absolute',
      zIndex: 1000,
      maxHeight: '400px',
      overflowY: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '500px',
      backgroundColor: '#1a1a1a',
      borderColor: '#333',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    }}
  >
    {searchResults.map((item, index) => (
      <Link
        key={index}
       href={`/productDetails/${item?.slug}`}
        className="search-item d-block p-3 text-decoration-none"
        style={{ 
          borderBottom: "1px solid #333",
          color: '#e0e0e0',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: '#2a2a2a'
          }
        }}
        onClick={() => {
          setSearchResults([]);
          document.querySelector('.popup_search_sec').style.display = 'none';
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src={item.icon}
            alt={item.name}
            style={{
              width: "40px",
              height: "40px",
              marginRight: "12px",
              borderRadius: '4px',
              objectFit: 'cover'
            }}
          />
          <div>
            <div className="fw-bold" style={{ color: '#ffffff' }}>
              {item.product_name}
            </div>
            <div className="text-muted" style={{ color: '#a0a0a0' }}>
              {item.price}
            </div>
            <div style={{ fontSize: "0.85rem", color: '#4dabf7' }}>
              <span>In </span>
              {item.category?.category_name}
            </div>
          </div>
        </div>
      </Link>
    ))}

    {suggestion.length > 0 && (
      <div style={{ 
        padding: '8px 12px',
        backgroundColor: '#252525',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ 
          color: '#888',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Suggestions
        </div>
      </div>
    )}

    {suggestion.slice(0, 5).map((item, index) => (
      <Link
        key={`suggestion-${index}`}
        href={`/productdetails/${item.slug}`}
        className="search-items d-block p-3 text-decoration-none"
        style={{ 
          borderBottom: "1px solid #333",
          color: '#e0e0e0',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: '#2a2a2a'
          }
        }}
        onClick={() => {
          setSearchResults([]);
          document.querySelector('.popup_search_sec').style.display = 'none';
        }}
      >
        <div className="d-flex align-items-center">
          <i 
            className="fas fa-search me-3" 
            style={{
              color: '#4dabf7',
              width: '20px',
              textAlign: 'center'
            }}
          ></i>
          <div>
            <div className="fw-bold" style={{ color: '#ffffff' }}>
              {item.product_name}
            </div>
            <div style={{ fontSize: "0.8rem", color: '#888' }}>
              Click to view product
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;