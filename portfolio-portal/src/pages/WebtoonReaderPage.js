import React, { useEffect, useState, useMemo } from 'react';
import { Breadcrumbs, Box, Typography, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ROUTE_BLOG, ROUTE_SERIES } from './../constants/AppRoutes';
import { PLACEHOLDER_TITLE, PLACEHOLDER_CHAPTER, IMAGE_SOURCES, getImageExtension } from './../constants/ImageConstants';
import { API_BASE_URL, API_PRIVATE_URL } from './../constants/ApiConstants';

import { fetchImages } from './../services/ImageService';
import { toProperCase } from './../utils/stringUtils'
;
import ApiService from './../services/ApiService';
import JSZip from 'jszip';

const WebtoonReaderPage = () => {
	const source = 'asura';
    const { title, chapter } = useParams();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imageExtension = getImageExtension(source);
                // Step 1: Trigger the download and extraction process
                // await apiService.fetchResource(PROCESS_ZIP);
                // Step 2: Fetch images dynamically for the specific chapter
                // const imagesList = await fetchImages(title, chapter, apiService, imageExtension);

                // Construct filename from title and chapter, or use a specific format
                // const filename = `${title}_${chapter}.zip`;
//                const filename = 'nano-machine-chapter-1.zip'

				// Step 1: Retrieve zip file and extraction process
//                const response = await apiService.fetchResource(PROCESS_ZIP, {
//                    method: 'GET',
//                    responseType: 'blob'
//                });

                // Step 2: Extract the zip file
//                const zip = await JSZip.loadAsync(response);
                const imageFiles = [];

                // Step 3: Loop through the files in the zip and process only image files
//                for (const filename of Object.keys(zip.files)) {
//                    const file = zip.files[filename];
//                    if (!file.dir && /\.(png|jpg|jpeg|webp)$/i.test(filename)) {
//                        const blob = await file.async("blob");
//                        const imageUrl = URL.createObjectURL(blob);
//                        imageFiles.push(imageUrl);
//                    }
//                }
//                setImages(imageFiles);

			    const response = await apiService.fetchResource(
                    `downloadAndExtractImages?title=${encodeURIComponent(title)}&chapter=${encodeURIComponent(chapter)}`
	            );

                if (response && response.data) {
                    setImages(response.data);
                } else {
                    console.error("No images found for this chapter.");
                }
            } catch (error) {
                console.error("Error loading images:", error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
        return () => {
            if (images) URL.revokeObjectURL(images);
        };
    }, [title, chapter, apiService]);

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
				    {images.length > 0 ? (
                        images.map((image, index) => (
                            <img key={index} src={image} alt={`Chapter Image ${index + 1}`} style={{ maxWidth: '100%', marginBottom: '16px' }} />
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