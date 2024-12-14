import React from 'react';
import {Box, Divider, Grid, Typography} from '@mui/material';
import {componentsData} from '../data/cardsData';
import ComponentItems from './../components/ComponentItems';

const ComponentPage = () => {
	const categories = [...new Set(componentsData.map((card) => card.category))];

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '70px' }}>
	        <Typography variant="h3" gutterBottom>Component Collection</Typography>
		    <Typography variant="body1" paragraph>
		        Welcome to our Component Collection! This curated selection features a variety of components.
	        </Typography>
		    {categories
			.filter(category =>
	            componentsData.some(component => component.category === category && component.status === 'Completed'))
		    .map((category, index) => (
			    <div key={index} style={{ marginBottom: '20px' }}>
		            <Typography variant="h4" gutterBottom>{category}</Typography>
			        <Divider style={{ marginBottom: '10px' }} />
			        <Grid container spacing={2}>
			            {componentsData
			                .filter((card) => card.category === category)
			                .map((card, cardIndex) => (
			                    <ComponentItems key={cardIndex} {...card} />
		                ))}
			        </Grid>
			    </div>
		    ))}
		</Box>
	);
};

export default ComponentPage;