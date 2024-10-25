import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const DetailsList = ({ details }) => {
	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
	        {details.map((detail, index) => (
			    <ListItem key={index}>
			        <ListItemText primary={`${detail.label}: ${detail.value}`} />
			    </ListItem>
		    ))}
		</List>
	);
};

export default DetailsList;