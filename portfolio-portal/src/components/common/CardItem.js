import React from 'react';
import {Paper, Typography} from '@mui/material';

// Function to get the styles for the Paper component
const getPaperStyles = () => ({
	padding: 2, // Increased padding for better spacing
	textAlign: 'center',
	backgroundColor: '#f5f5f5', // Use a subtle background color
	borderRadius: '8px', // Rounded corners for a softer look
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Custom shadow for depth
	height: '150px', // Fixed height for uniformity
	display: 'flex', // Use flexbox for vertical alignment
	flexDirection: 'column', // Align items vertically
	justifyContent: 'center', // Center items vertically
	'&:hover': { // Add hover effect
		backgroundColor: '#e0e0e0',
		transform: 'scale(1.02)',
		transition: 'transform 0.2s, background-color 0.2s',
	},
});

// Generic CardItem component for rendering items with a label and value
const CardItem = ({ label, value }) => (
	<Paper elevation={3} sx={getPaperStyles()}>
		<Typography variant="h7" sx={{ fontWeight: '600', mb: 1 }}>
		    {label}
		</Typography>
		<Typography
		    variant="body1"
		    sx={{
		        lineHeight: '1.5',
		        color: '#333', // Darker text for better readability
		    }}
		>
		    {Array.isArray(value) ? (
		        value.map((line, lineIndex) => <div key={lineIndex}>{line}</div>)
		    ) : (
		        value.split('\n').map((line, lineIndex) => <div key={lineIndex}>{line}</div>)
		    )}
		</Typography>
	</Paper>
);

export default CardItem;