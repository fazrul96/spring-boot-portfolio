import React, { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag"
import { Link } from 'react-router-dom';
import { AppBar, Box, Container, Divider, FormControl, Modal, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import { useAuth0 } from '@auth0/auth0-react';
import LoginAuth0 from './Login';

const ResponsiveAppBar = () => {
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
  const privatePages = ['Storage', 'OpenApi', 'Pipeline', 'Webtoon', 'Movie'];
  const generalSettings = ['Profile', 'Settings'];
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
        }}
      >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex',  }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link} to={`/`}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

            Portfolio
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {publicPages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page}`}>
                {/*
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                */}
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              { isAuthenticated && (
                <div>
                    <Divider/>
                    {privatePages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page}`}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                </div>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link} to={`/`}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Portfolio
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/*
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <div>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: 1 }}>
                  {isAuthenticated && (
                      <ReactCountryFlag
                          countryCode="MY"
                          svg
                          cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                          cdnSuffix="svg"
                          title="MY"
                      />
                  )}
                </IconButton>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {isAuthenticated ? (
                    <Avatar alt={user.name} src={user.picture} />
                  ) : (
                    <Avatar alt="Unknown" />
                  )}
                </IconButton>
              </div>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                {
                  generalSettings.map((setting, index) => {
                    if (isAuthenticated) {
                      if (index === 0) {
                        return (
                          <React.Fragment key={index}>
                            <MenuItem key={`${setting}-${index}`} onClick={handleCloseUserMenu} component={Link} to={`/${setting}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>{authenticatedSettings[0]}</Typography>
                              <Typography textAlign="center" sx={{ color: 'green', marginTop: '4px' }}>{authenticatedSettings[1]}</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem key={`${setting}-${index + 1}`} onClick={handleCloseUserMenu} component={Link} to={`/`} >
                              <Typography textAlign="center">{generalSettings[0]}</Typography>
                            </MenuItem>
                            <MenuItem key={`${setting}-${index + 2}`} onClick={handleCloseUserMenu} component={Link} to={`/profile`} >
                              <Typography textAlign="center">{generalSettings[1]}</Typography>
                            </MenuItem>
                            <MenuItem key={`${setting}-${index + 3}`} onClick={handleCloseUserMenu} component={Link} to={`/settings`} >
                              <Typography textAlign="center">{generalSettings[2]}</Typography>
                            </MenuItem>
                             <Divider key={`divider-${index + 1}`} />
                            <MenuItem key={`${setting}-${index + 4}`} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                              <Typography textAlign="center" style={{ color: 'red' }}>{authenticatedSettings[2]}</Typography>
                            </MenuItem>

                          </React.Fragment>
                        );
                      }
                    } else {
                      if (index === 0) {
                        return (
                          <React.Fragment key={index}>
                            <MenuItem key={`${setting}-${index}`} onClick={() => setShowLoginModal(true)}>
                              <Typography textAlign="center">{nonAuthenticatedSettings[0]}</Typography>
                            </MenuItem>
                            <Modal
                                key={`modal-${index}`}
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
                          </React.Fragment>
                        );
                      }
                    }
                  })
                }
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
