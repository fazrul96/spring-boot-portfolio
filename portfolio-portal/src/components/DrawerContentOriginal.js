import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import { useAuth0 } from '@auth0/auth0-react';

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
import ComponentPage from './pages/ComponentPage';
import OpenApiPage from './pages/OpenApiPage';
import MediumPage from './pages/MediumPage';
import ModulePage from './pages/ModulePage';
import OCRPage from './pages/OCRPage';
//import CalendarPage from './pages/CalendarPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogContent from './pages/BlogContent';
// Hooks
import ApiService from './hooks/ApiService';

const App = () => {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
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
        const blogsData = await apiService.fetchBlogs();

        setExperiences(experiencesData);
        setEducations(educationsData);
        setCertifications(certificationsData);
        setProjects(projectsData);
        setSkills(skillsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const { user, isAuthenticated } = useAuth0();

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
              <Route path="/medium" element={<MediumPage />} />
              <Route path="/module" element={<ModulePage />} />
              <Route path="/module/ocr" element={<OCRPage />} />
              {/*
              <Route path="/module/calendar" element={<CalendarPage />} />
              */}

              {isAuthenticated && (
                <>
                  <Route path="/openapi" element={<OpenApiPage />} />
                  <Route path="/jenkins" element={<JenkinRedirect />} />
                  <Route path="/blog" element={<BlogPage blogs={blogs} />} />
                  <Route path="/blog/:alias" element={<BlogDetailPage />} />
                  <Route path="/blog/:alias/chapter/:chapter" element={<BlogContent />} />
                </>
              )}
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

const JenkinRedirect = () => {
  // Open the URL in a new tab
  window.open(process.env.REACT_APP_JENKINS_URL, '_blank');
  return null; // No need to render anything
};

export default App;
