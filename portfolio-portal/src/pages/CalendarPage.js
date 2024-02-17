import React from 'react';
import { Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
//import 'react-big-calendar/lib/sass/styles.css';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const CalendarPage = (props) => {
  // Replace the empty string with your array of events
  const events = [
    {
      title: 'Event 1',
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 2),
    },
    // Add more events as needed
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Calendar
          localizer={localizer}
          events={events} // Pass the events array
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
