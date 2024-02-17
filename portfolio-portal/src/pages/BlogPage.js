import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import BlogListPage from './BlogListPage';

const BlogPage = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
          <section id="blog">
          <Grid container spacing={2} justifyContent="left" alignItems="center">
              <BlogListPage />
          </Grid>
          </section>
      </Box>
  );
};

export default BlogPage;
