import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';

const PrayerTimeCard = ({ prayer, time, t }) => {
    return (
        <Card
            elevation={5}
            sx={{
                padding: 3,
                backgroundImage: `url(/management/fajr.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                textAlign: 'center',
                position: 'relative',
                height: '100%', // Ensure it takes the full height
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darken the overlay a bit
                    borderRadius: 'inherit',
                },
            }}
        >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
                }}>
                    {t(`sections.prayerTimes.${prayer}`)}
                </Typography>
                <Typography variant="h6" sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                }}>
                    {time}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PrayerTimeCard;
