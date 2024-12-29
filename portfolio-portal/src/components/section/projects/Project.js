import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Grid, IconButton, Paper, Typography} from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {useAuth0} from '@auth0/auth0-react';
import Alert from '../../../components/common/Alert';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import ApiService from './../../../services/ApiService';
import {API_BASE_URL, API_PUBLIC_URL, PROJECTS} from '../../../constants/ApiConstants';
import {useTranslation} from 'react-i18next';

const Project = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();

    const apiService = useMemo(() => new ApiService(API_BASE_URL + API_PUBLIC_URL, getAccessTokenSilently), [getAccessTokenSilently]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiService.fetchResource(PROJECTS);
                setData(response);
            } catch (error) {
                setError(t('error.loadData')); // Using translation keys for error messages
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiService, t]);

    const handleOpenForm = (project = null) => {
        setSelectedProject(project || {
            title: '',
            description: '',
            status: '',
            reference: '',
            img: '',
            tag: '',
            list: '',
        });
        setOpenForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProject = async () => {
        if (!selectedProject?.title || !selectedProject?.description) {
            console.error('Title and Description are required');
            return; // Exit early if validation fails
        }

        try {
            if (selectedProject?.id) {
                // Update project
                await apiService.updateResource(PROJECTS, selectedProject.id, selectedProject);
                setData((prevData) =>
                    prevData.map((project) => (project.id === selectedProject.id ? selectedProject : project))
                );
                Alert.success('Success', t('project.updated'));
            } else {
                // Create new project
                const newProject = await apiService.createResource(PROJECTS, selectedProject);
                setData((prevData) => [...prevData, newProject]);
                Alert.success('Success', t('project.created'));
            }
            setOpenForm(false);
        } catch (error) {
            console.error('Error saving project:', error);
            Alert.error('Error', t('error.saveProject'));
        }
    };

    const handleDeleteProject = async (id) => {
        const isConfirmed = await Alert.confirm(t('confirmation.delete.title'), t('confirmation.delete.text'), t);

        if (isConfirmed) {
            try {
                await apiService.deleteResource(PROJECTS, id);
                setData((prevData) => prevData.filter((project) => project.id !== id));
                Alert.success('Deleted!', t('project.deleted'));
            } catch (error) {
                console.error('Error deleting project:', error);
                Alert.error('Error', t('error.deleteProject'));
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Paper elevation={12} sx={{ p: 2, marginBottom: '20px', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton sx={{ display: 'flex', alignItems: 'center' }} disabled>
                        <AccountTreeIcon sx={{ marginRight: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                            {data.length} {t('projects.categories.title')}
                        </Typography>
                    </IconButton>

                    <Button variant="contained" onClick={() => handleOpenForm(null)} sx={{ alignSelf: 'flex-end' }}>
                        {t('projects.addNew.title')}
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <section id="projects">
                        {loading ? (
                            <Typography variant="h6">{t('loading')}</Typography>
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {data.map((project) => (
                                    <Grid item xs={12} sm={6} md={6} lg={3} key={project.id}>
                                        <ProjectCard
                                            project={project}
                                            onEdit={() => handleOpenForm(project)}
                                            onDelete={() => handleDeleteProject(project.id)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </section>
                    <ProjectForm
                        open={openForm}
                        onClose={() => setOpenForm(false)}
                        project={selectedProject}
                        onInputChange={handleInputChange}
                        onSubmit={handleSaveProject}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default Project