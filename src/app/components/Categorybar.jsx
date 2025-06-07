import Link from 'next/link';
import React, { useState } from 'react';

function Categorybar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    // { name: "Home", items: [] },
    { name: "Lures & Baits", items: ["Soft Baits", "Hard Baits", "Jigs"] },
    { name: "Fishing Rods", items: ["Spinning Rods", "Casting Rods", "Fly Rods"] },
    { name: "Fishing Reels", items: ["Spinning Reels", "Baitcasting Reels", "Fly Reels"] },
    { name: "Fishing Lines", items: ["Monofilament", "Fluorocarbon", "Braided"] },
    { name: "Terminal Tackle", items: ["Hooks", "Sinkers", "Swivels"] },
    { name: "Tools & Accessories", items: ["Pliers", "Nets", "Tackle Boxes"] },
    { name: "Apparel & Clothing", items: ["Shirts", "Hats", "Rain Gear"] },
    { name: "All Products", items: ["Product combo", "Hats", "Rain Gear"] }
  ];

  return (
    <nav className="custom-navbar">
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        {categories.map((category, index) => (
          <li key={index} className="nav-item">
            {category.items.length > 0 ? (
              <div className="dropdown">
                <button className="dropbtn">{category.name} ▾</button>
                <div className="dropdown-content">
                  {category.items.map((item, subIndex) => (
                    <Link key={subIndex} href="#" style={{fontSize:'15px'}}>{item}</Link>
                  ))}
                </div>
              </div>
            ) : (
              <a href="#" className="nav-link">{category.name}</a>
            )}
          </li>
        ))}
      </ul>
      
    </nav>
  );
}

export default Categorybar;
