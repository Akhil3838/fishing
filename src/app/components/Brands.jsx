"use client";
import React, { useEffect, useState } from "react";
import { brandsApi } from "../services/allApi";
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";

if (typeof window !== "undefined") {
  // Make jQuery global so Owl can hook into it
  window.$ = window.jQuery = $;
  require("owl.carousel");
}

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const result = await brandsApi();
        setBrands(result?.data?.brands || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (brands.length > 0) {
      const $owl = $(".client-slider");

      // destroy old instance if exists
      $owl.trigger("destroy.owl.carousel");

      $owl.owlCarousel({
        items: 5,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: false,
        nav: true,
        responsive: {
          0: { items: 2 },
          576: { items: 3 },
          768: { items: 4 },
          992: { items: 5 },
        },
      });

      return () => {
        $owl.trigger("destroy.owl.carousel");
      };
    }
  }, [brands]);

  return (
    <div className="row">
      <div className="col-md-12">
<div className="client-slider owl-carousel">
              {brands.map((item) => (
<a key={item.id} title={item.title}>             
   <img 
           src={item.logo_url}
                alt={item.title || "logo"}
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "contain",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;
