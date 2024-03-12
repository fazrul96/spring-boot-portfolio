import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function formatTitle(title) {
  // Split the title by hyphens
  const words = title.split('-');
  // Capitalize the first letter of each word and join them with a space
  const formattedTitle = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedTitle;
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const BlogContent = () => {
  const { alias, chapter } = useParams();
  const formattedTitle = formatTitle(alias);

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    setBlogData({
      title: 'List of image',
      image: 'https://lumitoon.com/wp-content/uploads/2024/03/LWG-107-2.jpg',
      timeAgo: 'Just now here',
      chapters: ['Chapter 173', 'Chapter 172', 'Chapter 171'],
    });
  }, []);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 5, display: 'flex', justifyContent: 'center' }} style={{ marginTop: '50px' }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component={Link}
              to={`/blog/${alias}/`}
              label={alias}
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              component={Link}
              label={`Episode ${chapter}`}
              deleteIcon={<ExpandMoreIcon />}
              onDelete={handleClick}
            />
          </Breadcrumbs>
        </div>
      <section id="blogContent">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <img src={blogData.image} alt={blogData.title} style={{ width: '100%', maxWidth: '500px' }} />
        </Grid>
      </section>
    </Box>
  );
};

export default BlogContent;
