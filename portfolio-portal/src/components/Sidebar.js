import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectIcon from '@mui/icons-material/Build';
import ExperienceIcon from '@mui/icons-material/Work';
import EducationIcon from '@mui/icons-material/School';
import CertificationIcon from '@mui/icons-material/VerifiedUser';
import SkillsIcon from '@mui/icons-material/BuildCircle';
import ContactIcon from '@mui/icons-material/ContactMail';
import OpenAPIIcon from '@mui/icons-material/Api';
import MediumIcon from '@mui/icons-material/Book';

import { Sidebar, Menu, MenuItem, SubMenu  } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const ClippedDrawer = () => {
  const icons = [
    <DashboardIcon />,
    <ProjectIcon />,
    <ExperienceIcon />,
    <EducationIcon />,
    <CertificationIcon />,
    <SkillsIcon />,
    <ContactIcon />,
    <OpenAPIIcon />,
    <MediumIcon />,
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`, backgroundSize: 'cover' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Portfolio
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`, backgroundSize: 'cover' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Project', 'Experience', 'Education', 'Certification', 'Skills & Tools', 'Contact'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['OpenAPI', 'Medium'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {icons[index + 7]} {/* Adjust index to match the starting position for the second list */}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ClippedDrawer;