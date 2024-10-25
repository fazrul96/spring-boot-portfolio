import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button } from '@mui/material';

const cardStyles = {
	completed: { color: 'green' },
	testing: { color: '#b8860b' },
	development: { color: 'blue' },
	pending: { color: 'red' },
};

const CardComponent = ({ title, description, imageUrl, status, onClick }) => {
	return (
		<Card>
	        <CardActionArea onClick={onClick}>
			    <CardMedia component="img" height="140" image={imageUrl} alt={`${title} Image`} />
			    <CardContent>
			        <Typography gutterBottom variant="h5" component="div">
			            {title}
			        </Typography>
			        <Typography variant="body2" color="text.secondary">
			            {description}
			        </Typography>
			        <Typography variant="body2" style={cardStyles[status.toLowerCase()]}>
			            {status}
			        </Typography>
			    </CardContent>
		    </CardActionArea>
		    <CardActions>
			    <Button size="small" color="primary" onClick={onClick}>
			        Learn More
			    </Button>
		    </CardActions>
		</Card>
	);
};

export default CardComponent;