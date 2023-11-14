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

const ExperienceCard = ({ experience }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={experience.imageUrl || 'https://wallpapercave.com/wp/wp2708351.jpg'}
          alt="Experience Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {experience.companyName}
            <Typography gutterBottom variant="h6" component="div">
                {experience.role}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {experience.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
          <Typography>More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {experience.items && experience.items.length > 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Timeline style={{ margin: '0' }}>
                  <TimelineItem style={{ marginBottom: '0' }}>
                    <TimelineSeparator>
                      <TimelineDot color="info" />
                      <TimelineConnector style={{ height: '300px', width: '2px' }} />
                    </TimelineSeparator>
                    <TimelineContent></TimelineContent>
                  </TimelineItem>
                  <TimelineItem style={{ marginBottom: '0' }}>
                    <TimelineSeparator>
                      <TimelineDot color="success" />
                    </TimelineSeparator>
                    <TimelineContent></TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Grid>
              <Grid item xs={12} md={9}>
                <ExperienceTimelineItem
                  title="Application Developer"
                  duration="Dec 2022 - Sep 2023 · 10 mos"
                  items={experience.items}
                  chips={[
                    { key: 0, label: 'React' },
                    { key: 1, label: 'JavaScript' },
                    // Add more chips as needed
                  ]}
                />
                <ExperienceTimelineItem
                  title="PHP Developer"
                  duration="Sep 2023 - Present · 3 mos"
                  items={experience.items}
                  chips={[
                    { key: 0, label: 'PHP' },
                    { key: 1, label: 'MySQL' },
                    // Add more chips as needed
                  ]}
                />
              </Grid>
            </Grid>
          )}
        </AccordionDetails>

      </Accordion>
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
        <Chip key={chip.key} label={chip.label} icon={<FaceIcon />} />
      ))}
    </Stack>
  </>
);

export default ExperienceCard;
