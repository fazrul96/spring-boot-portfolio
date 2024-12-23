import React, { useEffect, useState } from 'react';
import {
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PrayerTimes = () => {
    const { t } = useTranslation();
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("Kuala Lumpur");

    const cities = ["Kuala Lumpur", "Johor Bahru", "Penang", "Kota Kinabalu", "Melaka", "Ipoh", "Shah Alam", "Kuching", "Seremban", "Alor Setar"]; // Full list of regions

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Malaysia&method=8`);
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
    }, [city]);

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

    // Convert prayer times to 12-hour format with AM/PM
    const formatTime = (time) => {
        const date = new Date(`1970-01-01T${time}:00`);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // Relevant prayer times to display in 12-hour format
    const relevantPrayers = {
        Fajr: formatTime(prayerTimes.Fajr),
        Sunrise: formatTime(prayerTimes.Sunrise),
        Dhuhr: formatTime(prayerTimes.Dhuhr),
        Asr: formatTime(prayerTimes.Asr),
        Maghrib: formatTime(prayerTimes.Maghrib),
        Isha: formatTime(prayerTimes.Isha),
    };

    // Get today's date in a clean format
    const todayDate = new Date().toLocaleDateString("en-GB", {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    });

    // Get the current time in 12-hour format with AM/PM
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });  // Format as "11:12 PM"

    return (
        <Box sx={{ flexGrow: 1, padding: 3, marginTop: 8, backgroundColor: 'background.paper' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link color="inherit" to="/mosque" underline="hover">{t('breadcrumb.mosque')}</Link>
                <Typography color="textPrimary">Prayer Times</Typography>
            </Breadcrumbs>

            <Card elevation={5} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Left Section (Title and City Selection) */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom align="left" fontWeight="bold" color="primary" sx={{ fontSize: '1.8rem' }}>
                                Prayer Times in {city}
                            </Typography>
                            <FormControl fullWidth margin="normal">
                                <InputLabel sx={{ color: 'primary.main' }}>City</InputLabel>
                                <Select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    label="City"
                                    sx={{ borderRadius: 3, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' } }}
                                >
                                    {cities.map((cityOption, index) => (
                                        <MenuItem key={index} value={cityOption}>{cityOption}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Right Section (Date, Time, Location) */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'right', paddingRight: 3 }}>
                                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                    {todayDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                                    {currentTime}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ marginBottom: 3, marginTop: 3 }} />

                    {/* Prayer Time Cards */}
                    <Grid container spacing={2} justifyContent="center">
                        {Object.keys(relevantPrayers).map((prayer, index) => (
                            <Grid item xs={12} sm={6} md={2} key={index}>
                                <Card elevation={3} sx={{ borderRadius: 2, padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                                    <CardContent align="center">
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {prayer}
                                        </Typography>
                                        <Typography variant="h7" color="primary">
                                            {relevantPrayers[prayer]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PrayerTimes;
