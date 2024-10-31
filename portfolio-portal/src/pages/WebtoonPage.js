import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { SYNC_WEBTOON_URL, WEBTOONS_LIST, DEFAULT_IMAGE } from './../constants/AppConstants';
import ApiService from './../services/ApiService';
import { useAuth0 } from '@auth0/auth0-react';

const useWebtoonSync = (apiService) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const syncWebtoon = async (title, chapter, source) => {
		setIsLoading(true);
		try {
	        const response = await apiService.createResource('download-webtoon', {
		        title,
		        chapter,
		        source,
		    }, true);
	        console.log('Sync Success:', response);
	        return true; // Indicate success
		} catch (err) {
	        setError("Failed to sync webtoon");
		    console.error("Error syncing webtoon:", err.response?.data || err.message);
		    return false; // Indicate failure
		} finally {
	        setIsLoading(false);
		}
	};

	return { syncWebtoon, isLoading, error };
};

// Webtoon Fetch Function
const useWebtoonsFetch = (apiService) => {
	const [webtoons, setWebtoons] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchDownloadedWebtoons = async () => {
		setIsLoading(true);
		try {
	        const response = await apiService.fetchResource('downloaded-webtoons');
		    setWebtoons(response);
		} catch (err) {
		    setError("Failed to load webtoons");
		    console.error("Error fetching webtoons:", err);
		} finally {
		    setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchDownloadedWebtoons();
	}, [apiService]);

	return { webtoons, fetchDownloadedWebtoons, isLoading, error };
};

// Main Component
const WebtoonPage = () => {
	const { getAccessTokenSilently } = useAuth0();

	const apiService = useMemo(
		() => new ApiService(SYNC_WEBTOON_URL, getAccessTokenSilently),
		[getAccessTokenSilently]
	);

	const { webtoons, fetchDownloadedWebtoons, isLoading: isFetching, error: fetchError } = useWebtoonsFetch(apiService);
	const { syncWebtoon, isLoading: isSyncing, error: syncError } = useWebtoonSync(apiService);

	const handleSync = async (title, chapter, source) => {
		const success = await syncWebtoon(title, chapter, source);
		if (success) {
	        await fetchDownloadedWebtoons(); // Refresh the list after successful sync
		}
	};

	const handleRead = (title) => {
		// Add logic for reading the webtoon here
		// For example, redirect to a reading page or open a new tab
		console.log(`Reading ${title}`);
		// You could use something like: window.open(`/read/${title}`, '_blank');
	};

	// Combine hardcoded webtoons with fetched webtoons
	const combinedWebtoons = [...WEBTOONS_LIST, ...webtoons];

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
	        {(fetchError || syncError) && (
		        <Typography variant="body2" color="error">
		            {fetchError || syncError}
	            </Typography>
		    )}
		    <Grid container spacing={2} mt={2}>
			    {combinedWebtoons.map((webtoon, index) => (
			        <Grid item xs={12} sm={6} md={4} key={index}>
				        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			                <CardMedia
					            component="img"
					            sx={{ height: 150 }}
					            image={DEFAULT_IMAGE} // Use random image
					            alt={webtoon.title}
				            />
				            <CardContent sx={{ flexGrow: 1 }}>
					            <Typography variant="h6">{webtoon.title}</Typography>
					            <Typography variant="body2">Chapter: {webtoon.chapter}</Typography>
					            <Typography variant="body2">Source: {webtoon.source}</Typography>
				            </CardContent>
				            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
					            <Button
				                    variant="contained"
					                onClick={() => handleSync(webtoon.title, webtoon.chapter, webtoon.source)}
					                disabled={isFetching || isSyncing}
					            >
				                    {isFetching || isSyncing ? "Processing..." : "Sync"}
					            </Button>
					            <Button
					                variant="outlined"
					                onClick={() => handleRead(webtoon.title)}
					                disabled={isFetching || isSyncing}
					            >
				                    Read
					            </Button>
				            </Box>
				        </Card>
			        </Grid>
			    ))}
		    </Grid>
		</Box>
	);
};

export default WebtoonPage;
