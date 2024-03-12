import React from 'react';
import { Box } from '@mui/material';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperElements = () => {
  return (
  <Box sx={{ flexGrow: 1, padding: 2 }}>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
    {/*
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
      <SwiperSlide style={{ height: '100%' }}>
        <img
          src="https://lumitoon.com/wp-content/uploads/2021/07/Tomb-Raider-King-Banner.png"
          alt="Swiper Slide 1"
        />
      </SwiperSlide>
      */}
      <SwiperSlide style={{ height: '100%', width: '155vh' }}>
        <img
          src="https://lumitoon.com/wp-content/uploads/2021/07/lv25.jpg"
          alt="Swiper Slide 1"
        />
      </SwiperSlide>
    </Swiper>
  </Box>
  );
};

export default SwiperElements;
