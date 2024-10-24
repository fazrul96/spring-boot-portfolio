import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid, Paper, Button, Typography, IconButton } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useAuth0 } from '@auth0/auth0-react';

import Alert from '../../../components/common/Alert';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import ApiService from './../../../services/ApiService';
import { API_BASE_URL, API_PUBLIC_URL, PROJECTS } from './../../../constants/ApiConstants';

const Project = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PUBLIC_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiService.fetchResource(PROJECTS);
                setData(response);
            } catch (error) {
                setError('Failed to load data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiService]);

    const handleOpenForm = (project = null) => {
        setSelectedProject(project || {
            title: '',
            description: '',
            status: '',
            reference: '',
            img: '',
            tag: '',
            list: ''
        });
        setOpenForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProject(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async () => {
        if (!selectedProject?.title || !selectedProject?.description) {
            console.error('Title and Description are required');
            return;  // Exit early if validation fails
        }

        try {
            if (selectedProject?.id) {
                // Update project
                await apiService.updateResource(PROJECTS, selectedProject.id, selectedProject);
                setData(data.map(project => (project.id === selectedProject.id ? selectedProject : project)));
                Alert.success('Success', 'Project updated successfully!');
            } else {
                // Create new project
                const newProject = await apiService.createResource(PROJECTS, selectedProject);
                setData([...data, newProject]);
                Alert.success('Success', 'Project created successfully!');
            }
            setOpenForm(false);
        } catch (error) {
            console.error('Error saving project:', error);
            Alert.error('Error', 'Failed to save project.');
        }
    };

    const handleDeleteProject = async (id) => {
        const isConfirmed = await Alert.confirm('Are you sure?', 'You won\'t be able to revert this!');
        if (isConfirmed) {
            try {
                await apiService.deleteResource(PROJECTS, id);
                setData(data.filter(project => project.id !== id));
                Alert.success('Deleted!', 'Your project has been deleted.');
            } catch (error) {
                console.error('Error deleting project:', error);
                Alert.error('Error', 'Failed to delete project.');
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Paper elevation={12}
                sx={{
                    p: 2,
                    marginBottom: '20px',
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
		            <IconButton
		                sx={{
		                    display: 'flex',
		                    alignItems: 'center',
		                }}
		                disabled
		            >
					    <AccountTreeIcon sx={{ marginRight: 1 }} />
					    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
					        {data.length} Project Categories
					    </Typography>
		            </IconButton>
                    <Button
                        variant="contained"
                        onClick={() => handleOpenForm(null)}
                        sx={{ alignSelf: 'flex-end' }}
                    >
                        Add New Project
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <section id="projects">
                        <Grid container spacing={2}>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                data.map((project, index) => (
                                    <Grid item xs={12} md={3} key={index}>
                                        <ProjectCard
                                            project={project}
                                            onEdit={() => handleOpenForm(project)}
                                            onDelete={() => handleDeleteProject(project.id)}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </section>
                    <ProjectForm
                        open={openForm}
                        onClose={() => setOpenForm(false)}
                        project={selectedProject}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default Project;