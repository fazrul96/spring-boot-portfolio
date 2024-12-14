import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Modal,
  Toolbar,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Stack,
  Alert
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectIcon from '@mui/icons-material/Build';
import OpenAPIIcon from '@mui/icons-material/Api';
import MediumIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';

import { useAuth0 } from '@auth0/auth0-react';

const drawerWidth = 240;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SidebarItem = ({ text, icon, onClick }) => (
  <ListItemButton onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleItemClick = (text) => {
    const routes = {
      'Dashboard': '/',
      'Component': '/component',
      'Medium': '/medium',
      'Module': '/module',
      'OpenAPI': '/openapi',
      'Pipeline': '/jenkins',
      'Webtoon': '/webtoon',
      'Mosque': '/mosque',
      'Movie': '/movie'
    };
    navigate(routes[text] || '/');
  };

  const publicSidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Component', icon: <ProjectIcon /> },
    { text: 'Medium', icon: <MediumIcon /> },
    { text: 'Module', icon: <MediumIcon /> },
    { text: 'Mosque', icon: <MediumIcon /> },
  ];

  const privateSidebarItems = [
    { text: 'GREDAVERSE', icon: '' },
    { text: 'OpenAPI', icon: <OpenAPIIcon /> },
    { text: 'Pipeline', icon: <OpenAPIIcon /> },
    { text: 'Webtoon', icon: <MediumIcon /> },
    { text: 'Movie', icon: <MediumIcon /> },
  ];

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer, // + 1,
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`,
            backgroundSize: 'cover',
          }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" noWrap onClick={() => handleItemClick('Portfolio')}>
                Portfolio
              </Typography>
                {isAuthenticated ? (
                  <div>
                    <Button color="inherit">{user.name}</Button>
                    <Button color="inherit" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button color="inherit" onClick={() => setShowLoginModal(true)}>Login</Button>
                )}

              <Modal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
              >
                <Box sx={{ ...style, textAlign: 'center', padding: '2rem' }}>
                  <img src="http://localhost:3000/static/media/profile-img.2d397386801f1e6e2fd7.jpg" alt="Your Logo" style={{ marginBottom: '1rem', width: '100px' }} />
                  <Typography variant="h5" gutterBottom>
                    Welcome to my Portfolio
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Please sign in to access the full application features.
                      <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-label="contacts"
                      >
                        <ListItem>
                          <ListItemButton>
                            <ListItemIcon>
                              <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="OpenAPI" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton>
                            <ListItemIcon>
                              <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Blog" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                  </Typography>
                  <FormControl fullWidth>
                    <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                      Sign In with Auth0
                    </Button>
                  </FormControl>
                </Box>
            </Modal>
          </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`,
            backgroundSize: 'cover',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {publicSidebarItems.map((item) => (
              <SidebarItem
                key={item.text}
                text={item.text}
                icon={item.icon}
                onClick={() => handleItemClick(item.text)}
              />
            ))}
          </List>
          {isAuthenticated && (
            <>
              <Divider />
              <List>
                {privateSidebarItems.map((item) => (
                  <SidebarItem
                    key={item.text}
                    text={item.text}
                    icon={item.icon}
                    onClick={() => handleItemClick(item.text)}
                  />
                ))}
              </List>
            </>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;