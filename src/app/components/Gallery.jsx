'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { galleryApi } from '../services/allApi'

function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await galleryApi()
        setImages(result?.data?.images || [])
      } catch (error) {
        console.error('Gallery fetch error:', error)
      }
    }
    fetchImages()
  }, [])

  return (
    <div className="row">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={3}               // ✅ DESKTOP UNCHANGED
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}

        /* 🔑 RESPONSIVE FIX (ONLY MOBILE & TABLET) */
        breakpoints={{
          0: {
            slidesPerView: 1,           // 📱 mobile
          },
          768: {
            slidesPerView: 2,           // 📱 tablet
          },
          992: {
            slidesPerView: 3,           // 💻 desktop (same as before)
          },
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="gallery-item">
              <img
                src={img.image_url}
                alt={img.title || 'gallery image'}
                className="img-fluid"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Gallery
