import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import CardStatus from './CardStatus';

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
					<Typography variant="body2">
						<CardStatus status={status} />
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
