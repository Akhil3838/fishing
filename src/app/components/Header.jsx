'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import { getCartApi, logoutApi, searchProductApi } from '../services/allApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addResponseContext, deleteCartResponseContext } from '../context/Contextshare';
import Categorybar from './Categorybar';

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
      setSuggestion([]);
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
        setSuggestion([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="header-01 h2 head-sticky">
        <div className="container py-2">

          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" href="/">
                  <img src="/assets/images/logo/logo01.png" alt="" />
                </Link>

                {/* <button className="navbar-toggler" type="button">
                  <i className="nss-bars1"></i>
                </button> */}

                <div className="collapse navbar-collapse">
                  <div className="d-none d-lg-flex justify-content-center w-100 position-relative" ref={searchDropdownRef}>
                    <div className="search-container" style={{ width: "100%", maxWidth: "500px" }}>
                      <div className="search-input-wrapper relative">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search for products, brands and more"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <button className="search-icon">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>

                      {/* Search Results Dropdown */}
                      {(searchResults.length > 0 || suggestion.length > 0) && (
                        <div className="search-dropdown">
                          {/* Product Results Section */}
                          {searchResults.length > 0 && (
                            <div className="results-section">
                              <div className="section-title">Products</div>
                              <div className="product-list">
                                {searchResults.map((item, index) => (
                                  <Link
                                    key={`product-${index}`}
                                    href={`/productDetails/${item?.slug}`}
                                    className="product-item"
                                    onClick={() => {
                                      setSearchResults([]);
                                      setSuggestion([]);
                                      setSearchQuery("");
                                    }}
                                  >
                                    <div className="product-image">
                                      <img
                                        src={item.icon}
                                        alt={item.name}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = '/assets/images/placeholder-product.png';
                                        }}
                                      />
                                    </div>
                                    <div className="product-details">
                                      <div className="product-name">{item.product_name}</div>
                                      <div className="product-price">{item.price}</div>
                                      <div className="product-category">
                                        <span>In {item.category?.category_name}</span>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Suggestions Section */}
                          {suggestion.length > 0 && (
                            <div className="results-section">
                              <div className="section-title">Suggestions</div>
                              <div className="suggestion-list">
                                {suggestion.slice(0, 5).map((item, index) => (
                                  <Link
                                    key={`suggestion-${index}`}
                                    href={`/productdetails/${item.slug}`}
                                    className="suggestion-item"
                                    onClick={() => {
                                      setSearchResults([]);
                                      setSuggestion([]);
                                      setSearchQuery("");
                                    }}
                                  >
                                    <div className="suggestion-icon">
                                      <i className="fas fa-search"></i>
                                    </div>
                                    <div className="suggestion-text">
                                      <div className="suggestion-title">{item.product_name}</div>
                                      <div className="suggestion-hint">View product details</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
             
                <div className="access-btn" style={{display:'flex'}}>
                    <Link href="/profile" className="btn-cart">
                      <i className="nss-user1"></i>
                    </Link>
         
                  <Link href="/cart" className="btn-cart">
                    <i className="nss-shopping-cart1"></i>
                    <span>{cartCount}</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
{/* Categorybar */}
<div className='container small_search'>
                    <div className="d-block d-lg-none justify-content-center w-100 position-relative" ref={searchDropdownRef}>
                      <div className="search-container" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="search-input-wrapper relative">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Search for products, brands and more"
                            value={searchQuery}
                            onChange={handleSearchChange}
                          />
                          <button className="search-icon">
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
  
                        {/* Search Results Dropdown */}
                        {(searchResults.length > 0 || suggestion.length > 0) && (
                          <div className="search-dropdown">
                            {/* Product Results Section */}
                            {searchResults.length > 0 && (
                              <div className="results-section">
                                <div className="section-title">Products</div>
                                <div className="product-list">
                                  {searchResults.map((item, index) => (
                                    <Link
                                      key={`product-${index}`}
                                      href={`/productDetails/${item?.slug}`}
                                      className="product-item"
                                      onClick={() => {
                                        setSearchResults([]);
                                        setSuggestion([]);
                                        setSearchQuery("");
                                      }}
                                    >
                                      <div className="product-image">
                                        <img
                                          src={item.icon}
                                          alt={item.name}
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/assets/images/placeholder-product.png';
                                          }}
                                        />
                                      </div>
                                      <div className="product-details">
                                        <div className="product-name">{item.product_name}</div>
                                        <div className="product-price">{item.price}</div>
                                        <div className="product-category">
                                          <span>In {item.category?.category_name}</span>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
  
                            {/* Suggestions Section */}
                            {suggestion.length > 0 && (
                              <div className="results-section">
                                <div className="section-title">Suggestions</div>
                                <div className="suggestion-list">
                                  {suggestion.slice(0, 5).map((item, index) => (
                                    <Link
                                      key={`suggestion-${index}`}
                                      href={`/productdetails/${item.slug}`}
                                      className="suggestion-item"
                                      onClick={() => {
                                        setSearchResults([]);
                                        setSuggestion([]);
                                        setSearchQuery("");
                                      }}
                                    >
                                      <div className="suggestion-icon">
                                        <i className="fas fa-search"></i>
                                      </div>
                                      <div className="suggestion-text">
                                        <div className="suggestion-title">{item.product_name}</div>
                                        <div className="suggestion-hint">View product details</div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
  
</div>

<Categorybar />

      </header>
   
    </>
  );
}

export default Header;