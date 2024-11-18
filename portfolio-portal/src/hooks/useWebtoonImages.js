import { useState, useEffect, useMemo } from 'react';
import ApiService from './../services/ApiService';
import { extractChapterNumber } from './../utils/stringUtils';

export const useWebtoonImages = (baseApiUrl, title, chapter, getAccessTokenSilently) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const apiService = useMemo(
        () => new ApiService(baseApiUrl, getAccessTokenSilently),
        [baseApiUrl, getAccessTokenSilently]
    );

    useEffect(() => {
        const loadImages = async () => {
            try {
                const response = await apiService.fetchResourceWithParams(
                    `downloadAndExtract`,
                    {
                        title: encodeURIComponent(title),
                        chapter: encodeURIComponent(extractChapterNumber(chapter)),
                    }
                );

                if (response && response.length > 0) {
                    setImages(response);
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
    }, [title, chapter, apiService]);

    return { images, error, isLoading };
};
