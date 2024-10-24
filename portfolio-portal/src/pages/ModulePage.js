import React from 'react';
import {
	Typography,
	Divider,
	Box,
	Grid,
} from '@mui/material';
import CardComponent from '../components/CardComponent';
import { cardData } from '../data/ModuleData';

const ModulePage = () => {
const categories = [...new Set(cardData.map((card) => card.category))];

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '70px' }}>
            <Typography variant="h3" gutterBottom>
                Module Collection
            </Typography>
	        <Typography variant="body1" paragraph>
	            Welcome to our Component Collection! This meticulously curated selection features a diverse range of components integral to our projects functionality and user experience. Each component has been thoughtfully crafted to enhance various aspects of our application, ensuring seamless interaction and engagement.
	        </Typography>

	        <Typography variant="h4" gutterBottom>
	            Key Features:
	        </Typography>

	        <Typography variant="body1" paragraph>
	            <strong>OCR (Optical Character Recognition)</strong> OCR is a pivotal feature enabling the electronic or mechanical conversion of images containing typed, handwritten, or printed text into machine-encoded text. Whether you are scanning documents, capturing images, or extracting text from scene photos or subtitles, our OCR functionality delivers accurate and efficient text recognition.
	        </Typography>

            <Typography variant="body1" paragraph>
                <strong>Calendar</strong> Our Calendar component offers intuitive scheduling capabilities, allowing users to manage events, appointments, and tasks effortlessly. With customizable views and interactive features, it provides a seamless experience for organizing and planning activities.
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
	        {categories.map((category, index) => (
	            <div key={index} style={{ marginBottom: '20px' }}>
	                <Typography variant="h4" gutterBottom>
	                    {category}
	                </Typography>
	                <Divider style={{ marginBottom: '10px' }} />
	                <Grid container spacing={2} justifyContent="left" alignItems="stretch">
	                    {cardData
		                    .filter((card) => card.category === category)
		                    .map((card, cardIndex) => (
	                        <CardComponent key={cardIndex} {...card} />
	                    ))}
	                </Grid>
	            </div>
	        ))}
		</Box>
	);
};

export default ModulePage;