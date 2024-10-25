import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import CardComponent from './../components/common/CardComponent';
import { cardsData } from '../data/cardsData';

const SpacePage = () => {
	return (
		<Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
	        <section id="space">
		        <Typography variant="h4" gutterBottom>
		            DevOps
		        </Typography>
		        <Typography variant="body1" paragraph>
		            This section showcases various tools and platforms essential for DevOps practices. Explore these resources to enhance your understanding of continuous integration, continuous deployment, and overall software development lifecycle management.
		        </Typography>
		        <Divider />
			    <Grid container spacing={2} sx={{ marginTop: 2 }}>
		            {cardsData.map((card) => (
				        <Grid item xs={12} sm={6} md={2} key={card.id}>
			                <CardComponent
				                title={card.title}
				                description={card.description}
				                imageUrl={card.imageUrl}
				                status={card.status}
				                onClick={() => window.open(card.url, '_blank')}
				            />
				        </Grid>
			        ))}
			    </Grid>
		    </section>
		</Box>
	);
};

export default SpacePage;