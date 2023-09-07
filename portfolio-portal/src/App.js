import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Carousel from './components/Carousel';
import Swiper from './components/Swiper';
import Footer from './components/Footer';
import Portfolio from './components/section/portfolios/Portfolio';
import Project from './components/section/projects/Project';
import Experience from './components/section/experiences/Experience';
import Education from './components/section/educations/Education';
import Certification from './components/section/certifications/Certification';
import Skills from './components/section/skills/Skill';
import Contact from './components/section/Contact';
import ApiService from './hooks/ApiService';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiService = new ApiService(process.env.REACT_APP_BASE_URL);

        const experiencesData = await apiService.fetchExperiences();
        const educationsData = await apiService.fetchEducations();
        const certificationsData = await apiService.fetchCertifications();
        const projectsData = await apiService.fetchProjects();
        const skillsData = await apiService.fetchSkills();

        setExperiences(experiencesData);
        setEducations(educationsData);
        setCertifications(certificationsData);
        setProjects(projectsData); 
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <main>
              {/* <Carousel /> */}
              <Swiper />

              <Portfolio />
              <Project projects={projects} id="projects" />
              <Experience experiences={experiences} id="experiences" />
              <Education educations={educations} id="educations"/>
              <Certification certifications={certifications} id="certifications"/>
              <Skills skills={skills} id="skills"/>
              {error && <p className="error-message">Error fetching data: {error.message}</p>}
              <Contact />
            </main>
            <Footer />
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
