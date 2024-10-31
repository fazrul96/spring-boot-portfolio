import React from 'react';
import {
	Typography,
	Divider,
	Box,
	Grid,
} from '@mui/material';
import CardComponent from '../components/CardComponent';
import { cardData } from '../data/moduleData';

const ModulePage = () => {
	const categories = [...new Set(cardData.map((card) => card.category))];

	return (
		<Box sx={{ flexGrow: 1, padding: 4, marginTop: '70px' }}>
		    <Typography variant="h3" gutterBottom align="center" color="primary">
		        Module Collection
		    </Typography>
		    <Typography variant="body1" paragraph align="center">
		        Welcome to our Component Collection! This meticulously curated selection features a diverse range of components integral to our project's functionality and user experience. Each component has been thoughtfully crafted to enhance various aspects of our application, ensuring seamless interaction and engagement.
		    </Typography>

		    <Typography variant="h4" gutterBottom align="center" color="secondary">
		        Key Features:
		    </Typography>

		    <Typography variant="body1" paragraph>
		        <strong>OCR (Optical Character Recognition)</strong> enables the electronic or mechanical conversion of images containing typed, handwritten, or printed text into machine-encoded text. Whether you are scanning documents, capturing images, or extracting text from scene photos or subtitles, our OCR functionality delivers accurate and efficient text recognition.
		    </Typography>

		    <Typography variant="body1" paragraph>
		        <strong>Calendar</strong> offers intuitive scheduling capabilities, allowing users to manage events, appointments, and tasks effortlessly. With customizable views and interactive features, it provides a seamless experience for organizing and planning activities.
		    </Typography>

		    <Typography variant="h4" gutterBottom>
		        How to Use:
		    </Typography>
		    <Typography variant="body1" paragraph>
		        Explore each component by navigating through the respective sections. Gain valuable insights into their functionalities, discover customization options, and identify the perfect fit for your specific requirements.
		    </Typography>
		    <Typography variant="body1" paragraph>
		        Feel empowered to experiment with different configurations and seamlessly integrate these components into your project. Whether you are enhancing file handling, creating dynamic presentations, or adding visual appeal with interactive elements, our Component Collection empowers you to elevate your project to new heights.
		    </Typography>

            {categories.map((category) => {
			    const filteredCards = cardData.filter((card) => card.category === category);

			    return (
			        <Box key={category} sx={{ marginBottom: 4 }}>
				        <Typography variant="h4" gutterBottom color="primary">
				            {category}
				        </Typography>
				        <Divider sx={{ marginBottom: 2 }} />
						<Grid container spacing={2} justifyContent="left" alignItems="stretch">
				            {filteredCards.map((card) => (
				                <CardComponent key={card.id} {...card} />
				            ))}
				        </Grid>
			         </Box>
			    );
		    })}
		</Box>
	);
};

export default ModulePage;
