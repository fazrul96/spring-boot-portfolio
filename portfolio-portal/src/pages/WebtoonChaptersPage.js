import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Rating,
    Divider,
    Paper,
    Breadcrumbs,
    Grid,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SYNC_WEBTOON_URL, DEFAULT_IMAGE } from './../constants/AppConstants';
import { DOWNLOAD_WEBTOON, WEBTOONS } from './../constants/ApiConstants';
import ApiService from './../services/ApiService';
import { useAuth0 } from '@auth0/auth0-react';

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

// Webtoon Header Component
const WebtoonHeader = ({ webtoon }) => (
    <Box
        sx={{
            height: 300,
            width: '100%',
            backgroundImage: `url(${webtoon?.bannerImage || webtoon?.coverImage})`,
            backgroundSize: 'cover',
            borderRadius: 2,
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Typography
            variant="h4"
            sx={{
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                textAlign: 'center',
            }}
        >
            {webtoon?.alias || 'Webtoon Title'}
        </Typography>
    </Box>
);

// Webtoon Card Component
const WebtoonCard = ({ webtoon }) => (
    <Card sx={{ display: 'flex', mb: 4, borderRadius: 2, boxShadow: 3, width: '100%', maxWidth: 600 }}>
        <CardMedia
            component="img"
            sx={{ width: 180 }}
            image={webtoon?.coverImage || DEFAULT_IMAGE}
            alt={`${webtoon?.alias} Cover`}
        />
        <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" component="div">
                {webtoon?.alias || 'Webtoon Title'}
            </Typography>
            <Rating value={webtoon?.rating || 0} readOnly precision={0.5} sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
                {webtoon?.description || 'Description of the webtoon will go here.'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">Genre: {webtoon?.genre}</Typography>
            <Typography variant="body2" color="text.secondary">Author: {webtoon?.author}</Typography>
            <Typography variant="body2" color="text.secondary">Artist: {webtoon?.artist}</Typography>
            <Typography variant="body2" color="text.secondary">Status: {webtoon?.status}</Typography>
            <Typography variant="body2" color="text.secondary">Type: {webtoon?.type}</Typography>
            <Typography variant="body2" color="text.secondary">Last Updated: {webtoon?.lastUpdated}</Typography>
        </CardContent>
    </Card>
);

// Chapter List Component
const ChapterList = ({ chapters, handleSync, isFetching, isSyncing, syncingChapter, navigate, title }) => (
    <List>
        {chapters.map((chapter) => (
            <ListItem key={chapter.number} disablePadding sx={{ mb: 1 }} secondaryAction={
                <Button
                    variant="contained"
                    onClick={() => handleSync(chapter)}
                    disabled={isFetching || syncingChapter === chapter}
                    sx={{ bgcolor: 'info.main' }}
                >
                    {syncingChapter === chapter ? "Processing..." : "Sync"}
                </Button>
            }>
                <ListItemButton onClick={() => navigate(`/series/${title}/chapter-${chapter}`)}>
                    <img src={DEFAULT_IMAGE} // todo fix get first image of the chapter to display
                        style={{ width: '75px', height: '75px', objectFit: 'cover', marginRight: '8px' }} />
                    <Typography variant="body1">Chapter {chapter}</Typography>
                </ListItemButton>
            </ListItem>
        ))}
    </List>
);

// Main Component
const WebtoonChaptersPage = () => {
    const navigate = useNavigate();
    const { title } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [webtoon, setWebtoon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [syncingChapter, setSyncingChapter] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);

    const apiService = useMemo(
        () => new ApiService(SYNC_WEBTOON_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    const { syncWebtoon, error: syncError } = useWebtoonSync(apiService);

    useEffect(() => {
        const fetchWebtoonData = async () => {
            setIsLoading(true);
            try {
                const response = await apiService.fetchResource(`${WEBTOONS}/${title}`);
                setWebtoon(response);
            } catch (error) {
                console.error("Error fetching webtoon data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWebtoonData();
    }, [apiService, title]);

    const handleSync = async (chapter) => {
        setSyncingChapter(chapter);
        setIsSyncing(true);

        const success = await syncWebtoon(webtoon.title, chapter, webtoon.source, webtoon.suffix);
        if (success) {
            setWebtoon({ ...webtoon }); // Refresh the webtoon data if needed
        }

        setSyncingChapter(null);
        setIsSyncing(false);
    };

    if (isLoading) return <CircularProgress />;

    const totalChapter = webtoon?.chapterCount || 0;

    // Create an array of chapters from 1 to totalChapter
    const chapters = Array.from({ length: totalChapter }, (_, i) => totalChapter - i);

    const firstChapter = chapters[0];
    const latestChapter = chapters[chapters.length - 1];
    return (
        <Box sx={{ flexGrow: 1, padding: 5 }}>
            <Grid mt={5}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <Link color="inherit" to="/blog">
                        Series
                    </Link>
                    <Typography color="text.primary">{webtoon?.alias || 'Webtoon Title'}</Typography>
                </Breadcrumbs>

                <WebtoonHeader webtoon={webtoon} />
                <WebtoonCard webtoon={webtoon} />

                <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/series/${title}/chapter-${firstChapter}`)}
                            sx={{ bgcolor: 'primary.main', flex: 1, mr: 1 }}
                        >
                            First Chapter {firstChapter}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/series/${title}/chapter-${latestChapter}`)}
                            sx={{ bgcolor: 'secondary.main', flex: 1, ml: 1 }}
                        >
                            New Chapter {latestChapter}
                        </Button>
                    </Box>
                    {syncError && <Typography color="error">{syncError}</Typography>}
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Chapters</Typography>
                    <ChapterList
                        chapters={chapters}
                        handleSync={(chapter) => handleSync(chapter, webtoon.source)}
                        isFetching={false}
                        isSyncing={isSyncing}
                        syncingChapter={syncingChapter}
                        navigate={navigate}
                        title={title}
                    />
                </Paper>
            </Grid>
        </Box>
    );
};

export default WebtoonChaptersPage;
