import {useCallback, useMemo, useState} from 'react';
import ApiService from './../../services/ApiService';
import {ACCOUNT_MESSAGES, API_BASE_URL, API_PRIVATE_URL, MOSQUE_USERS} from '../../constants/ApiConstants';

const useUserManagementApi = (getAccessTokenSilently) => {
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
            const response = await apiService.fetchResource(MOSQUE_USERS);
            setUsersData(response);
        } catch (error) {
            setError(error.message || 'Failed to load users data');
            console.error('Error fetching users data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.fetchResource(ACCOUNT_MESSAGES);
            setUsersData(response);
        } catch (error) {
            setError('Failed to load users data');
            console.error('Error fetching users data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    const addUser = async (newUser) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.createResource(MOSQUE_USERS, newUser);
            setUsersData((prevData) => [...prevData, newUser]);
        } catch (error) {
            setError(error.message || 'Error adding user');
            console.error('Error adding user:', error);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, newUser) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.patchResource(`${MOSQUE_USERS}/${id}`, newUser);
            setUsersData((prevData) =>
                prevData.map((user) => (user.id === id ? { ...user, ...newUser } : user))
            );
        } catch (error) {
            setError(error.message || 'Error editing user');
            console.error('Error editing user:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.deleteResourceMosque(`${MOSQUE_USERS}/${id}`);
            setUsersData((prevData) => prevData.filter((user) => user.id !== id));
        } catch (error) {
            setError(error.message || 'Error deleting user');
            console.error('Error deleting user:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        usersData,
        loading,
        error,
        fetchUsers,
        addUser,
        deleteUser,
        editUser,
        fetchMessages
    };
};

export default useUserManagementApi;