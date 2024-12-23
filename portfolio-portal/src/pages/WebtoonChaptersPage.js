import React, {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {
    Alert,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Rating,
    Snackbar,
    Typography
} from '@mui/material';
import {SYNC_WEBTOON_URL} from '../constants/AppConstants';
import {DOWNLOAD_WEBTOON, LATEST_CHAPTER_WEBTOON, WEBTOON_SYNC, WEBTOONS} from '../constants/ApiConstants';
import ApiService from './../services/ApiService';
import {useAuth0} from '@auth0/auth0-react';
import WebtoonHeader from "../components/section/webtoons/WebtoonHeader";
import WebtoonDetails from "./../components/section/webtoons/WebtoonDetails";
import WebtoonChapterList from "../components/section/webtoons/WebtoonChapterList";

// Sync Webtoon Hook
const useWebtoonSync = (apiService) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const syncWebtoon = async (title, chapter, source, suffix) => {
        setIsLoading(true);
        try {
            const response = await apiService.createResource(DOWNLOAD_WEBTOON, { title, chapter, source, suffix }, true);
            console.log('Sync Success:', response);
            return true;
        } catch (err) {
            setError("Failed to sync webtoon");
            console.error("Error syncing webtoon:", err.response?.data || err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { syncWebtoon, isLoading, error };
};

const WebtoonChaptersPage = () => {
    const navigate = useNavigate();
    const { title } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [webtoon, setWebtoon] = useState(null);
    const [webtoonChapters, setChapters] = useState(null);
    const [availableChapters, setAvailableChapters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [syncingChapter, setSyncingChapter] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    const apiService = useMemo(
        () => new ApiService(SYNC_WEBTOON_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    const { syncWebtoon, error: syncError, isLoading: isSyncLoading } = useWebtoonSync(apiService);

    useEffect(() => {
        const fetchWebtoonData = async () => {
            setIsLoading(true);
            try {
                const [webtoonResponse, chaptersResponse] = await Promise.all([
                    apiService.fetchResource(`${WEBTOONS}/${title}`),
                    apiService.fetchResource(`${WEBTOONS}/${title}/chapters`)
                ]);
                setWebtoon(webtoonResponse);
                setChapters(chaptersResponse);
                setAvailableChapters(chaptersResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWebtoonData();
    }, [apiService, title]);

    const handleSync = async (chapter) => {
        setSyncingChapter(chapter);
        setIsSyncing(true);
        setSnackbarMessage('Sync in progress... Please wait.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);

        try {
            const success = await syncWebtoon(webtoon.title, chapter, webtoon.source, webtoon.suffix);
            if (success) {
                setSnackbarMessage('Sync Successful!');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage('Sync Failed!');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('Sync Failed!');
            setSnackbarSeverity('error');
            console.error('Error syncing webtoon:', error);
        } finally {
            setSyncingChapter(null);
            setIsSyncing(false);
            setSnackbarOpen(true);
        }
    };

    const handleSyncChapter = async () => {
        setIsLoading(true);
        try {
            const response = await apiService.createResource(WEBTOON_SYNC, { title }, true);
            console.log('Sync all chapter successful:', response);
            return true;
        } catch (err) {
            console.error("Error syncing all chapter:", err.response?.data || err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchNewChapter = async () => {
        setIsLoading(true);
        try {
            const response = await apiService.patchResource(LATEST_CHAPTER_WEBTOON, { title }, true);
            console.log('Get new chapter chapter successful:', response);
            return true;
        } catch (err) {
            console.error("Error get new chapter:", err.response?.data || err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <CircularProgress />;

    const totalChapter = webtoon?.chapterCount || 0;

    // Create an array of chapters from 1 to totalChapter
    const chapters = Array.from({ length: totalChapter }, (_, i) => totalChapter - i);

    const firstChapter = chapters[0];
    const latestChapter = chapters[chapters.length - 1];

    return (
        <Box sx={{ flexGrow: 1, padding: 5 }}>
            <Grid container spacing={2} mt={3}>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to="/webtoon">
                            Series
                        </Link>
                        <Typography color="text.primary">{webtoon?.alias || 'Webtoon Title'}</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <WebtoonHeader webtoon={webtoon} />
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                            <CardContent sx={{ flex: 1, p: 2 }}>
                                <Typography variant="h5" component="div">
                                    {webtoon?.alias || 'Webtoon Title'}
                                </Typography>
                                <Rating value={webtoon?.rating || 0} readOnly precision={0.5} sx={{ mb: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {webtoon?.description || 'Description of the webtoon will go here.'}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ flexGrow: 1, mb: 2 }}>
                                    <WebtoonDetails webtoon={webtoon} />
                                </Box>
                            </CardContent>
                        </Box>
                        <CardActions>
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={handleFetchNewChapter}
                                sx={{ textTransform: 'none', px: 3 }}
                            >
                                Get New Chapter
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                onClick={handleSyncChapter}
                                sx={{ textTransform: 'none', px: 3 }}
                            >
                                Sync All Chapter
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => navigate(`/series/${title}/chapter-${latestChapter}`)}
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: 'success.main',
                                    '&:hover': { bgcolor: 'success.dark' },
                                    px: 3,
                                }}
                            >
                                First Chapter {latestChapter}
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => navigate(`/series/${title}/chapter-${firstChapter}`)}
                                sx={{ textTransform: 'none', px: 3 }}
                            >
                                New Chapter {firstChapter}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={5} sx={{ padding: 2 }}>
                        {syncError && <Typography color="error">{syncError}</Typography>}

                        <WebtoonChapterList
                            chapters={chapters}
                            availableChapters={webtoonChapters}
                            handleSync={(chapter) => handleSync(chapter, webtoon.source)}
                            isFetching={false}
                            isSyncing={isSyncing}
                            syncingChapter={syncingChapter}
                            navigate={navigate}
                            title={title}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbar for Sync Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default WebtoonChaptersPage;