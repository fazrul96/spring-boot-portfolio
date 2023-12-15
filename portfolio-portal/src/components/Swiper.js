import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperElements = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide style={{ height: '100%' }}>
        <video className="video-intro" autoPlay loop muted style={{ width: '100%', height: '100%' }}>
          <source src="https://mdbootstrap.com/img/video/Tropical.mp4" type="video/mp4"/>
        </video>
      </SwiperSlide>
      <SwiperSlide style={{ height: '100%' }}>
        <video className="video-intro" autoPlay loop muted style={{ width: '100%', height: '100%' }}>
          <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4"/>
        </video>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperElements;
