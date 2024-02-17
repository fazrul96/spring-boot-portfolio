import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

const BlogDetailPage = () => {
  const { id, chapter } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    // For demonstration purposes, manually setting a placeholder data
    setBlogData({
      id: 'tog',
      title: 'Placeholder Title',
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
        <section id="blog">
        <Grid container spacing={2} justifyContent="left" alignItems="center">
            <div style={{ marginTop: '100px' }}>
              <h1>{blogData.title} Detail Page</h1>
              {chapter && <p>Chapter: {chapter}</p>}
              <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
              <p>Published {blogData.timeAgo}</p>
              <ul>
                {blogData.chapters.map((ch, index) => (
                  <li key={index}>
                    <Link to={`/blog/${blogData.id}/chapter/${ch}`}>{ch}</Link>
                  </li>
                ))}
              </ul>
              {/* Add more details here */}
            </div>
        </Grid>
        </section>
    </Box>
  );
};

export default BlogDetailPage;
