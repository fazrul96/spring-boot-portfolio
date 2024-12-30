import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const DonationInsights = ({ data }) => {
    const totalDonations = data.reduce((sum, donation) => sum + (Number(donation.donation) || 0), 0);
    const averageDonation = data.length > 0 ? totalDonations / data.length : 0;
    const currentMonth = new Date().getMonth();
    const donationsThisMonth = data.filter(donation => new Date(donation.date).getMonth() === currentMonth)
        .reduce((sum, donation) => sum + (Number(donation.donation) || 0), 0);

    return (
        <Box sx={{ padding: 3, marginBottom: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="body1">Total Donations</Typography>
                        <Typography variant="h5" fontWeight="bold">RM {totalDonations.toFixed(2)}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="body1">Average Donation</Typography>
                        <Typography variant="h5" fontWeight="bold">RM {averageDonation.toFixed(2)}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="body1">Donations This Month</Typography>
                        <Typography variant="h5" fontWeight="bold">RM {donationsThisMonth.toFixed(2)}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DonationInsights;
