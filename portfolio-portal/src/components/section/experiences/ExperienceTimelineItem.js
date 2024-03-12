import * as React from 'react';
import {
  Chip,
  Stack,
  Typography
} from '@mui/material';

import FaceIcon from '@mui/icons-material/Face';

const ExperienceTimelineItem = ({ title, duration, items, chips }) => {
  return (
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
};

export default ExperienceTimelineItem;