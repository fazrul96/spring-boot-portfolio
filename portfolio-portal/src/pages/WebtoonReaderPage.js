import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Box, Typography, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { ROUTE_BLOG, ROUTE_SERIES } from './../constants/AppRoutes';
import { IMAGE_BASE_PATH, IMAGE_EXTENSION, PLACEHOLDER_TITLE, PLACEHOLDER_CHAPTER } from './../constants/ImageConstants';
import { toProperCase } from './../utils/stringUtils';

const WebtoonReaderPage = () => {
    const { title, chapter } = useParams();
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            const imagesList = [];
            let counter = 1;
            let imageExists = true;

            while (imageExists) {
                const formatChapter = `${title}-${chapter}/`;
                const formatFilename = `${title}-${chapter}-${counter}${IMAGE_EXTENSION}`;
                const imagePath = `${IMAGE_BASE_PATH}${formatChapter}${formatFilename}`;

                try {
                    await checkImageExists(imagePath);
                    imagesList.push(imagePath);
                    counter++;
                } catch {
                    imageExists = false;
                }
            }

            setImages(imagesList);
            setIsLoading(false);
        };

        loadImages();
    }, [title, chapter]);

    const formattedTitle = toProperCase(title || PLACEHOLDER_TITLE);
    const formattedChapter = toProperCase(chapter || PLACEHOLDER_CHAPTER);

    return (
        <Box sx={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                        <Link color="inherit" to={ROUTE_BLOG}>Series</Link>
                        <Link color="inherit" to={`${ROUTE_SERIES}/${title}/chapters`}>{formattedTitle}</Link>
                        <Typography color="text.primary">{formattedChapter}</Typography>
                    </Breadcrumbs>
                    {images.map((image, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <img src={image} alt={`Page ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

const checkImageExists = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
    });
};

export default WebtoonReaderPage;