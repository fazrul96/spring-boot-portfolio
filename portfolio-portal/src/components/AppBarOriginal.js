import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Divider, FormControl, Modal, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import { useAuth0 } from '@auth0/auth0-react';
import LoginAuth0 from './Login';

const ResponsiveAppBarOriginal = () => {
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

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const publicPages = ['Component', 'Medium', 'Module'];
  const privatePages = ['OpenApi', 'Pipeline', 'Webtoon', 'Movie'];
  const generalSettings = ['Home', 'Profile', 'Settings'];
  const authenticatedSettings =  [user ? user.name : null, user ? user.email : null, 'Logout'];
  const nonAuthenticatedSettings = ['Login'];
  return (
    <AppBar position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`,
            backgroundSize: 'cover',
            marginTop: '10rem'
        }}
      >
      <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
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
                <LoginAuth0 />
                <FormControl fullWidth>
                  <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                    Sign In with Auth0
                  </Button>
                </FormControl>
              </Box>
          </Modal>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBarOriginal;
