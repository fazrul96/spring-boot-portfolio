import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import ProjectCard from '../../../components/section/projects/ProjectCard';
import ProjectCarousel from '../../../components/section/projects/ProjectCarousel';
import { API_BASE_URL, API_PUBLIC_URL, PROJECTS } from './../../../constants/ApiConstants';

import ApiService from './../../../services/ApiService';
import { useAuth0 } from '@auth0/auth0-react';

const Project = ({projects}) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);  // New loading state
	const [error, setError] = useState(null);  // Error state

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

        fetchData();  // Trigger data fetching on component load
    }, [apiService]);

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
	        <section id="projects">
		        {/*
			    <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
			      Experience
			    </h1>
			    <p className="portfolio-subheading">Here are my previous projects</p> */}
			    {/* Map through projects and render ProjectCard for each */}
		        <Grid container spacing={2}>
			        {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
		                <>
		                    {data.map((project, index) => (
		                        <Grid item xs={12} md={3} key={index}>
		                            <ProjectCard project={project} />
		                        </Grid>
		                    ))}
		                </>
                    )}
			    </Grid>
		    </section>
		</Box>
	);
};

const ProjectCustomCarousel = ({ projects }) => (
	<Box sx={{ flexGrow: 1, padding: 2 }}>
		<section id="projects">
			<Grid container spacing={2} justifyContent="center" alignItems="center">
		        <ProjectCarousel projects={projects} />
			</Grid>
		</section>
	</Box>
);

export default Project;