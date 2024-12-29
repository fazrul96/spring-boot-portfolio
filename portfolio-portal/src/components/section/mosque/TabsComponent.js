import {Box, Tab} from '@mui/material';
import {TabContext, TabList} from '@mui/lab';
import DownloadPdfButton from "../../common/button/DownloadPdfButton";
import React from "react";

const TabsComponent = ({ selectedTab, handleTabChange, moduleType, t, isLoading, handleGeneratePDF, users }) => (
    <TabContext value={selectedTab}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label={t(`tabs.${moduleType}.donationManagement`)}>
                    <Tab label={t(`tabs.${moduleType}.viewDonations`)} value="1" />
                    <Tab label={t(`tabs.${moduleType}.donationAnalysis`)} value="2" />
                </TabList>
            </Box>
            <DownloadPdfButton
                isLoading={isLoading}
                handleGeneratePDF={handleGeneratePDF}
                users={users}
                t={t}
            />
        </Box>
    </TabContext>
);

export default TabsComponent;
