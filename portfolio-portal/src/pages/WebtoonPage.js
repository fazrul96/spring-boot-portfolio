import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Snackbar } from '@mui/material';
import WebtoonCard from './../components/common/WebtoonCard';
import ApiService from './../services/ApiService';
import { useAuth0 } from '@auth0/auth0-react';
import { API_BASE_URL, API_PRIVATE_URL, WEBTOONS } from './../constants/ApiConstants';
import Swal from 'sweetalert2';

const WebtoonPage = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    const [webtoonsData, setWebtoonsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Create a memoized instance of ApiService with the Auth0 token function
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiService.fetchResource(WEBTOONS);
                setWebtoonsData(response);
            } catch (error) {
                setError('Failed to load webtoon data');
                console.error('Error fetching webtoon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiService]);

    const handleCardClick = (webtoonTitle) => {
        navigate(`/series/${webtoonTitle}/chapters`);
    };

    const handleDeleteWebtoon = async (webtoonTitle) => {
        try {
            await apiService.deleteResource(`webtoons/${webtoonTitle}`);
            setWebtoonsData((prevData) => prevData.filter((webtoon) => webtoon.title !== webtoonTitle));
            setSnackbarMessage('Webtoon deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to delete webtoon');
            setSnackbarOpen(true);
            console.error('Error deleting webtoon:', error);
        }
    };

    const handleAddWebtoon = async (newWebtoon) => {
    console.log(newWebtoon);
        try {
            await apiService.createResource('webtoons', newWebtoon);
            setWebtoonsData((prevData) => [...prevData, newWebtoon]); // Update state with the new webtoon
            setSnackbarMessage('Webtoon added successfully');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to add webtoon');
            setSnackbarOpen(true);
            console.error('Error adding webtoon:', error);
        }
    };

    const toProperCase = (text, delimiter = '-') => {
        return text
	        .split(delimiter)
	        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
	        .join(' ');
    };

    const showAddWebtoonForm = () => {
        Swal.fire({
            title: 'Add New Webtoon',
            html: `
                <input id="swal-input-title" class="swal2-input" placeholder="Webtoon Title">
                <input id="swal-input-description" class="swal2-input" placeholder="Description">
                <input id="swal-input-alias" class="swal2-input" placeholder="Alias" readonly>
                <input id="swal-input-genre" class="swal2-input" placeholder="Genre">
                <input id="swal-input-img" class="swal2-input" placeholder="Image URL">
                <input id="swal-input-chapter-count" class="swal2-input" type="number" placeholder="Chapter Count">
                <input id="swal-input-tag" class="swal2-input" placeholder="Tag">
                <input id="swal-input-source" class="swal2-input" placeholder="Source URL">
                <input id="swal-input-suffix" class="swal2-input" placeholder="Suffix">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input-title').value;
                const chapterCount = parseInt(document.getElementById('swal-input-chapter-count').value);
                const source = document.getElementById('swal-input-source').value;
                const suffix = document.getElementById('swal-input-suffix').value;

                if (!title || !chapterCount || !source || !suffix ) {
                    Swal.showValidationMessage('Please fill out all fields');
                }

                const alias = toProperCase(title);

                return { title, alias, chapterCount, source, suffix };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddWebtoon(result.value);
            }
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default WebtoonPage;
