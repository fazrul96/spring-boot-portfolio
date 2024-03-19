import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, Hidden, Typography, Tooltip } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot} from '@mui/lab';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import ExperienceTimelineItem from '../../../components/section/experiences/ExperienceTimelineItem';

const ExperienceCardModel = ({ experience, experienceItems }) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  const tags = experience.tag.split("|");
  return (
    <React.Fragment>
    <Tooltip title="View more" arrow onClick={handleClickOpen('paper')} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <div>
        {experience.role} <TrendingUpIcon style={{ transform: hover ? 'translateY(-3px)' : 'none', transition: 'transform 0.3s ease', color:'green' }} />
      </div>
    </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Experience Timeline</DialogTitle>
        <DialogContent dividers={scroll === 'paper'} sx={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${'https://getwallpapers.com/wallpaper/full/7/d/c/1172966-free-download-developer-wallpaper-hd-2560x1440-cell-phone.jpg'}")`,
                                                           backgroundSize: 'cover'}}>
          {experienceItems && experienceItems.length > 0 && (
            <Grid container spacing={2}>
              {experience.company_name === '' &&
                  <Hidden smDown mdDown>
                    <Grid item md={2}>
                      <Timeline style={{ margin: '0' }}>
                        <TimelineItem style={{ marginBottom: '0' }}>
                          <TimelineSeparator>
                            <TimelineDot color="info" />
                            <TimelineConnector style={{ height: '360px', width: '2px' }} />
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
                  </Hidden>
              }
              <Grid item xs={12} md={10}>
                <ExperienceTimelineItem
                  title={experience.role}
                  year={experience.year}
                  duration={experience.duration}
                  items={experienceItems}
                  chips={[
                      ...tags.map((tag, index) => ({
                        key: index,
                        label: tag,
                      })),
                    ]}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ExperienceCardModel;
