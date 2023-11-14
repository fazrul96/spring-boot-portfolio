import React from 'react';
import { Box, Grid } from '@mui/material';
import ExperienceCard from '../../../components/section/experiences/ExperienceCard';

const Experience = ({ experiences }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <section id="experience">
            <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
              Experience
            </h1>
            <p className="portfolio-subheading">Here are my previous experiences</p>
            {/* Map through experiences and render ExperienceCard for each */}
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </section>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Experience;