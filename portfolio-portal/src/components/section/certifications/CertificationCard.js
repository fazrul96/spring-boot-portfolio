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
  Chip,
  Stack, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FaceIcon from '@mui/icons-material/Face';

import {Image} from 'react-bootstrap';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const CertificationCard = ({ certification }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="190"
          image={'https://wallpaperaccess.com/full/262055.jpg'}
          alt="Certification Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {certification.title}
            <Typography gutterBottom variant="h6" component="div">
                {certification.role}
                {/*
                 <p className="card-text text-muted">{certification.name}</p>
                  <p className="card-text text-muted">Issued: {certification.issued_date}</p>
                  <p className="card-text text-muted">Credential ID: {certification.cred_id}</p>
                  */}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {certification.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {/*
        <Button size="small" color="primary">
          Share
        </Button>
      */}
      </CardActions>
      <Accordion style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${'https://wallpaperaccess.com/full/262055.jpg'}")`, backgroundSize: 'cover' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
          <Typography>More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <a href={certification.reference}>{certification.title}</a>
          <Image src={certification.logo} alt={certification.name} style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/>
          <p className="card-text text-muted">{certification.name}</p>
          <p className="card-text text-muted">Issued: {certification.issued_date}</p>
          <p className="card-text text-muted">Credential ID: {certification.cred_id}</p>
        </AccordionDetails>
      </Accordion>
        {/*
       <ImageList sx={{ width: 500, height: 450 }}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      */}
    </Card>
  );
};

const ExperienceTimelineItem = ({ title, duration, items, chips }) => (
  <>
    <Typography gutterBottom variant="h5" component="div">
      {title}
      <Typography variant="subtitle1" color="text.secondary" component="div">
        {duration}
      </Typography>
    </Typography>

    <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
      {items.map((item, indexItem) => (
        <li key={indexItem} style={{ marginBottom: '10px' }}>
          {item.title}
          {item.description && (
            <ul style={{ paddingLeft: '20px', marginBottom: '0' }}>
              <li>{item.description}</li>
            </ul>
          )}
        </li>
      ))}
    </ul>

<Stack direction="row" spacing={1} style={{ marginBottom: '20px' }}>
  {chips.map((chip) => (
    <Chip
      size="small"
      key={chip.key}
      label={chip.label}
      icon={<FaceIcon />}
      style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`, backgroundSize: 'cover' }}
    />
  ))}
</Stack>
  </>
);

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
];

export default CertificationCard;