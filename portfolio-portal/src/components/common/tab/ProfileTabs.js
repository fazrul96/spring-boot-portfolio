import React from 'react';
import {Tab, Tabs} from '@mui/material';

const ProfileTabs = ({ tabs, activeTab, onTabChange }) => (
    <Tabs value={activeTab} onChange={onTabChange} centered>
        {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
        ))}
    </Tabs>
);

export default ProfileTabs;
