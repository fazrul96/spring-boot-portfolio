import React from 'react';
import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
	Chip,
	Stack, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FaceIcon from '@mui/icons-material/Face';

import {Image} from 'react-bootstrap';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const CertificationCard = ({ certification }) => {
	return (
        <Card style={{ marginBottom: '20px' }}>
            <CardActionArea>
	            <CardMedia
	                component="img"
	                height="190"
	                image={'https://wallpaperaccess.com/full/262055.jpg'}
	                alt="Certification Image"
	            />
	            <CardContent>
	                <Typography gutterBottom variant="h5" component="div">
		                <a href={certification.reference}>{certification.title}</a>
		                <Typography gutterBottom variant="h6" component="div">
		                    {certification.role}
			                {/*
			                 <p className="card-text text-muted">{certification.name}</p>
			                  <p className="card-text text-muted">Issued: {certification.issued_date}</p>
			                  <p className="card-text text-muted">Credential ID: {certification.cred_id}</p>
			                  */}
		                </Typography>
	                </Typography>
		            <Typography variant="body2" color="text.secondary">
		                {certification.description}
		            </Typography>
	            </CardContent>
	        </CardActionArea>
	        <CardActions>
	            <Button size="small" color="primary" variant="contained" sx={{ marginBottom: 1 }}>
                    Share
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                    {certification.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                    Issued: {certification.issued_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Credential ID: {certification.cred_id}
                </Typography>
	        </CardActions>
	    </Card>
	);
};

export default CertificationCard;