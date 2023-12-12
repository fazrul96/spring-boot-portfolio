
import React from 'react';
import { Box, Grid } from '@mui/material';
import EducationCard from '../../../components/section/educations/EducationCard';

const Education = ({ educations }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <section id="education">
            {/*
            <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
              Education
            </h1>
            <p className="portfolio-subheading">Here are my previous educations</p>
            */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {educations.map((education, index) => (
                  <EducationCard key={index} education={education} />
                ))}
            </Grid>
          </section>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Education;