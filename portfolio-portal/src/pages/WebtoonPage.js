import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Fab,
    Grid,
    IconButton,
    ListItem,
    ListItemText,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    CircularProgress,
    Typography,
    Skeleton,
    InputAdornment,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import WebtoonCard from '../components/section/webtoons/WebtoonCard';
import useWebtoonApi from './../hooks/useWebtoonApi';
import SnackbarComponent from './../components/common/SnackbarComponent';
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import WebtoonForm from "../components/form/WebtoonForm";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const WebtoonPage = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { webtoonsData, loading, error, fetchWebtoons, addWebtoon, deleteWebtoon } = useWebtoonApi(getAccessTokenSilently);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('card');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        fetchWebtoons();
    }, [fetchWebtoons]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            setSearching(false);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCardClick = (webtoonTitle) => {
        navigate(`/series/${webtoonTitle}/chapters`);
    };

    const handleDeleteWebtoon = (webtoonTitle) => {
        deleteWebtoon(webtoonTitle);
        showSnackbar('Webtoon deleted successfully', 'error');
    };

    const handleAddWebtoon = (newWebtoon) => {
        addWebtoon(newWebtoon);
        showSnackbar('Webtoon added successfully', 'success');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const { showAddWebtoonForm } = WebtoonForm(handleAddWebtoon);

    // Debounced search handler
    const handleSearchChange = (query) => {
        setSearching(true);
        setSearchQuery(query);
    };

    // Memoized filtered list based on the debounced search query
    const filteredWebtoons = useMemo(() => {
        return webtoonsData.filter((webtoon) => {
            return webtoon.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        });
    }, [webtoonsData, debouncedSearchQuery]);

    // UI and UX improvements for empty search results
    const renderWebtoonList = () => {
        if (filteredWebtoons.length === 0) {
            return (
                <Box sx={{ textAlign: 'center', padding: 2 }}>
                    <Typography variant="h6">No Webtoons Found</Typography>
                    <Typography variant="body2">Try adjusting your search criteria.</Typography>
                </Box>
            );
        }

        return viewMode === 'card' ? (
            <Grid container spacing={2}>
                {filteredWebtoons.map((webtoon, index) => (
                    <Grid item xs={12} sm={12} md={4} lg={2} key={index}>
                        <WebtoonCard
                            webtoon={webtoon}
                            onClick={() => handleCardClick(webtoon.title)}
                            onDelete={() => handleDeleteWebtoon(webtoon.title)}
                        />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Grid container spacing={2}>
                {filteredWebtoons.map((webtoon, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => handleCardClick(webtoon.title)}
                        secondaryAction={
                            <Tooltip title="Delete">
                                <IconButton edge="end" color="error" onClick={() => handleDeleteWebtoon(webtoon.title)}>
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    >
                        <ListItemText
                            primary={webtoon.alias}
                            secondary={`Genre: ${webtoon.genre} | Rating: ${webtoon.rating}`}
                        />
                    </ListItem>
                ))}
            </Grid>
        );
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }} mt={9}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    label="Search Webtoons"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchQuery && (
                                    <IconButton
                                        onClick={() => setSearchQuery('')}
                                        edge="end"
                                    >
                                        <DeleteForeverOutlinedIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, mode) => mode && setViewMode(mode)}
                    aria-label="view mode"
                >
                    <ToggleButton value="card" aria-label="card view">
                        <ViewModuleIcon />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                        <ViewListIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Loading state with skeleton loader */}
            {loading ? (
                <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <CircularProgress />
                    <Typography variant="body2">Loading Webtoons...</Typography>
                    <Skeleton variant="rectangular" height={200} />
                </Box>
            ) : error ? (
                <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : (
                renderWebtoonList()
            )}

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => showAddWebtoonForm()}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: 6,
                    },
                }}
            >
                <Tooltip title="Add New Webtoon">
                    <AddIcon />
                </Tooltip>
            </Fab>

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
            />
        </Box>
    );
};

export default WebtoonPage;
