import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Box, CssBaseline, Drawer } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
// Routes
import { publicRoutes, protectedRoutes } from './routes/AppRoutes';
// Pages
import HomePage from './pages/HomePage';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import SidebarDrawer from './components/SidebarDrawer';
import AppBarResponsive from './components/AppBar';
// Services
import ApiService from './services/ApiService';

const drawerWidth = 240;
const App = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [educations, setEducations] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

	const [mobileOpen, setMobileOpen] = useState(false);
	const apiService = new ApiService(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_PUBLIC_URL);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

//	useEffect(() => {
//		const fetchAllData = async () => {
//		    try {
//                const token = await getAccessTokenSilently();
//                apiService.setToken(token);
//
//                const [educationsData, certificationsData, projectsData, skillsData, blogsData] = await Promise.all([
//                    apiService.fetchEducations(),
//                    apiService.fetchCertifications(),
//                    apiService.fetchProjects(),
//                    apiService.fetchSkills(),
//                    apiService.fetchBlogs(),
//                ]);
//
//			    setEducations(educationsData);
//			    setCertifications(certificationsData);
//			    setProjects(projectsData);
//			    setSkills(skillsData);
//			    setBlogs(blogsData);
//		    } catch (err) {
//		        console.error('Error fetching data:', err);
//			    setError(err);
//		    }
//		};
//
//		if (isAuthenticated) {
//            fetchAllData();
//        }
//	}, [getAccessTokenSilently, apiService, isAuthenticated]);

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
		    <Box component="main">
		        <Routes>
		            <Route path="/" element={<HomePage projects={projects} educations={educations} certifications={certifications} skills={skills} error={error} />} />
					{publicRoutes.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={route.component}
						/>
					))}

		            {protectedRoutes.map((route) => (
		                <Route
		                    key={route.path}
		                    path={route.path}
		                    element={<ProtectedRoute>{route.component}</ProtectedRoute>}
		                />
		            ))}
		        </Routes>
		    </Box>
		  </Box>
		</Router>
	);
}

export default App;