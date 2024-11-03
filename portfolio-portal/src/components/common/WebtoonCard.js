import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, CardActionArea, CardActions } from '@mui/material';
import { DEFAULT_IMAGE } from './../../constants/AppConstants';

const WebtoonCard = ({ webtoon, onClick, onDelete }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardActionArea onClick={onClick}>
				<CardMedia
				    component="img"
				    image={webtoon?.coverImage || DEFAULT_IMAGE}
				    sx={{
				        width: '100%',
				        height: {
				            xs: 'auto', // height for extra small screens
				            sm: 'auto', // height for small screens
				            md: '350px', // height for medium screens
				            lg: '450px'  // height for large screens and up
				        },
				        objectFit: 'cover'
				    }}
				    alt={webtoon.title}
				/>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h7">{webtoon.alias}</Typography>
                    <Typography variant="body2">Chapter {webtoon.chapter}</Typography>
                    <Typography variant="body2">★★★★★ {webtoon.rating}</Typography>
                </CardContent>
               <CardActions>
                    <Button size="small" color="secondary" onClick={onDelete}>
                        Delete
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default WebtoonCard;