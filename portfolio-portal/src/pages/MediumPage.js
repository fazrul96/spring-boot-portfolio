import React, { useState, useEffect } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import MediumContent from './MediumContent';

const MediumPage = () => {
	const mediumUrl = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40mfbr`;
	const [profile, setProfile] = useState({
		name: 'Fazrul Romli',
		profileImage: '',
		profileUrl: ''
	});

	const [blog, setBlog] = useState({
		items: [],
		isLoading: true,
		error: null
	});

	useEffect(() => {
		const fetchData = async () => {
	        try {
	            const response = await fetch(mediumUrl);
		    if (!response.ok) {
		        throw new Error(`Error: ${response.statusText}`);
		    }

		        const info = await response.json();
		        const { image, link } = info.feed;
		        const blogs = info.items;

		        setProfile({ profileUrl: link, profileImage: image });
		        setBlog({ items: blogs, isLoading: false, error: null });
		    } catch (error) {
		        console.error('Error fetching Medium content:', error);
		        setBlog({ items: [], isLoading: false, error: error.message });
		    }
		};

		fetchData();
	}, []);

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
	        <section id="medium">
			    {blog.isLoading ? (
		            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
			            <CircularProgress />
			        </Box>
			    ) : (
		            <>
				        {blog.error ? (
			                <Typography color="error" variant="body1" align="center">
				                {blog.error}
			                </Typography>
				        ) : (
			                <Grid container spacing={2} justifyContent="left" alignItems="center">
				                <MediumContent profile={profile} blog={blog} />
				            </Grid>
				        )}
			        </>
			    )}
	        </section>
		</Box>
	);
};

export default MediumPage;