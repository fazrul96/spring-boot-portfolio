import React from 'react';
import { Box, Grid } from '@mui/material';
import ProjectCard from '../../../components/section/projects/ProjectCard';
import ProjectCarousel from '../../../components/section/projects/ProjectCarousel';

const Project = ({projects}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
          <section id="projects">
            {/*
            <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
              Experience
            </h1>
            <p className="portfolio-subheading">Here are my previous projects</p> */}
            {/* Map through projects and render ProjectCard for each */}
            <Grid container spacing={2}>
              {projects.map((project, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </section>
    </Box>
  );
};

const ProjectCustomCarousel = ({ projects }) => (
    <Box sx={{ flexGrow: 1 }}>
        <section id="projects">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <ProjectCarousel projects={projects} />
        </Grid>
        </section>
    </Box>
);

export default ProjectCustomCarousel;