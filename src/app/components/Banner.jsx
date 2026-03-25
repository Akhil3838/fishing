"use client";

import React, { useEffect, useState } from "react";
import { bannerApi } from "../services/allApi";

function Banner() {
  const [banner, setBanner] = useState([]);

  const getBanner = async () => {
    try {
      const result = await bannerApi();
      console.log(result);

      setBanner(result.data.banner || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      {/* Hero Banner Start */}
      <section
        className="slider-section"
        style={{ height: "80vh", paddingTop: "135px" }}
      >
        <div className="hero-slider owl-carousel anim_class">
          {/* Slide 1 */}
          <div
            className="single-slide bg-img d-flex align-items-center"
            style={{
              height: "80vh",
              backgroundImage: `url(${banner?.[0]?.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    {/* <h5 className="sub-title animated">
                      {banner?.[0]?.sub_text}
                      <span></span>
                    </h5>
                    <h2 className="animated">{banner?.[0]?.main_text}</h2>
                    <a href="/shop/all" className="fishto-btn sb2 animated">
                      Shop Now <i className="nss-long-arrow-right1"></i>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            className="single-slide bg-img d-flex align-items-center"
            style={{
              height: "80vh",
              backgroundImage: `url(${banner?.[1]?.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    {/* <h5 className="sub-title animated">
                      {banner?.[1]?.sub_text} <span></span>
                    </h5>
                    <h2 className="animated">{banner?.[1]?.main_text}</h2>
                    <a href="/shop/all" className="fishto-btn sb2 animated">
                      Shop Now <i className="nss-long-arrow-right1"></i>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            className="single-slide bg-img d-flex align-items-center"
            style={{
              height: "80vh",
              backgroundImage: `url(${banner?.[2]?.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    {/* <h5 className="sub-title animated">
                      {banner?.[2]?.sub_text}
                      <span></span>
                    </h5>
                    <h2 className="animated">{banner?.[2]?.main_text}</h2>
                    <a href="/shop/all" className="fishto-btn sb2 animated">
                      Shop Now <i className="nss-long-arrow-right1"></i>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide 4 */}
          <div
            className="single-slide bg-img d-flex align-items-center"
            style={{
              height: "80vh",
              backgroundImage: `url(${banner?.[3]?.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    {/* <h5 className="sub-title animated">
                      {banner?.[3]?.sub_text}
                      <span></span>
                    </h5>
                    <h2 className="animated">{banner?.[3]?.main_text}</h2>
                    <a href="/shop/all" className="fishto-btn sb2 animated">
                      Shop Now <i className="nss-long-arrow-right1"></i>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 5 */}

          <div
            className="single-slide bg-img d-flex align-items-center"
            style={{
              height: "80vh",
              backgroundImage: `url(${banner?.[4]?.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    {/* <h5 className="sub-title animated">
                      {banner?.[4]?.sub_text}
                      <span></span>
                    </h5>
                    <h2 className="animated">{banner?.[4]?.main_text}</h2>
                    <a href="/shop/all" className="fishto-btn sb2 animated">
                      Shop Now <i className="nss-long-arrow-right1"></i>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide 6 */}
          {banner?.[5] && (
            <div
              className="single-slide bg-img d-flex align-items-center"
              style={{
                height: "80vh",
                backgroundImage: `url(${banner?.[4]?.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="slider-content">
                      {/* <h5 className="sub-title animated">
                        {banner?.[4]?.sub_text}
                        <span></span>
                      </h5>
                      <h2 className="animated">{banner?.[4]?.main_text}</h2>
                      <a href="/shop/all" className="fishto-btn sb2 animated">
                        Shop Now <i className="nss-long-arrow-right1"></i>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* slide 7 */}

          {/* {  banner?.[6] &&         
     <div className="single-slide bg-img d-flex align-items-center" style={{
            height: '80vh',
            backgroundImage: `url(${banner?.[4]?.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">{banner?.[6]?.sub_text}<span></span></h5>
                    <h2 className="animated">{banner?.[6]?.main_text}</h2>
                    <a  href="/shop/all"  className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a> 
                  </div>
                </div>
              </div>
            </div>
          </div>

} */}

          {/* slide 8 */}

          {/* {  banner?.[7] &&          
    <div className="single-slide bg-img d-flex align-items-center" style={{
            height: '80vh',
            backgroundImage: `url(${banner?.[7]?.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="slider-content">
                    <h5 className="sub-title animated">{banner?.[7]?.sub_text}<span></span></h5>
                    <h2 className="animated">{banner?.[7]?.main_text}</h2>
                    <a  href="/shop/all"  className="fishto-btn sb2 animated">Shop Now <i className="nss-long-arrow-right1"></i></a> 
                  </div>
                </div>
              </div>
            </div>
          </div>

} */}
        </div>
      </section>
      {/* Banner End */}
    </>
  );
}

export default Banner;
