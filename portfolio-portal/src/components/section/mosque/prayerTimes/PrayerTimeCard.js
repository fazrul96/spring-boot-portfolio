import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';

const PrayerTimeCard = ({ prayer, time, t }) => {
    return (
        <Card elevation={3} sx={{
            borderRadius: 2, padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)', display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <CardContent align="center">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {t(`sections.prayerTimes.${prayer}`)}
                </Typography>
                <Typography variant="h7" color="primary">
                    {time}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PrayerTimeCard;
