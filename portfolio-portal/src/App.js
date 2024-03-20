import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { useAuth0 } from '@auth0/auth0-react';
// Components
import SidebarDrawer from './components/SidebarDrawer';
import AppBarResponsive from './components/AppBar';

// Sections
import Portfolio from './components/section/portfolios/Portfolio';
import Project from './components/section/projects/Project';
import Experience from './components/section/experiences/Experience';
import Education from './components/section/educations/Education';
import Certification from './components/section/certifications/Certification';
import Skills from './components/section/skills/Skill';
import Contact from './components/section/Contact';
// Pages
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import HomePage from './pages/HomePage';
import ComponentPage from './pages/ComponentPage';
import OpenApiPage from './pages/OpenApiPage';
import StoragePage from './pages/StoragePage';
import SpacePage from './pages/SpacePage';
import MediumPage from './pages/MediumPage';
import ModulePage from './pages/ModulePage';
import OCRPage from './pages/OCRPage';
//import CalendarPage from './pages/CalendarPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogContent from './pages/BlogContent';
// Hooks
import ApiService from './hooks/ApiService';
import { Box, CssBaseline, Drawer } from '@mui/material';

const drawerWidth = 240;

const App = () => {
  const [experiencesWithItems, setExperiencesWithItems] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_URL;
  useEffect(() => {
      const fetchData = async () => {
        try {
          const apiService = new ApiService(url);

          const experiencesWithItemsData = await apiService.fetchExperiencesWithItems();
          const educationsData = await apiService.fetchEducations();
          const certificationsData = await apiService.fetchCertifications();
          const projectsData = await apiService.fetchProjects();
          const skillsData = await apiService.fetchSkills();
          const blogsData = await apiService.fetchBlogs();

          setExperiencesWithItems(experiencesWithItemsData);
          setEducations(educationsData);
          setCertifications(certificationsData);
          setProjects(projectsData);
          setSkills(skillsData);
          setBlogs(blogsData);
        } catch (error) {
          console.log('URL:' + url);
          console.error('Error fetching data:', error);
          setError(error);
        }
      };

      fetchData();
  }, []);

  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarResponsive />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
        {/*
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`,
                backgroundSize: 'cover',
              },
            }}
          >
            <SidebarDrawer />
          </Drawer>
        */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`,
                backgroundSize: 'cover',
              },
            }}
            open
          >
            <SidebarDrawer />
          </Drawer>
        </Box>
        <Box
          component="main"
        >
            <Routes>
              <Route path="/" element={<HomePage projects={projects} experiencesWithItems={experiencesWithItems} educations={educations} certifications={certifications} skills={skills} error={error} />} />
              <Route path="/component" element={<ComponentPage />} />
              <Route path="/medium" element={<MediumPage />} />
              <Route path="/module" element={<ModulePage />} />
              <Route path="/module/ocr" element={<OCRPage />} />
              {/*
              <Route path="/module/calendar" element={<CalendarPage />} />
              */}

              {isAuthenticated && (
                <>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingPage />} />

                  <Route path="/space" element={<SpacePage />} />
                  <Route path="/storage" element={<StoragePage />} />
                  <Route path="/openapi" element={<OpenApiPage />} />
                  <Route path="/blog" element={<BlogPage blogs={blogs} />} />
                  <Route path="/blog/:alias" element={<BlogDetailPage />} />
                  <Route path="/blog/:alias/chapter/:chapter" element={<BlogContent />} />
                </>
              )}
            </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;