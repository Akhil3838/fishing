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
  const [menuOpen, setMenuOpen] = useState(false);
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
    !searchDropdownRef.current.contains(event.target) &&
    !event.target.closest('.search-dropdown') // Add this line
  ) {
    setSearchResults([]);
    setSuggestion([]);
  }
};    document.addEventListener("mousedown", handleClickOutside);
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
                  <img src="/assets/images/logo/logo01.png" alt=""  onClick={() => window.location.href = '/'} />
                </Link>

                {/* Mobile Toggle Button - Right aligned */}
                <button 
                  className="navbar-toggler d-lg-none ms-auto" 
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle navigation"
                >
                  <i className="nss-bars1"></i>
                </button>

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
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                                    onClick={(e) => {
                                        e.stopPropagation();
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
             {token?<Link href="/profile" data-bs-toggle="modal"
  data-bs-target="#profileModal"
  id="profileBtn" className="btn-cart">
                      <i className="nss-user1"  ></i>
                    </Link>:<Link href="/login" className="btn-cart">
                      <i className="nss-user1"  ></i>
                    </Link>

         }
                  <Link href="/cart" className="btn-cart">
                    <i className="nss-shopping-cart1"></i>
                    <span>{cartCount}</span>
                  </Link>
                </div>
 </nav>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
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

        {/* Categorybar - pass menuOpen state */}
        <Categorybar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </header>

      {/* modal...... */}
<div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content border-0 shadow-lg" style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      borderRadius: "16px",
      overflow: "hidden"
    }}>
      {/* Modal header with decorative element */}
      <div className="position-relative">
        <div style={{
          height: "80px",
          background: "linear-gradient(90deg,rgb(23, 40, 118) 0%, #764ba2 100%)"
        }}></div>
        <div className="position-absolute top-100 start-50 translate-middle">
          <div className="bg-white p-1 rounded-circle shadow">
            <div className="bg-light p-3 rounded-circle d-flex justify-content-center align-items-center" style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
            }}>
              <i className="fa-solid fa-user" style={{ fontSize: "2.5rem",color:'rgb(23, 40, 118)' }}></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal body */}
      <div className="modal-body text-center pt-5 pb-4 px-4">
        <h5 className="mb-1 fw-bold text-dark">Welcome Back!</h5>
        <p className="text-muted mb-4">What would you like to do?</p>
        
        <div className="d-flex justify-content-center gap-3">
          <Link href="/profile" className="btn btn-primary px-4 py-2 rounded-pill d-flex align-items-center" style={{
            background: "linear-gradient(90deg,rgb(23, 40, 118) 0%, #764ba2 100%)",
            border: "none",
            boxShadow: "0 4px 6px rgba(102, 126, 234, 0.3)"
          }}>
            <i className="bi bi-person me-2"></i> Profile
          </Link>
          
          <button onClick={handleLogout} className="btn btn-outline-danger px-4 py-2 rounded-pill d-flex align-items-center" style={{
            borderWidth: "2px",
            fontWeight: "500"
          }}>
           <i className="fa-solid fa-user me-2"></i> Logout
          </button>
        </div>
      </div>
      
      {/* Decorative footer */}
      <div className="modal-footer border-0 pt-0 justify-content-center">
        <small className="text-muted">Have a great day!</small>
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default Header;