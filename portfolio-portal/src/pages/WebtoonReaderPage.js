import React from 'react';
import {Box, Breadcrumbs, CircularProgress, Typography} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {ROUTE_BLOG, ROUTE_SERIES} from '../constants/AppRoutes';
import {PLACEHOLDER_CHAPTER, PLACEHOLDER_TITLE} from '../constants/ImageConstants';
import {API_BASE_URL, API_PRIVATE_URL} from '../constants/ApiConstants';

import {formatImages, toProperCase} from '../utils/stringUtils';
import {useWebtoonImages} from '../hooks/useWebtoonImages';

const WebtoonReaderPage = () => {
    const { title, chapter } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    const { images, error, isLoading } = useWebtoonImages(
        `${API_BASE_URL}${API_PRIVATE_URL}`,
        title,
        chapter,
        getAccessTokenSilently
    );

    const formattedTitle = toProperCase(title || PLACEHOLDER_TITLE);
    const formattedChapter = toProperCase(chapter || PLACEHOLDER_CHAPTER);
    const formattedImages = formatImages(images);

    return (
        <Box sx={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isLoading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">Error loading images. Please try again.</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
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
                                style={{ maxWidth: '100%', marginBottom: '16px' }}
                            />
                        ))
                    ) : (
                        <Typography color="text.secondary">No images available.</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default WebtoonReaderPage;
