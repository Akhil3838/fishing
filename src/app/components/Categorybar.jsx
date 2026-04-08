"use client";

import React, { useEffect, useState } from "react";
import { allCategoryApi } from "../services/allApi";

// ✅ GLOBAL CACHE
let cachedCategories = null;

function Categorybar({ menuOpen, setMenuOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // ✅ If already cached → don't call API
        if (cachedCategories) {
          setCategories(cachedCategories);
          setLoading(false);
          return;
        }

        setLoading(true);
        const result = await allCategoryApi();

        if (result?.data?.data) {
          setCategories(result.data.data);

          // ✅ Save to cache
          cachedCategories = result.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="custom-navbar pt-lg-3">
      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>

        {/* HOME */}
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            <span className="dropbtn">
              <i className="fa-solid fs-6 fa-house"></i>
            </span>
          </a>
        </li>

        {/* LOADING */}
        {loading ? (
          <div className="d-flex gap-3 px-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-item"></div>
            ))}
          </div>
        ) : (
          categories.map((category, index) => (
            <li key={index} className="nav-item">
              {category.subcategories?.length > 0 ? (
                <div
                  className={`dropdown ${
                    activeDropdown === index ? "active" : ""
                  }`}
                >
                  <button
                    className="dropbtn"
                    onClick={() => toggleDropdown(index)}
                  >
                    {category.category_name} ▾
                  </button>

                  <div className="dropdown-content bg-light py-2">
                    {category.subcategories.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={`/shop/${sub.slug}`}
                        className="dropdown-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.category_name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={`/shop/${category.slug}`}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.category_name}
                </a>
              )}
            </li>
          ))
        )}

        {/* ALL PRODUCTS */}
        {!loading && (
          <li className="nav-item">
            <a
              href="/shop/all"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              ALL PRODUCTS
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Categorybar;