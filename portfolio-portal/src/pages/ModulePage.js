import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Box,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import OCRPage from '../pages/OCRPage';
import CalendarPage from '../pages/CalendarPage';

const cardData = [
    {
        title: 'Optical Character Recognition',
        category: 'Module',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        content: <OCRPage />,
        tag: 'ocr',
        details: (
          <Typography variant="body2" color="text.secondary">
            Optical character recognition or optical character reader (OCR) is the electronic or mechanical conversion of images of typed, handwritten or printed text into machine-encoded text, whether from a scanned document, a photo of a document, a scene photo (for example the text on signs and billboards in a landscape photo) or from subtitle text superimposed on an image
          </Typography>
        ),
    },
    {
        title: 'Calendar',
        category: 'Module',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        content: <CalendarPage />,
        tag: 'calendar',
        details: (
          <Typography variant="body2" color="text.secondary">
            Optical character recognition or optical character reader (OCR) is the electronic or mechanical conversion of images of typed, handwritten or printed text into machine-encoded text, whether from a scanned document, a photo of a document, a scene photo (for example the text on signs and billboards in a landscape photo) or from subtitle text superimposed on an image
          </Typography>
        ),
    },
];

const CardComponent = ({ title, category, image, content, tag, details }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return(
      <Grid item xs={12} md={6}>
        <Card style={{ marginTop: '10px' }}>
          <CardActionArea>
            {/*
            <CardMedia
              component="img"
              image={image}
              alt={`${title} Image`}
              style={{ objectFit: 'cover', height: '200px' }}
            />
            */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Link to={`/module/${tag}`} >
                  {title}
                </Link>
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
};

const ComponentPage = () => {
  const categories = [...new Set(cardData.map((card) => card.category))];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '100px' }}>
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
      {/* Loop through categories */}
      {categories.map((category, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            {category}
          </Typography>
          <Divider style={{ marginBottom: '10px' }} />
          <Grid container spacing={2} justifyContent="left" alignItems="stretch">
            {/* Filter cards based on the current category */}
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

export default ComponentPage;
