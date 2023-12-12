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

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

const ProjectCard = ({ project }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={project.img || 'https://wallpapercave.com/wp/wp2708351.jpg'}
          alt="Project Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.description}
            <Stack direction="row" spacing={1}>
                <Chip
                  variant="outlined"
                  size="small"
                  label={project.title}
                  style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1)), url("${project.img}")`,
                    backgroundSize: 'cover',
                  }}
                />
            </Stack>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.status}
          </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.footer}
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
      <Accordion style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${project.imageUrl || 'https://wallpapercave.com/wp/wp2708351.jpg'}")`, backgroundSize: 'cover' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
          <Typography>More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default ProjectCard;