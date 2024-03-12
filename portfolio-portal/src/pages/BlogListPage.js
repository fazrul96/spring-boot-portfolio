import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import Swiper from '../components/Swiper';

const backgroundStylesExtra = {
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://images.hdqwalls.com/wallpapers/anime-ninja-4k-lo.jpg")`,
  backgroundSize: 'cover'
};
const LatestUpdateCard = ({ id, alias, image, title, author, genre, description, timeAgo }) => {
    const backgroundStyles = {
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${image}")`,
      backgroundSize: 'cover'
    };
  return (
      <Card style={backgroundStyles}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            image={image}
            alt={title}
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <CardContent>
            <Typography
              variant="h7"
              component={Link}
              to={`/blog/${alias}`}
              sx={{
                maxWidth: '180px', // Adjust the width as needed
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                maxWidth: '180px', // Adjust the width as needed
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {genre}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

const BlogList = ({ blogs }) => {
  return (
  <Box sx={{ flexGrow: 1, padding: 5 }} style={{ marginTop: '70px' }}>
    <Typography
        paragraph
        variant="h6"
        noWrap
        component={Link} to={`/`}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Webtoon
    </Typography>
    <Grid container spacing={2}>
      {/*<Swiper />*/}
      {blogs.map((blog, index) => (
        <Grid item xs={12} md={3} lg={2} key={blog.id}>
          <LatestUpdateCard {...blog} />
        </Grid>
      ))}
      <Grid item xs={12} md={12}>
        <Accordion style={backgroundStylesExtra}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
            <Typography>Expand for more</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
                {blogs.map((blog, index) => (
                    <Grid item xs={12} md={3} lg={2} key={blog.id}>
                        <LatestUpdateCard {...blog} />
                    </Grid>
                ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  </Box>
  );
};

export default BlogList;
