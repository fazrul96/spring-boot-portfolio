import React from 'react';
import { Box, Grid } from '@mui/material';
import ExperienceCard from '../../../components/section/experiences/ExperienceCard';

const Experience = ({ experiences }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
          <section id="experience">
            {/*
            <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
              Experience
            </h1>
            <p className="portfolio-subheading">Here are my previous experiences</p> */}
            {/* Map through experiences and render ExperienceCard for each */}
            <Grid container spacing={2}>
              {experiences.map((experience, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <ExperienceCard experience={experience} />
                </Grid>
              ))}
            </Grid>
          </section>
    </Box>
  );
};

export default Experience;