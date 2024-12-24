import React, {useEffect, useState} from 'react';
import {
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import PrayerTimeCard from './../mosque/prayerTimes/PrayerTimeCard';
import StateCitySelector from './../mosque/prayerTimes/StateCitySelector';
import {STATES} from '../../../data/stateData';
import {DEFAULT_IMAGE} from "../../../constants/AppConstants";

const PrayerTimes = () => {
    const { t } = useTranslation();
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Kuala Lumpur");
    const [selectedState, setSelectedState] = useState("Wilayah Persekutuan");

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Malaysia&method=8`);
                const data = await response.json();
                if (data.code === 200) {
                    setPrayerTimes(data.data.timings);
                } else {
                    setError('Failed to fetch prayer times.');
                }
            } catch (err) {
                setError('Error fetching prayer times.');
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, [selectedCity]);

    // Helper function to format time into a human-readable format
    const formatTime = (time) => {
        const date = new Date(`1970-01-01T${time}:00`);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // Ensure we don’t try to format undefined prayer times
    const relevantPrayers = prayerTimes ? {
        Fajr: prayerTimes.Fajr ? formatTime(prayerTimes.Fajr) : null,
        Sunrise: prayerTimes.Sunrise ? formatTime(prayerTimes.Sunrise) : null,
        Dhuhr: prayerTimes.Dhuhr ? formatTime(prayerTimes.Dhuhr) : null,
        Asr: prayerTimes.Asr ? formatTime(prayerTimes.Asr) : null,
        Maghrib: prayerTimes.Maghrib ? formatTime(prayerTimes.Maghrib) : null,
        Isha: prayerTimes.Isha ? formatTime(prayerTimes.Isha) : null,
    } : {};

    const todayDate = new Date().toLocaleDateString("en-GB", {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    });

    const currentTime = new Date();
    const currentTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Function to convert time to minutes for comparison
    const convertToMinutes = (time) => {
        if (!time) return 0; // Add a check if the time is undefined or null
        const [hours, minutes] = time.split(':').map(num => parseInt(num));
        return hours * 60 + minutes;
    };

    // Function to calculate remaining time until the next prayer (e.g., Dhuhr)
    const getTimeDifference = (prayerTime) => {
        if (!prayerTime) return 0; // If there's no valid prayer time, return 0
        const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const prayerTimeInMinutes = convertToMinutes(prayerTime);

        let diff = prayerTimeInMinutes - currentTimeInMinutes;

        // If the prayer time has already passed today, calculate for the next day
        if (diff < 0) {
            diff += 1440; // Add 1440 minutes (1 full day) to make the next prayer time happen
        }

        return diff;
    };

    // Function to calculate remaining time in hours, minutes, and seconds
    const formatRemainingTime = (remainingMinutes) => {
        const hours = Math.floor(remainingMinutes / 60);
        const minutes = remainingMinutes % 60;
        const seconds = Math.floor((remainingMinutes - Math.floor(remainingMinutes)) * 60); // Convert fraction of minute into seconds

        return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`;
    };

    // Get the remaining time for Dhuhr prayer
    const dhuhrRemainingTime = getTimeDifference(prayerTimes?.Dhuhr);
    const formattedDhuhrRemainingTime = formatRemainingTime(dhuhrRemainingTime);

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

    return (
        <Box sx={{ flexGrow: 1, padding: 3, marginTop: 8, backgroundColor: 'background.paper' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link color="inherit" to="/mosque" underline="hover">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">{t('sections.prayerTimes.title')}</Typography>
            </Breadcrumbs>

            <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>
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
                                    height: '100%',  // Ensure it takes the full height
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
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add text shadow for better contrast
                                        }}
                                    >
                                        Next Prayer: Dhuhr
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        color="primary"
                                        sx={{
                                            fontWeight: 'bold',
                                            zIndex: 1,
                                            color: 'white',
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                        }}
                                    >
                                        {prayerTimes?.Dhuhr}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '1.2rem',
                                            zIndex: 1,
                                            color: 'white',
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                        }}
                                    >
                                        {formattedDhuhrRemainingTime} Left
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Display prayer times */}
                        {Object.keys(relevantPrayers).map((prayer, index) => (
                            <Grid item xs={12} sm={6} md={2} key={index}>
                                <PrayerTimeCard
                                    prayer={prayer}
                                    time={relevantPrayers[prayer]}
                                    highlight={prayer === 'Dhuhr'}
                                    t={t}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PrayerTimes;
