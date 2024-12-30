import React, { useState } from 'react';
import { Grid, Typography, Paper, Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import ProfileCard from './ProfileCard';
import SummaryList from './SummaryList';
import SkillsList from './SkillsList';
import RolesList from './RolesList';
import IndustryList from './IndustryList';
import { SUMMARIES, SKILLS, ROLES, INDUSTRIES } from '../../../data/portfolioData';
import profileImage from '../../../assets/img/profile-img.jpg';

const PortfolioContent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const containerStyles = (backgroundImage) => ({
        padding: 4,
        margin: 'auto',
        marginTop: '8rem',  // Adjusted for spacing
        marginBottom: 4,
        flexGrow: 1,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
        transition: 'background-position 0.3s ease-out',
        '&:hover': {
            backgroundPosition: 'center bottom',
        },
    });

    const backgroundImageUrl = 'https://getwallpapers.com/wallpaper/full/7/d/c/1172966-free-download-developer-wallpaper-hd-2560x1440-cell-phone.jpg';

    return (
        <Paper elevation={12} sx={containerStyles(backgroundImageUrl)}>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {/* Profile Section */}
                <Grid item xs={12} sm={4} container justifyContent="center" alignItems="center">
                    <ProfileCard profileImage={profileImage} />
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} sm={8}>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={activeTab}
                            onChange={(event, newValue) => setActiveTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            sx={{
                                borderBottom: '2px solid #ddd',
                                '& .MuiTab-root': {
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: '#444',
                                    '&:hover': {
                                        color: '#000',
                                    },
                                },
                                '& .Mui-selected': {
                                    color: '#000',
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <Tab label="Overview" />
                            <Tab label="Experience" />
                        </Tabs>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={4}>
                            {/* Overview Tab Content */}
                            {activeTab === 0 && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                                            Welcome to My Portfolio!
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.8, color: '#444' }}>
                                            I’m a full-stack developer with 4+ years of experience in creating user-friendly and
                                            efficient applications across diverse industries. Skilled in both frontend and backend
                                            technologies, I’m passionate about delivering seamless digital experiences. Explore my work,
                                            and feel free to reach out!
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <SummaryList summaries={SUMMARIES} />
                                    </Grid>
                                </>
                            )}

                            {/* Experience Tab Content */}
                            {activeTab === 1 && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <RolesList roles={ROLES} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <IndustryList industries={INDUSTRIES} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <SkillsList skills={SKILLS} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PortfolioContent;
