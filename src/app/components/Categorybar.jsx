import Link from 'next/link';
import React, { useState } from 'react';

function Categorybar({ menuOpen, setMenuOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    { name: "Lures & Baits", items: ["Soft Baits", "Hard Baits", "Jigs"] },
    { name: "Fishing Rods", items: ["Spinning Rods", "Casting Rods", "Fly Rods"] },
    { name: "Fishing Reels", items: ["Spinning Reels", "Baitcasting Reels", "Fly Reels"] },
    { name: "Fishing Lines", items: ["Monofilament", "Fluorocarbon", "Braided"] },
    { name: "Terminal Tackle", items: ["Hooks", "Sinkers", "Swivels"] },
    { name: "Tools & Accessories", items: ["Pliers", "Nets", "Tackle Boxes"] },
    { name: "Apparel & Clothing", items: ["Shirts", "Hats", "Rain Gear"] },
    { name: "All Products", items: ["Product combo", "Hats", "Rain Gear"] }
  ];

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <nav className="custom-navbar">
      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        {categories.map((category, index) => (
          <li key={index} className="nav-item">
            {category.items.length > 0 ? (
              <div className={`dropdown ${activeDropdown === index ? 'active' : ''}`}>
                <button 
                  className="dropbtn" 
                  onClick={() => toggleDropdown(index)}
                >
                  {category.name} ▾
                </button>
                <div className="dropdown-content bg-light">
                  {category.items.map((item, subIndex) => (
                    <Link 
                      key={subIndex} 
                      href="#" 
                      className="dropdown-link"
                      onClick={() => setMenuOpen(false)}
                      
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                href="#" 
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Categorybar;