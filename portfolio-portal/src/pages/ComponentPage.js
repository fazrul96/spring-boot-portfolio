import React, {useState} from 'react';
import {Box, Button, Chip, Divider, Grid, Skeleton, Typography} from '@mui/material';
import {componentsData} from '../data/cardsData';
import ComponentItems from './../components/ComponentItems';

const ComponentPage = () => {
	const categories = [...new Set(componentsData.map((card) => card.category))];
	const [loading, setLoading] = useState(false); // Loading state for fetching components

	// Filter completed categories
	const completedCategories = categories.filter(category =>
		componentsData.some(component => component.category === category && component.status === 'Completed')
	);

	// Simulate loading components
	const handleLoadMore = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false); // Simulate network delay
		}, 2000);
	};

	return (
		<Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
			{/* Title Section */}
			<Typography variant="h3" gutterBottom align="center" color="primary">
				Component Collection
			</Typography>
			<Typography variant="body1" paragraph align="center" sx={{ maxWidth: '900px', margin: '0 auto' }}>
				Welcome to our Component Collection! This curated selection features a variety of components that are integral to our application, each with unique functionality and purpose.
			</Typography>

			{/* Categories with Chips */}
			<Box sx={{ marginTop: 2, marginBottom: 4 }}>
				<Typography variant="h6" gutterBottom color="textSecondary">
					Filter by Category:
				</Typography>
				<Grid container spacing={2}>
					{completedCategories.map((category, index) => (
						<Grid item key={index}>
							<Chip
								label={category}
								color="primary"
								variant="filled"
								sx={{ cursor: 'pointer' }}
								onClick={() => console.log(`Filter by category: ${category}`)} // Placeholder filter action
							/>
						</Grid>
					))}
				</Grid>
			</Box>

			{/* Category List */}
			{completedCategories.map((category, index) => (
				<div key={index} style={{ marginBottom: '20px' }}>
					<Typography variant="h4" gutterBottom color="secondary">
						{category}
					</Typography>
					<Divider style={{ marginBottom: '10px' }} />

					{/* Display Skeleton Loader */}
					{loading ? (
						<Grid container spacing={2}>
							{[...Array(4)].map((_, idx) => (
								<Grid item key={idx} xs={12} sm={6} md={3}>
									<Skeleton variant="rectangular" height={200} />
								</Grid>
							))}
						</Grid>
					) : (
						<Grid container spacing={2}>
							{componentsData
								.filter((card) => card.category === category)
								.map((card, cardIndex) => (
									<ComponentItems key={cardIndex} {...card} />
								))}
						</Grid>
					)}
				</div>
			))}

			{/* Load More Button */}
			<Box sx={{ textAlign: 'center', marginTop: 4 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleLoadMore}
					sx={{ padding: '10px 30px' }}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Load More Components'}
				</Button>
			</Box>
		</Box>
	);
};

export default ComponentPage;
