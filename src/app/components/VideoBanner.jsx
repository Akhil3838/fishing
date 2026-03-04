'use client'
import { useState, useEffect } from "react";
import { bannerApi, getOfferImagesApi } from "../services/allApi"; // adjust path if needed

export default function FishingStoreHero({
  autoPlay = true,
  interval = 4000,
  className = ""
}) {

  const [banner, setBanner] = useState([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  // ✅ Fetch Banner from API
  const getBanner = async () => {
    try {
      const result = await getOfferImagesApi();
      console.log("Banner API:.........", result.data);
      setBanner(result.data.offers || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  // ✅ Auto Slide (only if banner available)
  useEffect(() => {
    if (!autoPlay || !playing || banner.length === 0) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banner.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, playing, autoPlay, interval, banner.length]);

  const nextSlide = () => {
    if (banner.length === 0) return;
    setCurrent((current + 1) % banner.length);
  };

  const prevSlide = () => {
    if (banner.length === 0) return;
    setCurrent((current - 1 + banner.length) % banner.length);
  };

  return (
    <section
      className={`position-relative overflow-hidden ${className}`}
      style={{
        height: "clamp(420px, 65vh, 700px)"
      }}
    >
      {/* ✅ Slides from API */}
      {banner.map((item, index) => (
        <div
          key={index}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            opacity: current === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: current === index ? 1 : 0
          }}
        >
          <img
            src={item.image_url}   // ⚡ Make sure backend sends image field
            alt={item.title || "banner"}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />

          {/* Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ background: "rgba(0,0,0,0.45)" }}
          />

          {/* Content */}
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
            <h1
              className="fw-bold display-3"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
            >
              {item.title}
            </h1>
            <p
              className="lead mb-4"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}

      {/* Optional: Arrows */}
      {/* {banner.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle shadow"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle shadow"
          >
            ❯
          </button>
        </>
      )} */}
    </section>
  );
}