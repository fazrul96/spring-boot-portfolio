import React from 'react';
import Portfolio from './../components/section/portfolios/Portfolio';
import Project from './../components/section/projects/Project';
import Experience from './../components/section/experiences/Experience';
import Education from './../components/section/educations/Education';
import Certification from './../components/section/certifications/Certification';
import Skills from './../components/section/skills/Skill';
import Contact from './../components/section/Contact';

const HomePage = ({ projects, experiences, experienceItems, educations, certifications, skills, error }) => {
  return (
    <>
      <Portfolio />
      <Project projects={projects} id="projects" />
      <Experience experiences={experiences} experienceItems={experienceItems} id="experiences" />
      <Certification certifications={certifications} id="certifications" />
      {/*
      <Skills skills={skills} id="skills" />
      <Education educations={educations} id="educations" />
      <Contact />
      */}
      {error && <p className="error-message">Error fetching data: {error.message}</p>}
    </>
  );
};

export default HomePage;
