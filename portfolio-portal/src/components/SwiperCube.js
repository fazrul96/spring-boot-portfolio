import React from 'react';
import { Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

const loadSwiperModules = async ({ direction = 'cube' }) => {
  // Dynamically import the appropriate CSS file based on the direction
  if (direction === 'cube') {
    await import('./../assets/css/cube-swiper.css');
  }
};

const SwiperCube = ({ projects, direction = 'cube' }) => {
  return (
      <Grid item xs={12} md={12}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={false}
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCube, Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://wallpapercave.com/wp/wp2708351.jpg"
              alt="Swiper Slide 1"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://wallpapercave.com/wp/wp2708351.jpg"
              alt="Swiper Slide 2"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://wallpapercave.com/wp/wp2708351.jpg"
              alt="Swiper Slide 3"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://wallpapercave.com/wp/wp2708351.jpg"
              alt="Swiper Slide 4"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
        </Swiper>
      </Grid>
  );
};

export default SwiperCube;