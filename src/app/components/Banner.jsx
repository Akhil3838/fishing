"use client";

import React from 'react';

function Banner() {
  return (
    <>
      {/* <!-- Hero Banner Start --> */}
      <section className="slider-section" style={{ height: '80vh' }}>
      <div className="hero-slider owl-carousel anim_class">
          <div className="single-slide bg-img d-flex align-items-center" data-bg-image="assets/images/s1.jpg"  style={{ height: '80vh' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">Smart insurance <span></span></h5>
                    <h2 className="animated">Education Is Important, But Fishing Is Importanter</h2>
                    <a href="contact.html" className="fishto-btn animated">Get A Quote <i className="nss-long-arrow-right1"></i></a>
                    <a href="shop-1.html" className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slide bg-img d-flex align-items-center" data-bg-image="assets/images/s2.jpg"  style={{ height: '80vh' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">Fish Keeper <span></span></h5>
                    <h2 className="animated">Education Is Important, But Fishing Is Importanter</h2>
                    <a href="contact.html" className="fishto-btn animated">Get A Quote <i className="nss-long-arrow-right1"></i></a>
                    <a href="shop-1.html" className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slide bg-img d-flex align-items-center" data-bg-image="assets/images/s3.jpg"  style={{ height: '80vh' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">Smart insurance <span></span></h5>
                    <h2 className="animated">Education Is Important, But Fishing Is Importanter</h2>
                    {/* <a href="contact.html" className="fishto-btn animated">Get A Quote <i className="nss-long-arrow-right1"></i></a>
                    <a href="shop-1.html" className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Banner End --> */}
    </>
  );
}

export default Banner;
