import React, {useCallback} from 'react';
import {Box, Divider, Grid, Typography} from '@mui/material';
import CardComponent from './../components/common/CardComponent';
import {cardsData} from '../data/cardsData';

const SpacePage = () => {
	// Use useCallback to memoize the click handler
	const handleCardClick = useCallback((url) => {
		window.open(url, '_blank');
	}, []);

	// Destructuring the props to improve readability
	const renderCards = () => (
		<Grid container spacing={2} sx={{ marginTop: 2 }}>
			{cardsData.map((card) => (
				<Grid item xs={12} sm={6} md={3} key={card.id}>
					<CardComponent
						title={card.title}
						description={card.description}
						imageUrl={card.imageUrl}
						status={card.status}
						onClick={() => handleCardClick(card.url)}  // Memoized function
					/>
				</Grid>
			))}
		</Grid>
	);

	return (
		<Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
			<section id="space">
				<Typography variant="h4" gutterBottom>
					DevOps
				</Typography>
				<Typography variant="body1" paragraph>
					This section showcases various tools and platforms essential for DevOps practices.
					Explore these resources to enhance your understanding of continuous integration,
					continuous deployment, and overall software development lifecycle management.
				</Typography>
				<Divider />
				{renderCards()}
			</section>
		</Box>
	);
};

export default SpacePage;