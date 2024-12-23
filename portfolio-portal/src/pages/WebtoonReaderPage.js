import React, {useEffect, useState} from 'react';
import {Box, Breadcrumbs, Button, CircularProgress, Grid, IconButton, TextField, Typography} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {ROUTE_BLOG, ROUTE_SERIES} from '../constants/AppRoutes';
import {PLACEHOLDER_CHAPTER, PLACEHOLDER_TITLE} from '../constants/ImageConstants';
import {API_BASE_URL, API_PRIVATE_URL} from '../constants/ApiConstants';

import {formatImages, toProperCase} from '../utils/stringUtils';
import {useWebtoonImages} from '../hooks/useWebtoonImages';
import {ArrowBack, ArrowForward} from '@mui/icons-material';

const WebtoonReaderPage = () => {
    const { title, chapter } = useParams();
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    const [jumpChapter, setJumpChapter] = useState('');
    const currentChapterNumber = parseInt(chapter?.split('-')[1] || '1', 10);

    const { images, error, isLoading } = useWebtoonImages(
        `${API_BASE_URL}${API_PRIVATE_URL}`,
        title,
        chapter,
        getAccessTokenSilently
    );

    const formattedTitle = toProperCase(title || PLACEHOLDER_TITLE);
    const formattedChapter = toProperCase(chapter || PLACEHOLDER_CHAPTER);
    const formattedImages = formatImages(images);

    const generateChapterString = (chapterNumber) => `chapter-${chapterNumber}`;

    // Scroll to top when navigating chapters
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextChapter = () => {
        const nextChapter = generateChapterString(currentChapterNumber + 1);
        navigate(`${ROUTE_SERIES}/${title}/${nextChapter}`);
        scrollToTop();
    };

    const handlePreviousChapter = () => {
        const previousChapter = generateChapterString(currentChapterNumber - 1);
        navigate(`${ROUTE_SERIES}/${title}/${previousChapter}`);
        scrollToTop();
    };

    const handleJumpToChapter = () => {
        const targetChapterNumber = parseInt(jumpChapter, 10);
        if (!isNaN(targetChapterNumber) && targetChapterNumber > 0) {
            const targetChapter = generateChapterString(targetChapterNumber);
            navigate(`${ROUTE_SERIES}/${title}/${targetChapter}`);
            scrollToTop();
        } else {
            alert('Please enter a valid chapter number.');
        }
    };

    // Keyboard navigation for left and right arrows
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' && currentChapterNumber > 1) {
                handlePreviousChapter();
            }
            if (e.key === 'ArrowRight') {
                handleNextChapter();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentChapterNumber]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, px: 2 }}>
            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh', // Center spinner in the viewport
                        width: '100%',
                    }}
                >
                    <CircularProgress size={60} thickness={5} />
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Typography color="error">Error loading images. Please try again.</Typography>
                </Box>
            ) : (
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            left: '16px',
                            transform: 'translateY(-50%)',
                            zIndex: 1000,
                        }}
                    >
                        <IconButton
                            onClick={handlePreviousChapter}
                            disabled={currentChapterNumber <= 1}
                            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: 2 }}
                        >
                            <ArrowBack fontSize="large" />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            right: '16px',
                            transform: 'translateY(-50%)',
                            zIndex: 1000,
                        }}
                    >
                        <IconButton
                            onClick={handleNextChapter}
                            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: 2 }}
                        >
                            <ArrowForward fontSize="large" />
                        </IconButton>
                    </Box>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                        <Link color="inherit" to={ROUTE_BLOG}>
                            Series
                        </Link>
                        <Link color="inherit" to={`${ROUTE_SERIES}/${title}/chapters`}>
                            {formattedTitle}
                        </Link>
                        <Typography color="text.primary">{formattedChapter}</Typography>
                    </Breadcrumbs>
                    {formattedImages.length > 0 ? (
                        formattedImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Chapter Image ${index + 1}`}
                                style={{ maxWidth: '100%', marginBottom: '16px', borderRadius: '8px' }}
                            />
                        ))
                    ) : (
                        <Typography color="text.secondary">No images available.</Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
                        <IconButton onClick={handlePreviousChapter} disabled={currentChapterNumber <= 1}>
                            <ArrowBack fontSize="large" />
                        </IconButton>
                        <Typography variant="h6">Chapter {currentChapterNumber}</Typography>
                        <IconButton onClick={handleNextChapter}>
                            <ArrowForward fontSize="large" />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, marginBottom: 10 }}>
                        <TextField
                            label="Jump to Chapter"
                            variant="outlined"
                            size="small"
                            value={jumpChapter}
                            onChange={(e) => setJumpChapter(e.target.value)}
                        />
                        <Button variant="contained" color="secondary" onClick={handleJumpToChapter}>
                            Go
                        </Button>
                    </Box>
                </Grid>
            )}
        </Box>
    );
};

export default WebtoonReaderPage;