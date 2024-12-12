import React from 'react';
import { Menu, MenuItem, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PUBLIC_PAGES, PRIVATE_PAGES } from '../constants/AppConstants';

const NavigationMenu = ({ anchorElNav, handleCloseNavMenu }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{ display: { xs: 'block', md: 'none' } }}
    >
      {PUBLIC_PAGES.map((page) => (
        <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page}`}>
          <Typography textAlign="center">{page}</Typography>
        </MenuItem>
      ))}

      {isAuthenticated && (
        <>
          <Divider />
          {PRIVATE_PAGES.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page}`}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </>
      )}
    </Menu>
  );
};

export default NavigationMenu;
