import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import Swiper from '../components/Swiper';

const LatestUpdateCard = ({ id, image, title, author, genre, chapters, timeAgo }) => {
  const sortedChapters = chapters.sort((a, b) => b.localeCompare(a));

  return (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component={Link} to={`/blog/${id}`}>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {author} | {genre}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Chapters:</strong>
              <ul>
                  {sortedChapters.map((chapter, index) => (
                    <li key={index}>
                      <Link to={`/blog/${id}/chapter/${chapter}`}>{chapter}</Link>
                    </li>
                  ))}
              </ul>
              {`Published ${timeAgo}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" component={Link} to={`/blog/${id}`}>
            Read Now
          </Button>
        </CardActions>
        <Accordion style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${image}")`, backgroundSize: 'cover' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
            <Typography>More Information</Typography>
          </AccordionSummary>
          <AccordionDetails>

          </AccordionDetails>
        </Accordion>
      </Card>
  );
};

const BlogList = () => {
    const latestUpdates = [
      {
        id: 'tog',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        title: 'Tower Of God',
        author: 'SIU',
        genre: 'Fantasy',
        chapters: ['Chapter 173', 'Chapter 172', 'Chapter 171'],
        timeAgo: '6 hours ago',
      },
      {
        id: 'comic2',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        title: 'Solo Levelling',
        author: 'SIU',
        genre: 'Fantasy',
        chapters: ['Chapter 10', 'Chapter 11', 'Chapter 12'],
        timeAgo: '12 hours ago',
      },
      {
        id: 'comic3',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        title: 'Mercenary Enrollment',
        author: 'SIU',
        genre: 'Fantasy',
        chapters: ['Chapter 13', 'Chapter 14', 'Chapter 15'],
        timeAgo: '18 hours ago',
      },
      {
        id: 'comic4',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        title: 'Comic 4',
        author: 'SIU',
        genre: 'Fantasy',
        chapters: ['Chapter 20', 'Chapter 21', 'Chapter 22'],
        timeAgo: '1 day ago',
      },
      {
        id: 'comic5',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        title: 'The Beginning After The End',
        author: 'SIU',
        genre: 'Fantasy',
        chapters: ['Chapter 25', 'Chapter 26', 'Chapter 27'],
        timeAgo: '2 days ago',
      },
      {
        id: 'comic6',
        image: 'https://wallpapercave.com/wp/wp2708351.jpg',
        title: 'Levelling With The God',
        author: 'SIU',
        genre: 'Fantasy',
        chapters: ['Chapter 30', 'Chapter 31', 'Chapter 32'],
        timeAgo: '3 days ago',
      },
    ];

  return (
    <Grid container spacing={2} style={{ marginTop: '0px' }}>
      <Swiper />
      {latestUpdates.map((update, index) => (
        <Grid item xs={12} md={3}>
            <LatestUpdateCard key={index} {...update} />
        </Grid>
      ))}
        <Grid item xs={12} md={12}>
            <Accordion style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://wallpapercave.com/wp/wp2708351.jpg")`, backgroundSize: 'cover' }}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
                 <Typography>Expand for more</Typography>
               </AccordionSummary>
               <AccordionDetails>

               </AccordionDetails>
             </Accordion>
        </Grid>
    </Grid>
  );
};

export default BlogList;
