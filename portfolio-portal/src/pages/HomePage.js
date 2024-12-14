import React from 'react';
import Portfolio from './../components/section/portfolios/Portfolio';
import Project from './../components/section/projects/Project';
//import Experience from './../components/section/experiences/Experience';
//import Education from './../components/section/educations/Education';
//import Certification from './../components/section/certifications/Certification';
//import Skills from './../components/section/skills/Skill';
//import Contact from './../components/section/Contact';
import {Divider,} from '@mui/material';

const HomePage = ({ projects, educations, certifications, skills, error }) => {
	return (
		<div>
		    <Portfolio />
		    <Divider />
	        <Project projects={projects} id="projects" />
	        {/*
		    <Certification certifications={certifications} id="certifications" />
		    <Experience experiencesWithItems={experiencesWithItems} id="experiences" />
		    <Skills skills={skills} id="skills" />
		    <Education educations={educations} id="educations" />
		    <Contact />
		    */}
		    {error && <p className="error-message">Error fetching data: {error.message}</p>}
		</div>
	);
};

export default HomePage;