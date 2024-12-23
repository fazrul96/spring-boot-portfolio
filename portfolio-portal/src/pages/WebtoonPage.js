import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Box,
    debounce,
    Fab,
    Grid,
    IconButton,
    ListItem,
    ListItemText,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
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

    useEffect(() => {
        fetchWebtoons();
    }, [fetchWebtoons]);

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
        showSnackbar('Webtoon deleted successfully', 'error')
    };

    const handleAddWebtoon = (newWebtoon) => {
        addWebtoon(newWebtoon);
        showSnackbar('Webtoon added successfully', 'success')
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const { showAddWebtoonForm } = WebtoonForm(handleAddWebtoon);
    const handleSearchChange = debounce((query) => setSearchQuery(query), 300);

    const filteredWebtoons = webtoonsData.filter((webtoon) => {
        return webtoon.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }} mt={9}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    label="Search Webtoons"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleSearchChange(e.target.value)}
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

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : viewMode === 'card' ? (
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
                                    <IconButton edge="end" color="error" onDelete={() => handleDeleteWebtoon(webtoon.title)}>
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
            )}

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => showAddWebtoonForm()}
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <Tooltip title="Add New Webtoon">
                    <AddIcon />
                </Tooltip>
            </Fab>

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
        </Box>
    );
};

export default WebtoonPage;