'use client';
import React, { useState } from 'react';

// ✅ ReadMore Component (shows only 2 lines initially)
const ReadMore = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <p
        style={{
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 2, // shows 2 lines only when collapsed
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.6',
          marginBottom: '0.5rem',
        }}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none',
          border: 'none',
          color: '#007bff',
          cursor: 'pointer',
          fontWeight: '500',
          padding: 0,
        }}
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

// ✅ AboutSection Component
export default function AboutSection() {
  return (
    <section className="about-section" style={{ marginTop: '70px' }}>
      <div className="container">
        <div className="row">
          {/* Left Image */}
          <div className="col-lg-6 col-md-6">
            <div className="ab-thumb">
              <img
                src="assets/images/about/about2.jpg"
                alt="about"
                style={{ borderRadius: '15px', width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6 col-md-6">
            <div className="sub_title">
              About Us <span></span>
            </div>
            <h2 className="sec_titles">
              Know About Scaless products and collections
            </h2>

            <div className="row">
              {/* Jhinga Shrimp */}
              <div className="col-lg-6 col-md-12 ">
                <div className="icon-box-1">
                  <i className="fishto-diving-gogglesfishto"></i>
                  <h4>Jhinga Shrimp</h4>
                  <ReadMore
                    text="Jhinga is a proven shrimp lure, known for delivering exceptional results with monster catches. It has consistently landed huge Mangrove jacks, groupers and massive snappers. Built with high performance elasticity and tough construction, this shrimp is engineered to perfection for extreme performance in Indian waters."
                  />
                </div>
              </div>

              {/* Scaless Bags */}
              <div className="col-lg-6 col-md-12 ">
                <div className="icon-box-1">
                  <i className="fishto-swordfishfishto"></i>
                  <h4>Scaless Bags</h4>
                  <ReadMore
                    text="Keep your fishing gear organized and protected with Scaless Fishing’s premium range of accessories. Safely store your lures and hooks in the Scaless fishing lure box, featuring 16 spacious compartments and 6 dedicated hook boxes. Secure your rods with the Scaless fishing rod strap, available in blue or white, and protect your reels with the economy fishing reel pouch."
                  />
                </div>
              </div>

              {/* Scaless Gal Hooks */}
              <div className="col-lg-6 col-md-12 ">
                <div className="icon-box-1">
                  <i className="fishto-reel1fishto"></i>
                  <h4>Scaless Gal Hooks</h4>
                  <ReadMore
                    text="The Scaless worm hook jighead delivers exceptional action for your shads, boosting your hook-up ratio. Built with extra-sharp high-strength hooks, it’s ideal for both freshwater and saltwater fishing. Perfect for anglers using soft plastics or shrimp, this jighead combines durability, precision, and performance to exceed expectations on every cast."
                  />
                </div>
              </div>

              {/* Scaless Accessories */}
              <div className="col-lg-6 col-md-12">
                <div className="icon-box-1">
                  <i className="fishto-earthwormfishto"></i>
                  <h4>Scaless Accessories</h4>
                  <ReadMore
                    text="Designed to prevent damage by securely strapping rod pieces together. Protect your gear effortlessly with our rod piece straps. Meet the ultimate necessity of preventing line release from the spool. Keep your fishing experience seamless and hassle-free with our innovative solution."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
