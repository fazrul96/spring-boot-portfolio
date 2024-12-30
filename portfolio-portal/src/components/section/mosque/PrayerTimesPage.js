import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Card, CardContent, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PrayerTimeCard from './../mosque/prayerTimes/PrayerTimeCard';
import StateCitySelector from './../mosque/prayerTimes/StateCitySelector';
import { STATES } from '../../../data/stateData';
import { DEFAULT_IMAGE } from "../../../constants/AppConstants";
import { fetchPrayerTimes, findNextPrayer } from '../../../utils/prayerTimes';

// Custom hook to manage prayer times fetching and processing
const usePrayerData = (selectedCity) => {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPrayerTimes = async () => {
            try {
                const data = await fetchPrayerTimes(selectedCity);
                setPrayerTimes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPrayerTimes();
    }, [selectedCity]);

    return { prayerTimes, loading, error };
};

const PrayerTimes = () => {
    const { t } = useTranslation();
    const [selectedCity, setSelectedCity] = useState("Kuala Lumpur");
    const [selectedState, setSelectedState] = useState("Wilayah Persekutuan");

    // Fetch prayer times using custom hook
    const { prayerTimes, loading, error } = usePrayerData(selectedCity);

    // Get the current date and time
    const todayDate = new Date().toLocaleDateString("en-GB", {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    });
    const currentTime = new Date();
    const currentTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const currentTime24 = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(":", "");

    // Default values for the next prayer
    let nextPrayer = null;
    let nextPrayerTime = null;
    let remainingTime = null;

    if (prayerTimes) {
        const { nextPrayerDetails } = findNextPrayer(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'], prayerTimes, currentTime24);
        nextPrayer = nextPrayerDetails.prayer;
        nextPrayerTime = nextPrayerDetails.prayerTime;
        remainingTime = 2400 - nextPrayerDetails.diff;

        const hours = Math.floor(remainingTime / 60); // Get the number of hours
        const minutes = remainingTime % 60;         // Get the remaining minutes
        const seconds = 0;                          // No seconds in this case, but you could implement it if needed

        // Format the remaining time
        remainingTime = `${hours}h ${minutes}m ${seconds}s`;
    }

    // Loading and error handling
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.paper">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.paper">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    // Relevant prayers data to be displayed
    const relevantPrayers = prayerTimes ? {
        Fajr: prayerTimes.Fajr || null,
        Sunrise: prayerTimes.Sunrise || null,
        Dhuhr: prayerTimes.Dhuhr || null,
        Asr: prayerTimes.Asr || null,
        Maghrib: prayerTimes.Maghrib || null,
        Isha: prayerTimes.Isha || null,
    } : {};

    return (
        <Box sx={{ flexGrow: 1, padding: 3, marginTop: 8, backgroundColor: 'background.paper' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link color="inherit" to="/mosque" underline="hover">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">{t('sections.prayerTimes.title')}</Typography>
            </Breadcrumbs>

            <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* City & State Selector */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom align="left" fontWeight="bold" color="primary" sx={{ fontSize: '1.8rem' }}>
                                {t('sections.prayerTimes.inCity')} {selectedCity}
                            </Typography>
                            <StateCitySelector
                                states={STATES}
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                t={t}
                            />
                        </Grid>

                        {/* Date and Time */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'right', paddingRight: 3 }}>
                                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                    {todayDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                                    {currentTimeString}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ marginBottom: 3, marginTop: 3 }} />

                    {/* Display the next prayer time */}
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Card
                                elevation={5}
                                sx={{
                                    padding: 3,
                                    backgroundImage: `url(${DEFAULT_IMAGE})`,
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
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the overlay a bit
                                        borderRadius: 'inherit',
                                    },
                                }}
                            >
                                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            zIndex: 1, // Ensure it stays on top of the background
                                            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                                        }}
                                    >
                                        {t('sections.prayerTimes.nextPrayer')}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
                                        }}
                                    >
                                        {nextPrayer} {nextPrayerTime}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white', marginTop: 1, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
                                        {t('sections.prayerTimes.remainingTime')}:
                                        <span style={{ fontWeight: 'bold', color: 'yellow' }}> {/* You can change color here */}
                                            {remainingTime}
                                        </span>
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Display prayer times */}
                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
                        {Object.keys(relevantPrayers).map((prayer) => (
                            <Grid item xs={12} sm={6} md={4} key={prayer}>
                                <PrayerTimeCard prayer={prayer} time={relevantPrayers[prayer]} t={t} />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PrayerTimes;
