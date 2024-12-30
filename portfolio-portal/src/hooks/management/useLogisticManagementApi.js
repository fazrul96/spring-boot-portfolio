import {useCallback, useMemo, useState} from 'react';
import ApiService from './../../services/ApiService';
import {API_BASE_URL, API_PRIVATE_URL, MOSQUE_INVENTORIES} from '../../constants/ApiConstants';

const useLogisticManagementApi = (getAccessTokenSilently) => {
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.fetchResource(MOSQUE_INVENTORIES);
            setUsersData(response);
        } catch (error) {
            setError('Failed to load users data');
            console.error('Error fetching users data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    const addUser = async (newUser) => {
        try {
            await apiService.createResource(MOSQUE_INVENTORIES, newUser);
            setUsersData((prevData) => [...prevData, newUser]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const editUser = async (id, newUser) => {
        try {
            await apiService.patchResource(`mosque-inventories/${id}`, newUser);
            setUsersData((prevData) => [...prevData, newUser]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await apiService.deleteResourceMosque(`mosque-inventories/${id}`);
            setUsersData((prevData) => prevData.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return {
        usersData,
        loading,
        error,
        fetchUsers,
        addUser,
        deleteUser,
        editUser
    };
};

export default useLogisticManagementApi;