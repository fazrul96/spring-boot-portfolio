import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import Portfolio from './components/section/Portfolio'; // Fixed typo in import statement
import Project from './components/section/Project';
import Experience from './components/section/Experience';
import Education from './components/section/Education';
import Certification from './components/section/Certification';
import Skills from './components/section/Skill'; // Fixed typo in import statement
import Contact from './components/section/Contact';
import { fetchExperiences, fetchEducations, fetchProjects} from './services/ApiServices';
function App() {
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const experiencesData = await fetchExperiences();
        const educationsData = await fetchEducations();
        const projectsData = await fetchProjects();

        setExperiences(experiencesData);
        setEducations(educationsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    }

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
          <Certification />
          <Skills />
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
