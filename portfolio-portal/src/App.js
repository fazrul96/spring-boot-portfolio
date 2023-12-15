import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Sections
import Portfolio from './components/section/portfolios/Portfolio';
import Project from './components/section/projects/Project';
import Experience from './components/section/experiences/Experience';
import Education from './components/section/educations/Education';
import Certification from './components/section/certifications/Certification';
import Skills from './components/section/skills/Skill';
import Contact from './components/section/Contact';

// Pages
import HomePage from './pages/HomePage';
import OpenApiPage from './pages/OpenApiPage';
import MediumPage from './pages/MediumPage';
import ComponentPage from './pages/ComponentPage';

// Hooks
import ApiService from './hooks/ApiService';

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
        const apiService = new ApiService(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_URL);

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
      <Container fluid className="p-0">
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10} className="p-0">
            <Routes>
              <Route path="/" element={<HomePage projects={projects} experiences={experiences} educations={educations} certifications={certifications} skills={skills} error={error} />} />
              <Route path="/component" element={<ComponentPage />} />
              <Route path="/openapi" element={<OpenApiPage />} />
              <Route path="/medium" element={<MediumPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
