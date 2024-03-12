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
import Carousel from '../components/Carousel';
import Swiper from '../components/Swiper';
import SwiperCube from '../components/SwiperCube';
import SwiperVertical from '../components/SwiperVertical';
import Filepond from '../components/filepond/Filepond';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const cardData = [
    {
        title: 'Filepond',
        category: 'Upload',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        content: <Filepond />,
        details: (
          <Typography variant="body2" color="text.secondary">
            FilePond is a JavaScript library that brings silky smooth drag n drop file uploading. These docs will help install, set up, modify, and extend FilePond.
          </Typography>
        ),
        markdown: (`
              import React from 'react';
              const MyComponent = () => {
                return <div>Hello, World!</div>;
              };
              export default MyComponent;`
        ),
    },
    {
      title: 'Weather API',
      category: '3rd Party API',
      image: 'https://wallpapercave.com/wp/wp2708351.jpg',
      content: <></>,
      details: <></>,
      markdown: (`
          import React from 'react';
          const MyComponent = () => {
            return <div>Hello, World!</div>;
          };
          export default MyComponent;`
      ),
    },
    {
      title: 'Timezone API',
      category: '3rd Party API',
      image: 'https://wallpapercave.com/wp/wp2708351.jpg',
      content: <></>,
      details: <></>,
      markdown: (`
          import React from 'react';
          const MyComponent = () => {
            return <div>Hello, World!</div>;
          };
          export default MyComponent;`
      ),
    },
    {
      title: 'Other API',
      category: '3rd Party API',
      image: 'https://wallpapercave.com/wp/wp2708351.jpg',
      content: <></>,
      details: <></>,
      markdown: (`
          import React from 'react';
          const MyComponent = () => {
            return <div>Hello, World!</div>;
          };
          export default MyComponent;`
      ),
    },
];

// fix swiper UI
const fixSwiper = [
    {
        title: 'Swiper',
        category: 'Swiper',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        content: <Swiper />,
        details: (
          <Typography variant="body2" color="text.secondary">
            Swiper is the most modern free and open-source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps. Swiper, along with other great components, is a part of Framework7 and Ionic Framework - fully-featured frameworks for building iOS & Android apps.
          </Typography>
        ),
        markdown: (`
              import React from 'react';
              const MyComponent = () => {
                return <div>Hello, World!</div>;
              };
              export default MyComponent;`
        ),
    },
    {
        title: 'Carousel',
        category: 'Swiper',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        content: <Carousel />,
        details: (
          <Typography variant="body2" color="text.secondary">
            Swiper is the most modern free and open-source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps. Swiper, along with other great components, is a part of Framework7 and Ionic Framework - fully-featured frameworks for building iOS & Android apps.
          </Typography>
        ),
        markdown: (`
              import React from 'react';
              const MyComponent = () => {
                return <div>Hello, World!</div>;
              };
              export default MyComponent;`
        ),
    },
    {
          title: 'Vertical',
          category: 'Swiper',
          image: 'https://wallpapercave.com/wp/wp2708351.jpg',
          content: <SwiperVertical />,
          details: (
              <Typography variant="body2" color="text.secondary">
                Swiper is the most modern free and open-source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps. Swiper, along with other great components, is a part of Framework7 and Ionic Framework - fully-featured frameworks for building iOS & Android apps.
              </Typography>
          ),
        markdown: (`
              import React from 'react';
              const MyComponent = () => {
                return <div>Hello, World!</div>;
              };
              export default MyComponent;`
        ),
    },
    {
          title: 'Cube',
          category: 'Swiper',
          image: 'https://wallpapercave.com/wp/wp2708351.jpg',
          content: <SwiperCube />,
          details: (
              <Typography variant="body2" color="text.secondary">
                Swiper is the most modern free and open-source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps. Swiper, along with other great components, is a part of Framework7 and Ionic Framework - fully-featured frameworks for building iOS & Android apps.
              </Typography>
          ),
        markdown: (`
              import React from 'react';
              const MyComponent = () => {
                return <div>Hello, World!</div>;
              };
              export default MyComponent;`
        ),
    },
    {
          title: 'Fade',
          category: 'Swiper',
          image: 'https://wallpapercave.com/wp/wp2708351.jpg',
          content: <Carousel />,
          details: (
              <Typography variant="body2" color="text.secondary">
                Swiper is the most modern free and open-source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps. Swiper, along with other great components, is a part of Framework7 and Ionic Framework - fully-featured frameworks for building iOS & Android apps.
              </Typography>
          ),
        markdown: (`
              import React from 'react';
              const MyComponent = () => {
                return <div>Hello, World!</div>;
              };
              export default MyComponent;`
        ),
    },
];

const CardComponent = ({ title, image, content, details, markdown }) => {
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
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                  <CopyToClipboard text={markdown} onCopy={handleCopy}>
                    <button
                      style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </CopyToClipboard>
                </div>
                <SyntaxHighlighter language="jsx" style={vs}>
                  {markdown}
                </SyntaxHighlighter>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Grid>
    );
};

const ComponentPage = () => {
  const categories = [...new Set(cardData.map((card) => card.category))];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '70px' }}>
      <Typography variant="h3" gutterBottom>
        Component Collection
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our Component Collection! This curated selection features a variety of components utilized throughout our project. Each component serves a unique purpose, enhancing the overall functionality and user experience of our application.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Key Features:
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Filepond:</strong> Explore the power of Filepond, a versatile file upload component. Seamlessly integrate file uploading functionalities into your application, providing users with a smooth and efficient way to handle documents and media.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Swiper:</strong> Immerse your users in dynamic content presentation with Swiper. This component enables you to create engaging slideshows and carousels, perfect for showcasing images, videos, or any other content in a visually appealing manner.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Carousel:</strong> Elevate your application's visual appeal with Carousel. This component allows you to create captivating image and video carousels, providing a delightful way to present and navigate through multimedia content.
      </Typography>
      <Typography variant="h4" gutterBottom>
        How to Use:
      </Typography>
      <Typography variant="body1" paragraph>
        Explore each component by navigating through the respective sections. Gain insights into their functionalities, discover customization options, and find the perfect fit for your specific requirements.
      </Typography>
      <Typography variant="body1" paragraph>
        Feel free to experiment with different configurations and incorporate these components into your project to enhance its overall interactivity and engagement.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you're handling file uploads, creating immersive slideshows, or adding visual interest with carousels, our Component Collection has you covered. Elevate your project with these versatile components, designed to make your application stand out.
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
