'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
import { galleryApi } from '../services/allApi'

function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const result = await galleryApi()
      setImages(result.data.images || [])
    }
    fetchImages()
  }, [])

  return (
    <div className="row">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {images.map(img => (
          <SwiperSlide key={img.id}>
           <div className='gallery-item'>
                <img
                  src={img.image_url}
                  alt={img.title}
                  style={{ width: '100%', height: 'auto' }}
                />
           </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Gallery
