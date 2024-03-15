import React from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Material
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
// MUI Icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectIcon from '@mui/icons-material/Build';
import OpenAPIIcon from '@mui/icons-material/Api';
import MediumIcon from '@mui/icons-material/Book';
// Auth0
import { useAuth0 } from '@auth0/auth0-react';

const SidebarDrawer = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const publicSidebarItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, route: '/' },
      { text: 'Component', icon: <ProjectIcon />, route: '/component' },
      { text: 'Medium', icon: <MediumIcon />, route: '/medium' },
      { text: 'Module', icon: <MediumIcon />, route: '/module' },
    ];
    const privateSidebarItems = [
      { text: 'GREDAVERSE',  icon: '', route: '/' },
      { text: 'Storage', icon: <DashboardIcon />, route: '/storage' },
      { text: 'OpenAPI', icon: <OpenAPIIcon />, route: '/openapi' },
      { text: 'Pipeline', icon: <ProjectIcon />, route: '/jenkins' },
      { text: 'Cypress', icon: <ProjectIcon />, route: '/cypress' },
      { text: 'Webtoon', icon: <MediumIcon />, route: '/blog' },
      { text: 'Movie', icon: <MediumIcon />, route: '/movie' },
    ];
    const handleItemClick = (route) => {
        navigate(route);
    };
    return (
        <>
            <Toolbar />
            <Divider />
            <List>
                {(!isAuthenticated ? publicSidebarItems : [...publicSidebarItems, ...privateSidebarItems]).map((item, index) => (
                    <ListItem key={index} disablePadding button onClick={() => handleItemClick(item.route)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </>
    );
};

export default SidebarDrawer;