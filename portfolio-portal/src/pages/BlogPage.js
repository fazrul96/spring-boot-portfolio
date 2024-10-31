import React from 'react';
import { Box, Grid } from '@mui/material';
import WebtoonPage from './WebtoonPage';

const BlogPage = ({blogs}) => {
	return (
        <Box sx={{ flexGrow: 1, padding: 2, marginTop: '30px' }}>
            <section id="blog">
		        <Grid container spacing={2} justifyContent="left" alignItems="center">
	                <WebtoonPage />
		        </Grid>
	        </section>
	  </Box>
	);
};

export default BlogPage;