import React from 'react';
import {
  Box,
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MediumContent = ({ profile, blog }) => {
  const toText = (description) => {
    let tag = document.createElement("div");
    tag.innerHTML = description;
    return tag.innerText;
  };

    return (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <section id="medium">
          {!blog.isLoading ? (
            <Grid container spacing={2} justifyContent="left" alignItems="center">
              {blog.items.map((post, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card style={{ marginTop: '60px' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={'https://wallpapercave.com/wp/wp2708351.jpg'}
                        alt="Medium Image"
                      />
                      <CardContent>
                      <Typography variant="body" color="text.secondary">
                        <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                      </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">Medium`s User Profile</a>
                      </Button>
                    </CardActions>
                    <Accordion style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${'https://wallpapercave.com/wp/wp2708351.jpg'}")`, backgroundSize: 'cover' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
                        <Typography>More Information</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" color="text.secondary">
                          {/* Display the blog content */}
                          {toText(post.description.substring(0, 1000))}...
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </Box>
    );
};

export default MediumContent;
