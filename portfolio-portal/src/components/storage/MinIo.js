import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    Breadcrumbs, Box, TextField, Grid, Link, InputLabel,
    CircularProgress, Snackbar, Alert, FormControl, Select, MenuItem
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import FileGrid from './FileGrid';
import FileList from './FileList';
import Filepond from './../filepond/Filepond';
import { isFolder } from './utils';
import ApiService from './../../services/ApiService';
import { VIEW_TYPES, SORT_OPTIONS, FILE_TYPE_FILTERS } from './../../constants/AppConstants';
import {
    API_BASE_URL, API_PRIVATE_URL, MINIO_LIST_FILES,
    MINIO_DOWNLOAD_FILE, MINIO_UPLOAD_FILES, MINIO_DELETE_FILE
} from './../../constants/ApiConstants';

const MinIo = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewType, setViewType] = useState(VIEW_TYPES.LIST);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME);
    const [fileTypeFilter, setFileTypeFilter] = useState(FILE_TYPE_FILTERS.ALL);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPath, setCurrentPath] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const apiService = useMemo(() => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently), [getAccessTokenSilently]);

    const fetchFiles = useCallback(async (prefix = '') => {
        setIsLoading(true);
        try {
            const response = prefix
                ? await apiService.fetchResourceWithParams(MINIO_LIST_FILES, { prefix })
                : await apiService.fetchResource(MINIO_LIST_FILES);
            setData(response || []);
        } catch (error) {
            console.error('Failed to fetch files:', error);
            setSnackbar({ open: true, message: 'Failed to fetch files', severity: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [apiService]);

    useEffect(() => {
        fetchFiles(currentPath);
    }, [fetchFiles, currentPath]);

    const handleDownload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('fileName', file.originalName);

            await apiService.fetchResourceWithFormData(MINIO_DOWNLOAD_FILE, formData);
            setSnackbar({ open: true, message: `${file.alias} downloaded successfully!`, severity: 'success' });
        } catch (error) {
            console.error('Failed to download file:', error);
            setSnackbar({ open: true, message: `Failed to download ${file.alias}`, severity: 'error' });
        }
    };

    const handleDelete = async (file) => {
        try {
			await apiService.deleteResourceFile(MINIO_DELETE_FILE, { fileName: file.originalName });
            setData(data.filter((item) => item.originalName !== file.originalName));
            setSnackbar({ open: true, message: `${file.alias} deleted successfully!`, severity: 'success' });
        } catch (error) {
            console.error('Failed to delete file:', error);
            setSnackbar({ open: true, message: `Failed to delete ${file.alias}`, severity: 'error' });
        }
    };

	// todo last function, fix upload using filepond
    const handleFileUpload = async (file) => {
    console.info('file:', file);
        if (!file) {
            setSnackbar({ open: true, message: 'No file selected', severity: 'error' });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file.file);
            formData.append('path', currentPath);
            console.info('formData:', formData);
            await apiService.createResource(MINIO_UPLOAD_FILES, formData);
            setSnackbar({ open: true, message: `Upload initiated for ${file.name}`, severity: 'info' });
            fetchFiles(currentPath); // Refresh the file list
        } catch (error) {
            console.error('Failed to upload file:', error);
            setSnackbar({ open: true, message: 'Upload failed', severity: 'error' });
        }
    };

    const handleFolderClick = (folder) => {
        setCurrentPath(folder.originalName);
    };

    const handleBreadcrumbClick = (index) => {
        const pathParts = currentPath.split('/').filter(Boolean);
        const newPath = pathParts.slice(0, index + 1).join('/') + '/';
        setCurrentPath(newPath);
    };

    const filteredFiles = useMemo(() => data.filter((file) => {
        const matchesSearch = !searchTerm || file.alias.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = fileTypeFilter === FILE_TYPE_FILTERS.ALL
            || (fileTypeFilter === FILE_TYPE_FILTERS.FILE && file.type === 'file')
            || (fileTypeFilter === FILE_TYPE_FILTERS.FOLDER && file.type === 'folder');
        return matchesSearch && matchesType;
    }), [data, searchTerm, fileTypeFilter]);

    const sortedFiles = useMemo(() => {
        const compareFn = (a, b) => {
            const extractNumber = (str) => {
                const match = str.match(/(\d+)/);
                return match ? parseInt(match[0], 10) : 0; // Extract the first number, default to 0
            };

            // Compare the aliases textually first
            const textComparison = a.alias.localeCompare(b.alias, undefined, { numeric: true, sensitivity: 'base' });
            if (textComparison !== 0) return textComparison;

            // If the textual parts are the same, compare the numbers
            const numA = extractNumber(a.alias);
            const numB = extractNumber(b.alias);
            return numA - numB;
        };

        return sortBy === SORT_OPTIONS.NAME ? [...filteredFiles].sort(compareFn) : filteredFiles;
    }, [filteredFiles, sortBy]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    {currentPath.split('/').filter(Boolean).map((folder, index) => (
                        <Link
                            key={index}
                            color="inherit"
                            onClick={() => handleBreadcrumbClick(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {folder}
                        </Link>
                    ))}
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Search Files"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '100%' }}
                />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>View</InputLabel>
                        <Select value={viewType} onChange={(e) => setViewType(e.target.value)} label="View">
                            <MenuItem value={VIEW_TYPES.GRID}>Grid</MenuItem>
                            <MenuItem value={VIEW_TYPES.LIST}>List</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                            <MenuItem value={SORT_OPTIONS.NAME}>Name</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Filepond onFileUpload={handleFileUpload} />
            </Grid>
            <Grid item xs={12}>
                {isLoading ? (
                    <CircularProgress />
                ) : viewType === VIEW_TYPES.GRID ? (
                    <FileGrid
                        files={sortedFiles}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                        onFolderClick={handleFolderClick}
                    />
                ) : (
                    <FileList
                        files={sortedFiles}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                        onFolderClick={handleFolderClick}
                    />
                )}
            </Grid>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default MinIo;
