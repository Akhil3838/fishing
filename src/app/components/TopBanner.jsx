"use client";
import React, { useEffect, useState } from "react";
import { bannerApi } from "../services/allApi";

function TopBanner() {
  const [banner, setBanner] = useState([]);
  const [current, setCurrent] = useState(0);

  const getBanner = async () => {
    try {
      const result = await bannerApi();
      setBanner(result.data.banner || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  // ✅ Auto slide
  useEffect(() => {
    if (banner.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banner.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banner]);

  return (
    <section className="slider-section hero-section "
>
      {banner.map((item, index) => (
        <div
          key={index}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            opacity: current === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: current === index ? 1 : 0,
          }}
        >
          <img
            src={item.image_url}
            alt={item.title || "banner"}
            className="w-100 h-100 hero-img"
          />

          <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
            <h1 className="fw-bold display-3">{item.title}</h1>
            <p className="lead">{item.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TopBanner;