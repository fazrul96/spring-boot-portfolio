import React, { useState } from 'react';
import { Grid, Typography, Paper, Tabs, Tab, Box } from '@mui/material';
import ProfileCard from './ProfileCard';
import SummaryList from './SummaryList';
import SkillsList from './SkillsList';
import RolesList from './RolesList';
import IndustryList from './IndustryList';
import { SUMMARIES, SKILLS, ROLES, INDUSTRIES } from '../../../data/portfolioData';
import profileImage from '../../../assets/img/profile-img.jpg';

const PortfolioContent = () => {
    const [activeTab, setActiveTab] = useState(0);

    const containerStyles = (backgroundImage) => ({
        padding: 2,
        margin: 'auto',
        mt: 8,
        mb: 2,
        flexGrow: 1,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
    });

    const backgroundImageUrl = 'https://getwallpapers.com/wallpaper/full/7/d/c/1172966-free-download-developer-wallpaper-hd-2560x1440-cell-phone.jpg';

    return (
        <Paper elevation={12} sx={containerStyles(backgroundImageUrl)}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <ProfileCard profileImage={profileImage} />

                <Grid item xs={12} sm container direction="column" spacing={2}>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={activeTab}
                            onChange={(event, newValue) => setActiveTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Overview" />
                            <Tab label="Experience" />
                        </Tabs>
                    </Box>

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {activeTab === 0 && (
                            <>
                                <Grid item xs={12}>
									<Box sx={{ mt: 3 }}>
	                                    <Typography variant="h6" gutterBottom>
	                                        Welcome to My Portfolio!
	                                    </Typography>
	                                    <Typography variant="body1" sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
	                                        I’m a full-stack developer with 4+ years of experience in creating user-friendly and efficient applications across diverse industries. Skilled in both frontend and backend technologies, I’m passionate about delivering seamless digital experiences. Explore my work, and feel free to reach out!
	                                    </Typography>
                                    </Box>
                                    <Box sx={{ mt: 3 }}>
                                        <SummaryList summaries={SUMMARIES} />
                                    </Box>
                                </Grid>
                            </>
                        )}
                        {activeTab === 1 && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <RolesList roles={ROLES} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <IndustryList industries={INDUSTRIES} />
                                </Grid>
                                <Grid item xs={12}>
                                    <SkillsList skills={SKILLS} />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PortfolioContent;
