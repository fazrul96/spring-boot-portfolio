import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Material
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// MUI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectIcon from '@mui/icons-material/Build';
import OpenAPIIcon from '@mui/icons-material/Api';
import MediumIcon from '@mui/icons-material/Book';

const drawerWidth = 240;

const SidebarItem = ({ text, icon, onClick }) => (
  <ListItemButton onClick={onClick} disablePadding>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
);

const ClippedDrawer = () => {
  const navigate = useNavigate();

  const handleItemClick = (text) => {
    if (text === 'OpenAPI') {
      navigate('/openapi');
    } else if (text === 'Medium') {
      navigate('/medium');
    } else if (text === 'Component') {
      navigate('/component');
    } else {
      navigate('/');
    }
  };

  const sidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Component', icon: <ProjectIcon /> },
    { text: 'OpenAPI', icon: <OpenAPIIcon /> },
    { text: 'Medium', icon: <MediumIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`,
          backgroundSize: 'cover',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" onClick={() => handleItemClick('Portfolio')}>
            Portfolio
          </Typography>
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
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.text}
                text={item.text}
                icon={item.icon}
                onClick={() => handleItemClick(item.text)}
              />
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
