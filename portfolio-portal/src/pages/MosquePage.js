import React from 'react';
import {Box, Breadcrumbs, Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {styled} from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const MosquePage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link
                    color="inherit"
                    onClick={() => handleNavigate('/')}
                    underline="hover"
                    style={{ cursor: 'pointer' }}
                 to={'/'}>
                    Home
                </Link>
                <Typography color="textPrimary">Mosque Management</Typography>
            </Breadcrumbs>

            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12}>
                    <Box textAlign="center">
                        <Typography variant="h3" gutterBottom fontWeight="bold">
                            Mosque Management System
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Streamline mosque operations with ease and efficiency.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                User Management
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Add and manage user details for mosque operations.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleNavigate('/mosque/users')}
                            >
                                Manage Users
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Logistics
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Track mosque resources and inventory.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleNavigate('/mosque/logistic')}
                            >
                                Manage Logistics
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Sponsors
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                View and manage sponsor details and contributions.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => alert('Sponsors feature coming soon!')}
                            >
                                Manage Sponsors
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Events
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Schedule and track events.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => alert('Events feature coming soon!')}
                            >
                                Manage Events
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MosquePage;
