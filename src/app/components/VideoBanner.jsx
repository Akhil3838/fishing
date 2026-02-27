'use client'
import { useState, useEffect } from "react";

export default function FishingStoreHero({
  slides = [
    { src: "https://img.freepik.com/free-photo/view-cartoon-possum-character_23-2150989763.jpg?t=st=1772190250~exp=1772193850~hmac=64e5fe957c706b9bf1b5b9807856153a4bd2e24f2f0e064bd10c699055c0ed42&w=1480", title: "Premium Fishing Gear", description: "Catch bigger, fish smarter." },
    { src: "https://img.freepik.com/free-photo/father-son-enjoying-fishing-by-lake_23-2151963547.jpg?t=st=1772190298~exp=1772193898~hmac=8bc4acb7621894ccee593a68e6e519f19cc2c4f6cc9e8fdb7de0bce9f5143221&w=1480", title: "Freshwater & Saltwater Collection", description: "Everything you need in one place." },
    { src: "/hero3.jpg", title: "Trusted by Anglers", description: "Quality equipment for real fishermen." },
  ],
  autoPlay = true,
  interval = 4000,
  className = ""
}) {

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Auto Slide
  useEffect(() => {
    if (!autoPlay || !playing) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, playing, autoPlay, interval, slides.length]);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
<section
  className={`position-relative overflow-hidden ${className}`}
  style={{
    height: "clamp(420px, 65vh, 700px)"
  }}
>      
      {/* Slides */}
      {slides.map((slide, index) => (
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
            src={slide.src}
            alt=""
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
            {/* <h1 className="fw-bold display-3" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
              {slide.title}
            </h1>
            <p className="lead mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
              {slide.description}
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-success btn-lg rounded-pill shadow">
                Shop Now
              </button>
              <button className="btn btn-outline-light btn-lg rounded-pill shadow">
                Explore
              </button>
            </div> */}
          </div>
        </div>
      ))}

      {/* Arrows */}
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

      {/* Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              cursor: "pointer",
              background: current === i ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all .3s"
            }}
          />
        ))}
      </div>

      {/* Play Pause */}
      <button
        onClick={() => setPlaying(!playing)}
        className="btn btn-light position-absolute bottom-0 end-0 m-3 rounded-circle shadow"
      >
        {playing ? "⏸" : "▶"}
      </button>

    </section>
  );
}