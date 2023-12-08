import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Parallax, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import ExperienceCard from '../../../components/section/experiences/ExperienceCard';

const loadSwiperModules = async ({ direction = 'default' }) => {
  // Dynamically import the appropriate CSS file based on the direction
  if (direction === 'coverflow') {
    await import('./../../../assets/css/coverflow-swiper.css');
  } else if (direction === 'parallax') {
    await import('./../../../assets/css/parallax-swiper.css');
  } else if (direction === 'space') {
    await import('./../../../assets/css/space-swiper.css');
  } else if (direction === 'vertical') {
    await import('./../../../assets/css/vertical-swiper.css');
  }
};

const ExperienceCarousel = ({ experiences, direction = 'default' }) => {
  useEffect(() => {
    const initSwiper = async () => {
      await loadSwiperModules(direction);
    };

    initSwiper();
  }, [direction]);

  const backgroundImage = '';//url(https://wallpapercave.com/wp/wp2708351.jpg)';

  return (
  <Grid item xs={12} md={12}>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      loop={false}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {experiences.map((experience, index) => (
        <SwiperSlide key={index} style={{ backgroundImage: backgroundImage }}>
            <ExperienceCard experience={experience} />
        </SwiperSlide>
      ))}
    </Swiper>
  </Grid>
  );
};

export default ExperienceCarousel;
