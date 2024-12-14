import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Utility function to convert HTML description to text
const toText = (description) => {
	const tag = document.createElement("div");
	tag.innerHTML = description;
	return tag.innerText;
};

const BlogCard = ({ post, profileUrl }) => (
	<Card sx={{ marginTop: '60px' }}>
		<CardActionArea>
	        <CardMedia
		        component="img"
		        height="140"
		        image={post.imageUrl || 'https://wallpapercave.com/wp/wp2708351.jpg'} // Provide default image
		        alt="Medium Image"
		    />
		    <CardContent>
		        <Typography variant="body1" color="text.secondary">
		            <a href={post.link} target="_blank" rel="noopener noreferrer">
		                {post.title}
		            </a>
		        </Typography>
		    </CardContent>
		</CardActionArea>
		<CardActions>
	        <Button size="small" color="primary">
		        <a href={profileUrl} target="_blank" rel="noopener noreferrer">Medium's User Profile</a>
		    </Button>
		</CardActions>
		<BlogAccordion description={post.description} />
	</Card>
);

const BlogAccordion = ({ description }) => (
	<Accordion sx={{
		backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
		backgroundSize: 'cover'
	}}>
	<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
        <Typography>More Information</Typography>
	</AccordionSummary>
	<AccordionDetails>
        <Typography variant="body2" color="text.secondary">
	        {toText(description.substring(0, 1000))}...
	     </Typography>
	</AccordionDetails>
	</Accordion>
);

const MediumContent = ({ profile, blog }) => {
	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
	        <section id="medium">
			    {!blog.isLoading ? (
		            <Grid container spacing={2} justifyContent="left" alignItems="center">
				        {blog.items.map((post, index) => (
				            <Grid item xs={12} md={3} key={index}>
				                <BlogCard post={post} profileUrl={profile.profileUrl} />
				            </Grid>
				        ))}
			        </Grid>
			    ) : (
		            <Typography>Loading...</Typography>
			    )}
		    </section>
		</Box>
	);
};

export default MediumContent;