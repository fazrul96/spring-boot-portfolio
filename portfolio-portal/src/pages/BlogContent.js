import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

const BlogDetailPage = () => {
  const { id, chapter } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    // For demonstration purposes, manually setting a placeholder data
    setBlogData({
      title: 'List of image',
      image: 'https://wallpapercave.com/wp/wp2708351.jpg',
      timeAgo: 'Just now',
      chapters: ['Chapter 173', 'Chapter 172', 'Chapter 171'],
    });
  }, []); // Add dependencies if necessary

  if (!blogData) {
    // Render a loading state or handle the case where data is still loading
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <section id="blogDetail">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <div style={{ marginTop: '100px' }}>
                  <h1>{blogData.title} Detail Page</h1>
                  {chapter && <p>Chapter: {chapter}</p>}
                  <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
                </div>
            </Grid>
             <Grid container spacing={2} justifyContent="center" alignItems="center">
                <div>
                  <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
                </div>
            </Grid>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <div>
                  <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
                </div>
            </Grid>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <div>
                  <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
                </div>
            </Grid>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <div>
                  <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
                </div>
            </Grid>
        </section>
    </Box>
  );
};

export default BlogDetailPage;
