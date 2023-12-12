import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import CertificationCard from '../../../components/section/certifications/CertificationCard';

const Certification = ({ certifications }) => {
  return (
      <Box sx={{ flexGrow: 1 }}>
            <section id="certification">
              {/*
              <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
                Certification
              </h1>
              <p className="portfolio-subheading">Here are my previous certifications</p> */}
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                {certifications.map((certification, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <CertificationCard certification={certification} />
                  </Grid>
                ))}
              </Grid>
            </section>
      </Box>
  );
};

export default Certification;