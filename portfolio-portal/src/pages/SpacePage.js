import React, { useCallback, useState, useEffect } from 'react';
import { Box, Divider, Grid, Typography, Button, Card, CardContent, CardMedia, CircularProgress, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { cardsData } from '../data/cardsData';
import CardItemSpace from './../components/common/CardItemSpace';

const SpacePage = () => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Memoized click handler to open the card's URL
	const handleCardClick = useCallback((url) => {
		window.open(url, '_blank');
	}, []);

	// Simulate fetching data (you can replace this with an actual API call)
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1500);  // Simulated delay for loading
	}, []);

	// Render cards in a Grid layout
	const renderCards = () => (
		<Grid container spacing={3}>
			{cardsData.map((card) => (
				<Grid item xs={12} sm={6} md={4} key={card.id}>
					<CardItemSpace
						title={card.title}
						description={card.description}
						imageUrl={card.imageUrl}
						url={card.url}
						onClick={handleCardClick}
					/>
				</Grid>
			))}
		</Grid>
	);

	return (
		<Box sx={{ flexGrow: 1, padding: 3, marginTop: '70px' }}>
			<section id="space">
				<Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
					DevOps Tools and Resources
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{
						textAlign: 'center',
						maxWidth: '800px',
						margin: '0 auto',
						color: theme.palette.text.secondary,
						lineHeight: 1.6,
					}}
				>
					Discover the most essential tools and platforms used in DevOps practices. These resources will help you optimize continuous integration, continuous deployment, and the overall software development lifecycle.
				</Typography>

				{/* Loading Spinner */}
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
						<CircularProgress color="primary" />
					</Box>
				) : (
					<>
						<Divider sx={{ marginY: 3 }} />
						{renderCards()}
					</>
				)}

				{/* Error or No Results State */}
				{error && (
					<Snackbar
						open={Boolean(error)}
						autoHideDuration={6000}
						message="Something went wrong. Please try again."
						onClose={() => setError(null)}
					/>
				)}
			</section>
		</Box>
	);
};

export default SpacePage;
