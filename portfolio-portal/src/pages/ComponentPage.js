import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Carousel from '../components/Carousel';
import Swiper from '../components/Swiper';
import Filepond from '../components/filepond/Filepond';

const cardData = [
  {
    title: 'Filepond',
    image: 'https://wallpapercave.com/wp/wp2708351.jpg',
    content: <Filepond />,
    details: <></>,
  },
  {
    title: 'Swiper',
    image: 'https://wallpapercave.com/wp/wp2708351.jpg',
    content: <Swiper />,
    details: <></>,
  },
  {
    title: 'Carousel',
    image: 'https://wallpapercave.com/wp/wp2708351.jpg',
    content: <Carousel />,
    details: <></>,
  },
  // Add more card data as needed
];

const CardComponent = ({ title, image, content, details }) => (
  <Grid item xs={12} md={4}>
    <Card style={{ marginTop: '100px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={`${title} Image`}
          style={{ objectFit: 'cover', height: '200px' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
          <Typography>More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {details}
        </AccordionDetails>
      </Accordion>
    </Card>
  </Grid>
);

const ComponentPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="left" alignItems="center">
        {cardData.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </Grid>
    </Box>
  );
};

export default ComponentPage;
