import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Dialog, DialogContent, DialogTitle,
  Typography,
  Grid,
  Chip,
  Stack
} from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ProjectTimelineItem from '../../../components/section/projects/ProjectTimelineItem';

import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';


const CustomChip = ({ label, imgUrl }) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      label={label}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))`,
        backgroundSize: 'cover',
      }}
    />
  );
}

const ProjectCard = ({ project }) => {
    const tags = project.tag[0].split(", ");
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

  return (
  <React.Fragment>
    <Card style={{ marginBottom: '20px' }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={project.img || 'https://wallpapercave.com/wp/wp2708351.jpg'}
          alt="Project Image"
        />
        <CardContent onClick={handleClickOpen('paper')} sx={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.80)), url("${project.img}")`}}>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
            <Stack direction="row" spacing={0.5} style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {tags.map((tag, index) => (
                    <CustomChip key={index} label={tag} imgUrl={project.img} />
                ))}
            </Stack>
          </Typography>
        <Typography variant="body2" color={project.status === 'Completed' ? 'green' : '#FFB81C'}>
          {project.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.list}
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Projects</DialogTitle>
        <DialogContent dividers={scroll === 'paper'} sx={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${'https://getwallpapers.com/wallpaper/full/7/d/c/1172966-free-download-developer-wallpaper-hd-2560x1440-cell-phone.jpg'}")`,
                                                         backgroundSize: 'cover'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
                <ProjectTimelineItem
                  list={project.list}
                  title={project.title}
                  description={project.description}
                  chips={[
                    ...tags.map((tag, index) => ({
                      key: index,
                      label: tag,
                      imgUrl: project.img
                    })),
                  ]}
                />
              </Grid>
            </Grid>
        </DialogContent>
      </Dialog>
  </React.Fragment>
  );
};

export default ProjectCard;