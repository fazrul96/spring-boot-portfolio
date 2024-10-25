import React, { useState } from 'react';
import { Box, Tab, Typography } from '@mui/material';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import GDrive from './../components/drive/gdrive/List';
import DropBox from './../components/drive/dropbox/List';

const TABS = {
	GDRIVE: 'gdrive',
	DROPBOX: 'dropbox',
};

const StoragePage = () => {
	const [value, setValue] = useState(TABS.GDRIVE);

	const handleChange = (event, newValue) => {
        setValue(newValue);
    };

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }} style={{ marginTop: '70px' }}>
	        <Typography variant="h4" gutterBottom>
		        Drive
		    </Typography>
		    <TabContext value={value}>
			    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			        <TabList onChange={handleChange} aria-label="Drive Storage Tabs">
			            <Tab icon={<AddToDriveIcon />} label="GDrive" value={TABS.GDRIVE} />
			            <Tab icon={<DriveFolderUploadIcon />} label="DropBox" value={TABS.DROPBOX} />
			        </TabList>
			    </Box>
			    <TabPanel value={TABS.GDRIVE} aria-labelledby="gdrive-tab">
			        <GDrive />
			    </TabPanel>
			    <TabPanel value={TABS.DROPBOX} aria-labelledby="dropbox-tab">
			        <DropBox />
			    </TabPanel>
		    </TabContext>
		</Box>
	);
};

export default StoragePage;
