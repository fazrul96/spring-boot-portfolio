import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Button, Box, Chip, IconButton, Typography, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { UserCard } from 'react-ui-cards';
import StarIcon from '@mui/icons-material/Star';

import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';

function formatTitle(title) {
  // Split the title by hyphens
  const words = title.split('-');
  // Capitalize the first letter of each word and join them with a space
  const formattedTitle = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedTitle;
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const BlogDetailPage = () => {
    const { alias } = useParams();
    const formattedTitle = formatTitle(alias);
    const [chapters, setChapters] = useState([]);
    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(true);

    useEffect(() => {
      const chaptersData = [
        {
          id: 1,
          chapter: 1,
          title: "Episode 1",
          image: 'https://lumitoon.com/wp-content/uploads/2024/03/LWG-107-2.jpg',
          timeAgo: 'March 1, 2024',
        },
        {
          id: 2,
          chapter: 2,
          title: "Episode 2",
          image: 'https://lumitoon.com/wp-content/uploads/2024/03/LWG-107-2.jpg',
          timeAgo: 'March 2, 2024',
        },
        {
          id: 3,
          chapter: 3,
          title: "Episode 3",
          image: 'https://lumitoon.com/wp-content/uploads/2024/03/LWG-107-2.jpg',
          timeAgo: 'March 3, 2024',
        },
        {
          id: 4,
          chapter: 4,
          title: "Episode 4",
          image: 'https://lumitoon.com/wp-content/uploads/2024/03/LWG-107-2.jpg',
          timeAgo: 'March 4, 2024',
        }
      ];

      setChapters(chaptersData);
    }, []);

  return (
  <>
  <Box style={{ marginTop: '60px', position: 'relative' }} sx={{ backgroundImage: "url('https://lumitoon.com/wp-content/uploads/2021/07/lv25.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/*
      <Box sx={{ flexGrow: 1, padding: 5, display: 'flex', justifyContent: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px' }}>
            <Typography gutterBottom variant="subtitle1" component="div">
                {formattedTitle}
            </Typography>
      </Box>
      */}
  </Box>
  <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', justifyContent: 'center' }} >
      <section id="blogDetail">
        <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Demo>
                {chapters.map((chapter, index) => (
                    <List dense={dense}>
                        <div key={index}>
                            <Link to={`/blog/${alias}/chapter/${chapter.chapter}`}>
                                 <ListItem
                                   secondaryAction={
                                     <IconButton edge="end" aria-label="chapter">
                                       #{chapter.chapter}
                                     </IconButton>
                                   }
                                 >
                                   <ListItemAvatar>
                                     <Avatar>
                                       <UserCard
                                         float
                                         header='https://lumitoon.com/wp-content/uploads/2021/07/COVER-LWG-copy.png'
                                         avatar='https://lumitoon.com/wp-content/uploads/2021/07/COVER-LWG-copy.png'
                                         name={formattedTitle}
                                         positionName='SIU'
                                     />
                                     </Avatar>
                                   </ListItemAvatar>
                                   <ListItemText
                                     primary={chapter.title}
                                     secondary={secondary ? chapter.timeAgo : null}
                                   />
                                 </ListItem>
                            </Link>
                        </div>
                    </List>
                ))}
              </Demo>
            </Grid>
            <Grid item>
              <UserCard
                  float
                  header='https://lumitoon.com/wp-content/uploads/2021/07/COVER-LWG-copy.png'
                  avatar='https://lumitoon.com/wp-content/uploads/2021/07/COVER-LWG-copy.png'
                  name={formattedTitle}
                  positionName='SIU'
              />
            </Grid>
            <Grid item xs={12} sm container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Grid item xs container direction="column" spacing={2} style={{ marginTop: '20px'}}>
                <Typography gutterBottom variant="subtitle1" component="div">
                    EVERY MONDAY
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <p> [Despair that Reaches the Skies], [Gloom trapped in a swamp], [One Who Couldn’t Be Born] and [Foolish Chaos].
                        Normal humans can only stand by and look while they lose their lives as those beings bring chaos into the world now…
                        At the end of many years of fighting, this is the last survivor’s conclusion.
                        “Inners can never win against Outers.”</p>
                    <p> At that moment, Chronos, a God that has the Divinity to control time, sacrificed himself to reverse time.
                        “We probably can’t win against them. For now.” </p>
                </Typography>
                <Link to={`/blog/${alias}/chapter/1`} >
                    <Button variant="contained" size="large">
                      First Episode
                    </Button>
                </Link>
              </Grid>
            </Grid>
        </Grid>
      </section>
    </Box>
    </>
  );
};

export default BlogDetailPage;
