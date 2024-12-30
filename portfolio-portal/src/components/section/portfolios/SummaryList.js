import React from 'react';
import { Grid } from '@mui/material';
import CardItem from '../../../components/common/CardItem';

const SummaryList = ({ summaries }) => {
	return (
		<Grid
		    container
		    spacing={2}
		    justifyContent="center" // Center items horizontally
		    alignItems="center" // Center items vertically if necessary
		>
	        {summaries.map((summary, index) => (
			    <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
			        <CardItem label={summary.label} value={summary.value} />
			    </Grid>
		    ))}
		</Grid>
	);
};

export default SummaryList;