import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionCard from './../components/common/SectionCard';
import SectionPaper from './../components/common/SectionPaper';
import { sectionsData } from '../data/mosqueData';

const MosquePage = () => {
    const { t } = useTranslation();
    const sections = sectionsData(t, useNavigate());

    return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
            <Box
                sx={{
                    backgroundImage: `url(/management/mosque.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 400,
                    borderRadius: '8px',
                    marginBottom: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
            </Box>

            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Box textAlign="center">
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            {t('homepage.title')}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 4 }}>
                            {t('homepage.subtitle')}
                        </Typography>
                    </Box>
                </Grid>

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
                                />
                            ) : (
                                <SectionPaper
                                    title={section.title}
                                    description={section.description}
                                    buttonText={section.buttonText}
                                    onClick={section.onClick}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default MosquePage;