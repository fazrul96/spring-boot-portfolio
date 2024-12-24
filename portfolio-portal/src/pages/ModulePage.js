import React, {useState} from 'react';
import {
	Box,
	Button,
	Chip,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Skeleton,
	Stack,
	Typography
} from '@mui/material';
import {cardData} from '../data/moduleData';
import CardComponent from '../components/CardComponent';

const ModulePage = () => {
	const categories = [...new Set(cardData.map((card) => card.category))];
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [sortBy, setSortBy] = useState('newest');
	const [viewStyle, setViewStyle] = useState('list');

	// Filter the cards based on the selected category
	const filteredCards = selectedCategory
		? cardData.filter((card) => card.category === selectedCategory)
		: cardData;

	// Sort the cards based on the selected criteria
	const sortedCards = [...filteredCards].sort((a, b) => {
		if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
		if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
		if (sortBy === 'popularity') return b.popularity - a.popularity;
		return 0;
	});

	const handleCategoryFilter = (category) => {
		setSelectedCategory(category);
	};

	return (
		<Box sx={{ flexGrow: 1, padding: { xs: 2, sm: 4 }, marginTop: '70px' }}>
			{/* Page Title */}
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant="h3" color="primary">
					Module Collection
				</Typography>
				<Button variant="contained" color="secondary" onClick={() => setLoading(true)}>
					Load More
				</Button>
			</Box>

			{/* Category Filter Chips */}
			<Box sx={{ marginTop: 2, marginBottom: 4 }}>
				<Typography variant="h6" color="textSecondary">Filter by Category:</Typography>
				<Stack direction="row" spacing={1} flexWrap="wrap">
					{categories.map((category) => (
						<Chip
							key={category}
							label={category}
							onClick={() => handleCategoryFilter(category)}
							color={selectedCategory === category ? 'primary' : 'default'}
							variant={selectedCategory === category ? 'filled' : 'outlined'}
							sx={{ cursor: 'pointer' }}
						/>
					))}
					{selectedCategory && (
						<Chip
							label="Clear Filters"
							color="secondary"
							onClick={() => setSelectedCategory('')}
							sx={{ cursor: 'pointer' }}
						/>
					)}
				</Stack>
			</Box>

			{/* Sorting and View Options */}
			<Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<FormControl fullWidth sx={{ maxWidth: 200 }}>
					<InputLabel>Sort By</InputLabel>
					<Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
						<MenuItem value="newest">Newest</MenuItem>
						<MenuItem value="alphabetical">Alphabetical</MenuItem>
						<MenuItem value="popularity">Popularity</MenuItem>
					</Select>
				</FormControl>

				<Box sx={{ display: 'flex', gap: 2 }}>
					<Button variant={viewStyle === 'grid' ? 'contained' : 'outlined'} onClick={() => setViewStyle('grid')}>
						Grid View
					</Button>
					<Button variant={viewStyle === 'list' ? 'contained' : 'outlined'} onClick={() => setViewStyle('list')}>
						List View
					</Button>
				</Box>
			</Box>

			{/* Intro Text */}
			<Typography variant="body1" paragraph align="center" sx={{ maxWidth: '900px', margin: '0 auto' }}>
				Welcome to our Component Collection! This meticulously curated selection features a diverse range of components integral to our project's functionality and user experience. Each component has been thoughtfully crafted to enhance various aspects of our application, ensuring seamless interaction and engagement.
			</Typography>

			{/* Key Features Section */}
			<Box sx={{ marginBottom: 4 }}>
				<Typography variant="h4" gutterBottom align="center" color="secondary">
					Key Features:
				</Typography>
				<Stack spacing={2} direction="column" alignItems="center">
					<Typography variant="body1" paragraph>
						<strong>OCR (Optical Character Recognition)</strong> enables the electronic or mechanical conversion of images containing typed, handwritten, or printed text into machine-encoded text. Whether you are scanning documents, capturing images, or extracting text from scene photos or subtitles, our OCR functionality delivers accurate and efficient text recognition.
					</Typography>

					<Typography variant="body1" paragraph>
						<strong>Calendar</strong> offers intuitive scheduling capabilities, allowing users to manage events, appointments, and tasks effortlessly. With customizable views and interactive features, it provides a seamless experience for organizing and planning activities.
					</Typography>
				</Stack>
			</Box>

			{/* Render Categories and Cards */}
			<Box sx={{ marginBottom: 4 }}>
				{loading ? (
					// Show Skeleton Loader if loading
					<Grid container spacing={2} justifyContent="center">
						{[...Array(4)].map((_, index) => (
							<Grid item key={index} xs={12} sm={6}>
								<Skeleton variant="rectangular" width="100%" height={200} />
							</Grid>
						))}
					</Grid>
				) : (
					<Grid container spacing={2} justifyContent="center">
						{sortedCards.map((card) => (
							<Grid item key={card.id} xs={12} sm={6} md={viewStyle === 'grid' ? 4 : 12}>
								<Paper elevation={3} sx={{ p: 2, borderRadius: 2, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
									<CardComponent {...card} />
								</Paper>
							</Grid>
						))}
					</Grid>
				)}
			</Box>

			{/* Footer or Call to Action Section */}
			<Box sx={{ textAlign: 'center', marginTop: 4 }}>
				<Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
					View All Components
				</Button>
				<Button variant="outlined" color="secondary">
					Learn More
				</Button>
			</Box>
		</Box>
	);
};

export default ModulePage;
