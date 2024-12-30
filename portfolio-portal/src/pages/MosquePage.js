import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionCard from './../components/common/SectionCard';
import SectionPaper from './../components/common/SectionPaper';
import { sectionsData } from '../data/mosqueData';

const MosquePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const sections = sectionsData(t, navigate);

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: `url(/management/mosque.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: { xs: 300, sm: 400, md: 500 }, // Responsive height
                    borderRadius: '8px',
                    marginBottom: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
                        borderRadius: '8px',
                    }}
                />
                <Typography variant="h3" fontWeight="bold" zIndex={1} sx={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)' }}>
                    {t('homepage.title')}
                </Typography>
                <Typography variant="h6" zIndex={1} sx={{ marginTop: 10, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)' }}>
                    {t('homepage.subtitle')}
                </Typography>
            </Box>

            {/* Main Content */}
            <Grid container justifyContent="center">
                {/* Sections */}
                <Grid container spacing={4} justifyContent="center">
                    {sections.map((section, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            {section.type === 'card' ? (
                                <SectionCard
                                    image={section.image}
                                    title={section.title}
                                    description={section.description}
                                    buttonText={section.buttonText}
                                    onClick={section.onClick}
                                    sx={{
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease-in-out',
                                            boxShadow: 6,
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        },
                                        padding: 2,
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                />
                            ) : (
                                <SectionPaper
                                    title={section.title}
                                    description={section.description}
                                    buttonText={section.buttonText}
                                    onClick={section.onClick}
                                    sx={{
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease-in-out',
                                            boxShadow: 6,
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        },
                                        padding: 2,
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Footer (optional) */}
            <Box sx={{ textAlign: 'center', marginTop: 5, paddingBottom: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    &copy; {new Date().getFullYear()} Mosque Management. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default MosquePage;
