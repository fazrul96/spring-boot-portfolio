import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Box,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Rating,
    Divider,
    Paper,
    Breadcrumbs,
    Grid,
    Stack, Chip, Badge, Tooltip
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@mui/material/IconButton';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SYNC_WEBTOON_URL, DEFAULT_IMAGE } from './../constants/AppConstants';
import { DOWNLOAD_WEBTOON, WEBTOONS, WEBTOON_SYNC } from './../constants/ApiConstants';
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
	<Card sx={{ display: 'flex', mb: 4, borderRadius: 2, boxShadow: 3, width: '100%' }}>
        <CardMedia
            component="img"
            sx={{
                height: 300,
                width: '100%',
                backgroundImage: `url(${webtoon?.bannerImage || webtoon?.coverImage})`,
            }}
        />
    </Card>
);

// Chapter List Component
const ChapterList = ({
    chapters,
    availableChapters = [],
    handleSync,
    isFetching,
    syncingChapter,
    navigate,
    title,
}) => {
	const [showAll, setShowAll] = useState(false);
    const isAvailable = (chapter) => {
        // Ensure availableChapters is an array and check if the chapter status is "COMPLETED"
        return Array.isArray(availableChapters) && availableChapters.some((available) => available.chapter === chapter && available.status === "COMPLETED");
    };
    const visibleChapters = showAll ? chapters : chapters.slice(0, 12);
    return (
        <Grid container spacing={2}>
            {visibleChapters.map((chapter) => {
                const isChapterAvailable = isAvailable(chapter);
                return (
                    <Grid item xs={12} sm={6} md={6} lg={2} key={chapter}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    onClick={() => navigate(`/series/${title}/chapter-${chapter}`)}
                                >
                                    Chapter {chapter}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ marginLeft: 2, alignItems: 'center' }}>
                                    <Tooltip title={isChapterAvailable ? 'Available' : 'Not Available'}>
                                        <Chip
                                            size="small"
                                            sx={{
                                                marginLeft: 1,
                                                backgroundColor: isChapterAvailable ? 'green' : 'gray',
                                                borderRadius: '50%',
                                                width: 16,
                                                height: 16,
                                                padding: 0,
                                            }}
                                        />
                                    </Tooltip>
                                    {!isChapterAvailable && (
                                        <Tooltip title="Syncing">
                                            <IconButton>
                                                <Badge
                                                    color="primary"
                                                    onClick={() => handleSync(chapter)}
                                                    disabled={isFetching || syncingChapter === chapter}
                                                    sx={{
                                                        borderColor: 'info.main',
                                                        color: syncingChapter === chapter ? 'orange' : 'info.main',
                                                    }}
                                                >
                                                    <SyncIcon
                                                        sx={{
                                                            animation:
                                                                syncingChapter === chapter
                                                                    ? 'spin 1s linear infinite'
                                                                    : 'none',
                                                            '@keyframes spin': {
                                                                from: { transform: 'rotate(0deg)' },
                                                                to: { transform: 'rotate(360deg)' },
                                                            },
                                                        }}
                                                    />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </Typography>
                        </Card>
                    </Grid>
                );
            })}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setShowAll(!showAll)}
                    sx={{ mt: 2 }}
                >
                    {showAll ? 'Show Less' : `Show All (${chapters.length - 10} more)`}
                </Button>
            </Grid>
        </Grid>
    );
};

// Main Component
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

    const apiService = useMemo(
        () => new ApiService(SYNC_WEBTOON_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    const { syncWebtoon, error: syncError } = useWebtoonSync(apiService);

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

        const success = await syncWebtoon(webtoon.title, chapter, webtoon.source, webtoon.suffix);
        if (success) {
            setWebtoon({ ...webtoon }); // Refresh the webtoon data if needed
        }

        setSyncingChapter(null);
        setIsSyncing(false);
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
                        <Link color="inherit" to="/blog">
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Genre:</strong>
                                            </Typography>
                                            {webtoon?.genre ? (
                                                webtoon.genre.split(/\s*,\s*/).map((genre, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={genre}
                                                        size="small"
                                                        sx={{ marginRight: 1, marginBottom: 1 }}
                                                    />
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Genre:</strong> -
                                                </Typography>
                                            )}
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Author:</strong>
                                            </Typography>
                                            {webtoon?.author ? (
                                                webtoon.author.split(/\s*\/\s*/).map((author, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={author}
                                                        size="small"
                                                        sx={{ marginRight: 1, marginBottom: 1 }}
                                                    />
                                                ))
                                            ) : (
	                                            <Typography variant="body2" color="text.secondary">
	                                                <strong>Author:</strong> {webtoon?.author || '-'}
	                                            </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Artist:</strong>
                                            </Typography>
                                            {webtoon?.artist ? (
                                                webtoon.artist.split(/\s*\/\s*/).map((artist, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={artist}
                                                        size="small"
                                                        sx={{ marginRight: 1, marginBottom: 1 }}
                                                    />
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Artist:</strong> {webtoon?.artist || '-'}
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Status:</strong> {webtoon?.status || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Type:</strong> {webtoon?.type || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Last Updated:</strong> {webtoon?.updatedDate || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
	                        </CardContent>
                        </Box>
                        <CardActions>
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
                    <Paper elevation={5} sx={{ padding: 2}}>
                        {syncError && <Typography color="error">{syncError}</Typography>}

                        <ChapterList
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
        </Box>
    );
};

export default WebtoonChaptersPage;
