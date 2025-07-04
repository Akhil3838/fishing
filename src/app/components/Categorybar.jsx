'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { allCategoryApi } from '../services/allApi';

function Categorybar({ menuOpen, setMenuOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await allCategoryApi();
        if (result?.data?.data) {
          setCategories(result.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="custom-navbar pt-3">
      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        {categories.map((category, index) => (
          <li key={index} className="nav-item">
            {category.subcategories && category.subcategories.length > 0 ? (
              <div className={`dropdown ${activeDropdown === index ? 'active' : ''}`}>
                <button 
                  className="dropbtn" 
                  onClick={() => toggleDropdown(index)}
                >
                  {category.category_name} ▾
                </button>
                <div className="dropdown-content bg-light py-2">
                  {category.subcategories.map((sub, subIndex) => (
                    <Link 
                      key={subIndex} 
                      href={`/shop/${sub.slug}`} 
                      className="dropdown-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.category_name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                href={`/shop/${category.slug}`} 
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {category.category_name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Categorybar;
