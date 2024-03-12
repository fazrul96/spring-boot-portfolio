import React, { useState } from 'react';
import {
  Box,
  Tab,
  Typography,
} from '@mui/material';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import GDrive from './../components/drive/gdrive/List';
import DropBox from './../components/drive/dropbox/List';

const StoragePage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '70px' }} >
      <Typography variant="h4" gutterBottom>
        Drive
      </Typography>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab icon={<AddToDriveIcon />} label="GDrive" value="gdrive" />
                <Tab icon={<DriveFolderUploadIcon />} label="DropBox" value="dropbox"  />
              </TabList>
            </Box>
            <TabPanel value="gdrive"><GDrive /></TabPanel>
            <TabPanel value="dropbox"><DropBox /></TabPanel>
        </TabContext>
    </Box>
  );
};

export default StoragePage;
