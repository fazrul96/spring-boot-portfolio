import {useCallback, useMemo, useState} from 'react';
import ApiService from './../services/ApiService';
import {API_BASE_URL, API_PRIVATE_URL, WEBTOONS} from '../constants/ApiConstants';

const useWebtoonApi = (getAccessTokenSilently) => {
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );
    const [webtoonsData, setWebtoonsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWebtoons = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.fetchResource(WEBTOONS);
            setWebtoonsData(response);
        } catch (error) {
            setError('Failed to load webtoon data');
            console.error('Error fetching webtoon data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    const addWebtoon = async (newWebtoon) => {
        try {
            await apiService.createResource('webtoons', newWebtoon);
            setWebtoonsData((prevData) => [...prevData, newWebtoon]);
        } catch (error) {
            console.error('Error adding webtoon:', error);
        }
    };

    const deleteWebtoon = async (webtoonTitle) => {
        try {
            await apiService.deleteResource(`webtoons/${webtoonTitle}`);
            setWebtoonsData((prevData) => prevData.filter((webtoon) => webtoon.title !== webtoonTitle));
        } catch (error) {
            console.error('Error deleting webtoon:', error);
        }
    };

    return {
        webtoonsData,
        loading,
        error,
        fetchWebtoons,
        addWebtoon,
        deleteWebtoon,
    };
};

export default useWebtoonApi;