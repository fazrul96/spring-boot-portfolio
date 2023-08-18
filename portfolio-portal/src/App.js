import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import Portfolio from './components/section/Portfolio';
import Project from './components/section/Project';
import Experience from './components/section/Experience';
import Education from './components/section/Education';
import Certification from './components/section/Certification';
import Skills from './components/section/Skill';
import Contact from './components/section/Contact';
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
    <div className="App">
      <Navbar />
      <Carousel />

      <main>
        <div className="container">
          <Portfolio />
          <Project projects={projects} />
          <Experience experiences={experiences} />
          <Education educations={educations} />
          <Certification certifications={certifications} />
          <Skills skills={skills} />
          {error && <p className="error-message">Error fetching data: {error.message}</p>}
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
