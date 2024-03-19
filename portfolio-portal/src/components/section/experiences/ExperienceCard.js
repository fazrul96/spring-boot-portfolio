import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import ExperienceCardModel from '../../../components/section/experiences/ExperienceCardModel';
import ExperienceCardAccordion from '../../../components/section/experiences/ExperienceCardAccordion';

const ExperienceCard = ({ experience, experienceItems }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={experience.image || 'https://wallpapercave.com/wp/wp2708351.jpg'}
          alt="Experience Image"
        />
        <CardContent sx={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95)), url("${experience.image}")`}}>
          <Typography gutterBottom variant="h5" component="div">
            {experience.company_name}
            <Typography gutterBottom variant="h6" component="div">
                <ExperienceCardModel experience={experience} experienceItems={experienceItems} />
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {experience.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/*<ExperienceCardAccordion experience={experience} />*/}
    </Card>
  );
};

export default ExperienceCard;
