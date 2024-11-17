import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import WebtoonCard from './../components/common/WebtoonCard';
import useWebtoonApi from './../hooks/useWebtoonApi';
import WebtoonForm from './../components/form/WebtoonForm';
import SnackbarComponent from './../components/common/SnackbarComponent';

const WebtoonPage = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { webtoonsData, loading, error, fetchWebtoons, addWebtoon, deleteWebtoon } = useWebtoonApi(getAccessTokenSilently);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchWebtoons();
    }, [fetchWebtoons]);

    const handleCardClick = (webtoonTitle) => {
        navigate(`/series/${webtoonTitle}/chapters`);
    };

    const handleDeleteWebtoon = (webtoonTitle) => {
        deleteWebtoon(webtoonTitle);
        setSnackbarMessage('Webtoon deleted successfully');
        setSnackbarOpen(true);
    };

    const handleAddWebtoon = (newWebtoon) => {
        addWebtoon(newWebtoon);
        setSnackbarMessage('Webtoon added successfully');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const { showAddWebtoonForm } = WebtoonForm(handleAddWebtoon);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }} mt={5}>
            <Button variant="contained" color="primary" onClick={showAddWebtoonForm}>
                Add New Webtoon
            </Button>
            <Grid container spacing={2} mt={1}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    webtoonsData.map((webtoon, index) => (
                        <Grid item xs={12} sm={12} md={4} lg={2} key={index}>
                            <WebtoonCard
                                webtoon={webtoon}
                                onClick={() => handleCardClick(webtoon.title)}
                                onDelete={() => handleDeleteWebtoon(webtoon.title)}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
        </Box>
    );
};

export default WebtoonPage;