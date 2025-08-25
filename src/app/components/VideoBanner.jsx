'use client'
import { useRef, useState, useEffect } from "react";

export default function FishingStoreHero({
  src = "/scales.mp4", // replace with your fishing video file
  poster,
  title = "",
  description = "",
  loop = true,
  autoPlay = true,
  className = "",
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (autoPlay) {
      v.muted = true;
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <section className={`position-relative ${className}`} style={{ height: "90vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        muted={isMuted}
        className="w-100 h-100"
        style={{ objectFit: "cover"}}
      />

      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: "rgba(0,0,0,0.45)" }}
      />

      {/* Hero Content */}
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
        <h1 className="fw-bold display-3" style={{ textShadow: "2px 2px 8px rgba(241, 236, 236, 0.7)" }}>
          {title}
        </h1>
        <p className="lead mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {description}
        </p>
        {/* <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-success btn-lg rounded-pill shadow">
            🛒 Shop Now
          </button>
          <button className="btn btn-outline-light btn-lg rounded-pill shadow">
            Explore Collections
          </button>
        </div> */}
      </div>

      {/* Video Controls */}
      <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
        <button onClick={togglePlay} className="btn btn-light btn-sm rounded-circle shadow">
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={toggleMute} className="btn btn-light btn-sm rounded-circle shadow">
          {isMuted ? "🔈" : "🔊"}
        </button>
      </div>
    </section>
  );
}
