"use client";

import React, { useEffect, useState } from 'react';
import { bannerApi } from '../services/allApi';

function Banner() {
  const [banner,setBanner]=useState([])
  const getBanner =async ()=>{
    try {
      const result=await bannerApi()
      setBanner(result.data.banner)

    } catch (error) {
      console.log(error);
      
    }
  }
              console.log(banner);

  useEffect(()=>{
getBanner()
  },[])
  return (
    <>
      {/* <!-- Hero Banner Start --> */}
      <section className="slider-section" style={{ height: '80vh',paddingTop:'135px' }}>
      <div className="hero-slider owl-carousel anim_class">
          <div className="single-slide bg-img d-flex align-items-center" style={{
    height: '80vh',
    backgroundImage: `url(${banner[0]?.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">{banner[0]?.sub_text}<span></span></h5>
                         <h2 className="animated">{banner[0]?.main_text}</h2>
                    {/* <a href="contact.html" className="fishto-btn animated">Get A Quote <i className="nss-long-arrow-right1"></i></a> */}
                    <a href="shop-1.html" className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="single-slide bg-img d-flex align-items-center" style={{
    height: '80vh',
    backgroundImage: `url(${banner[1]?.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">{banner[1]?.sub_text} <span></span></h5>
                     <h2 className="animated">{banner[1]?.main_text}</h2>

                    {/* <a href="contact.html" className="fishto-btn animated">Get A Quote <i className="nss-long-arrow-right1"></i></a> */}
                    <a href="shop-1.html" className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slide bg-img d-flex align-items-center" style={{
    height: '80vh',
    backgroundImage: `url(${banner[2]?.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">{banner[2]?.sub_text}<span></span></h5>
                    <h2 className="animated">{banner[2]?.main_text}</h2>
                    {/* <a href="contact.html" className="fishto-btn animated">Get A Quote <i className="nss-long-arrow-right1"></i></a>*/}
                    <a href="shop-1.html" className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a> 
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
