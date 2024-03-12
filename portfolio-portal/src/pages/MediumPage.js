import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MediumContent from './MediumContent';

const MediumPage = () => {
  const mediumUsername = process.env.REACT_APP_MEDIUM_USERNAME;
  const mediumUrl = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40${mediumUsername}`;

  const [profile, setProfile] = useState({
    name: 'Fazrul Romli',
    profileImage: '',
    profileUrl: ''
  });
  const [blog, setBlog] = useState({
    items: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
          fetch(mediumUrl)
          .then(res => res.json())
          .then(info => {
              const image = info.feed.image;
              const link = info.feed.link;
              const blogs = info.items;
//              const posts = blogs.filter(post => post.categories.length > 0);

              setProfile(p => ({...p, profileUrl: link, profileImage: image}));
              setBlog({ items: blogs, isLoading: false, error: null });
          })

      } catch (error) {
        console.error('Error fetching Medium content:', error);
        setBlog({ items: [], isLoading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

  return (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
          <section id="medium">
          <Grid container spacing={2} justifyContent="left" alignItems="center">
              <MediumContent profile={profile} blog={blog} />
          </Grid>
          </section>
      </Box>
  );
};

export default MediumPage;
