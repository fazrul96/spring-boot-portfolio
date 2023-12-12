import React from 'react';
import { Box, Grid } from '@mui/material';
import ExperienceCard from '../../../components/section/experiences/ExperienceCard';
import ExperienceCarousel from '../../../components/section/experiences/ExperienceCarousel';

const Experience = ({ experiences }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
          <section id="experience">
            {/*
            <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
              Experience
            </h1>
            <p className="portfolio-subheading">Here are my previous experiences</p> */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {experiences.map((experience, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ExperienceCard experience={experience} />
                </Grid>
              ))}
            </Grid>
          </section>
    </Box>
  );
};

const ExperienceCustomCarousel = ({ experiences }) => (
    <Box sx={{ flexGrow: 1 }}>
        <section id="experience">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <ExperienceCarousel experiences={experiences} />
        </Grid>
        </section>
    </Box>
);

export default ExperienceCustomCarousel;