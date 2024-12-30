import React, { useState } from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const CardComponent = ({ title, category, tag, content, details }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
	    <Grid>
            <Card sx={{ marginTop: '10px' }}>
	            <CardActionArea>
		            {/*
		            <CardMedia
		              component="img"
		              image={image}
		              alt={`${title} Image`}
		              style={{ objectFit: 'cover', height: '200px' }}
		            />
		            */}
	                <CardContent>
		                <Typography gutterBottom variant="h5" component="div">
		                    <Link to={`/module/${tag}`}>{title}</Link>
			            </Typography>
			            <Typography variant="body2" color="text.secondary">{content}</Typography>
		            </CardContent>
                </CardActionArea>
                <Accordion>
	                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
		                <Typography>More Information</Typography>
		            </AccordionSummary>
		            <AccordionDetails>{details}</AccordionDetails>
	            </Accordion>
	        </Card>
	    </Grid>
    );
};

export default CardComponent;
