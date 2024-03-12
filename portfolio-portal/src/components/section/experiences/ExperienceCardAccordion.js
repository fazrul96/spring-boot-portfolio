import * as React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FaceIcon from '@mui/icons-material/Face';

import ExperienceTimelineItem from '../../../components/section/experiences/ExperienceTimelineItem';

const ExperienceCardModel = ({experience}) => {
  return (
      <>
        <Accordion style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${experience.imageUrl || 'https://wallpapercave.com/wp/wp2708351.jpg'}")`, backgroundSize: 'cover' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
              <Typography>More Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {experience.items && experience.items.length > 0 && (
                <Grid container spacing={experience.items.length}>
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
                      duration="Sep 2023 - Present · 3 mos"
                      items={experience.items}
                      chips={[
                        { key: 0, label: 'Java' },
                      ]}
                    />
                    <ExperienceTimelineItem
                      title="PHP Developer"
                      duration="Dec 2022 - Sep 2023 · 10 mos"
                      items={experience.items}
                      chips={[
                        { key: 0, label: 'PHP' },
                        { key: 1, label: 'MySQL' },
                      ]}
                    />
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
        </Accordion>
      </>
  );
};

export default ExperienceCardModel;