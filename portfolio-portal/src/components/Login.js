import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Login = () => {
  return (
    <>
        <img src="http://localhost:3000/static/media/profile-img.2d397386801f1e6e2fd7.jpg" alt="Your Logo" style={{ marginBottom: '1rem', width: '100px' }} />
        <Typography variant="h5" gutterBottom>
            Welcome to my Portfolio
        </Typography>
        <Typography variant="body1" paragraph>
            Please sign in to access the full application features.
            {/*
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
            */}
        </Typography>
    </>
  );
};

export default Login;