import React from 'react';
import { Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperVertical = ({ projects, direction = 'vertical' }) => {
  return (
    <Grid item xs={12} md={12}>
      <Swiper
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
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

export default SwiperVertical;
