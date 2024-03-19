import React, { useState } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
const SettingPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '70px' }} >
      <Typography variant="h4" gutterBottom>
        Setting
      </Typography>
    </Box>
  );
};

export default SettingPage;
