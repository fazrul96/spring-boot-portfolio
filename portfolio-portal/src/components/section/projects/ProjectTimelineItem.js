import * as React from 'react';
import {
  Chip,
  Stack,
  Typography
} from '@mui/material';

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

const ExperienceTimelineItem = ({ list, title, description, chips }) => {
  return (
    <>
        <Typography gutterBottom variant="h5" component="div">
          {title}
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {list}
          </Typography>
        </Typography>

        <ul style={{  marginBottom: '20px' }}>
          <li>{description}</li>
        </ul>
        <Stack direction="row" spacing={0.5} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {chips.map((chip) => (
            <Chip
              size="small"
              key={chip.key}
              label={chip.label}
              icon={<ScatterPlotIcon />}
              style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))`, backgroundSize: 'cover' }}
            />
          ))}
        </Stack>
    </>
  );
};

export default ExperienceTimelineItem;