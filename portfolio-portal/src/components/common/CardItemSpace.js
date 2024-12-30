import React from 'react';
import {Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';

// A reusable card component
const CardItem = ({ title, description, imageUrl, url, onClick }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 6,
                borderRadius: 2,
                '&:hover': {
                    boxShadow: 12,
                    transform: 'translateY(-7px)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                },
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
                transition: 'box-shadow 0.3s ease',
            }}
            onClick={() => onClick(url)}
        >
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={title}
                sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                }}
            />
            <CardContent sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }} gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                    {description}
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                sx={{
                    marginTop: 'auto',
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                    padding: '10px 20px',
                    boxShadow: 'none',
                    borderRadius: 1,
                }}
                onClick={() => onClick(url)}
            >
                Learn More
            </Button>
        </Card>
    );
};

export default CardItem;
