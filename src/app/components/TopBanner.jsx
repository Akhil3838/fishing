"use client";
import React, { useEffect, useState } from "react";
import { bannerApi } from "../services/allApi";

function TopBanner() {
  const [banner, setBanner] = useState([]);
  const [current, setCurrent] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false); // ✅ NEW

  const getBanner = async () => {
    try {
      const result = await bannerApi();
      const banners = result.data.banner || [];
      setBanner(banners);

      // ✅ Preload images
      const promises = banners.map((item) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = item.image_url;
          img.onload = resolve;
          img.onerror = resolve; // avoid blocking if error
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true); // ✅ All images loaded
    } catch (error) {
      console.log(error);
      setImagesLoaded(true); // fallback
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

  // ✅ SHOW LOADER UNTIL IMAGES READY
  if (!imagesLoaded) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", background: "#edf2f5" }}
      >
        <img
          src="/assets/images/logo/log2.png" // your logo
          alt="Loading..."
          style={{
            width: "120px",
            // animation: "pulse 1.5s infinite",
          }}
        />
      </div>
    );
  }

  return (
    <section className="slider-section hero-section">
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