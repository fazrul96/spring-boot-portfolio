import * as React from 'react';
import {
  Chip,
  Stack,
  Typography
} from '@mui/material';

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

const ExperienceTimelineItem = ({ title, year, duration, items, chips }) => {
  return (
    <>
        <Typography gutterBottom variant="h5" component="div">
          {title}
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {year} ~ {duration}
          </Typography>
        </Typography>

        <ul style={{ paddingLeft: '0px', marginBottom: '20px' }}>
            {items.map((item, indexItem) => (
                <ul key={indexItem} style={{ marginBottom: '5px'}}>
                <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                    {item.title}
                </div>
                    {item.items.map((task, indexTask) => (
                        <li key={indexTask}>
                          {task.description}
                        </li>
                    ))}
                </ul>
            ))}
        </ul>
        <Stack direction="row" spacing={0.5} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {chips.map((chip) => (
            <Chip
              size="small"
              key={chip.key}
              label={chip.label}
              icon={<ScatterPlotIcon />}
              style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9))`, backgroundSize: 'cover' }}
            />
          ))}
        </Stack>
    </>
  );
};

export default ExperienceTimelineItem;