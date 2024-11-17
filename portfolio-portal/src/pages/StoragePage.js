import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { STORAGE_TABS } from './../data/storageTabs';

const StoragePage = () => {
    const [value, setValue] = useState(STORAGE_TABS[2].value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 3, marginTop: '70px' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Cloud Storage Tabs">
                        {STORAGE_TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                icon={tab.icon}
                                label={tab.label}
                                value={tab.value}
                            />
                        ))}
                    </TabList>
                </Box>
                {STORAGE_TABS.map((tab) => (
                    <TabPanel key={tab.value} value={tab.value}>
                        {tab.component}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
};

export default StoragePage;