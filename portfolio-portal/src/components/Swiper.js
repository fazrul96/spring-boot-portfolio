import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from 'react-bootstrap';

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
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>          
        <video className="video-intro" autoPlay loop muted>
          <source src="https://mdbootstrap.com/img/video/Tropical.mp4" type="video/mp4"/>
        </video>
      </SwiperSlide>
      <SwiperSlide>          
        <video className="video-intro" autoPlay loop muted>
          <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4"/>
        </video>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperElements;
