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
  Chip,
  Stack, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

import Filepond from '../../../components/filepond/Filepond';
import profileImage from '../../../assets/img/profile-img.jpg';
import { UserCard } from 'react-ui-cards';

const PortfolioContent = () => {
    const details = [
        { label: 'Birthday', value: '16 May 1996' },
        { label: 'Website', value: 'https://portfolio.mfzrl.cyou/' },
        { label: 'City', value: 'Dengkil, Selangor, Malaysia' },
        { label: 'Age', value: '27' },
        { label: 'Degree', value: 'Degree' },
        { label: 'Email', value: 'mfazrul07@gmail.com' },
        { label: 'Freelance', value: 'Available' },
    ];

  return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
<Card style={{ marginBottom: '20px', marginTop: '100px'}}>
        <CardActionArea>
          <UserCard
              float
              href='https://github.com/fazrul96'
              header={profileImage}
              avatar={profileImage}
              name='Fazrul Romli'
              positionName='Software Developer'
          />
{/*
          <CardMedia
            component="img"
            height="140"
            image={'https://wallpapercave.com/wp/wp2708351.jpg'}
            alt="Experience Image"
          />
 */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {/* <Filepond /> */}
                {/* <Image src={profileImage} thumbnail />
                    <Image src={profileImage} style={{width: '450px', height: '450px', objectFit: 'scale-down'}}/>
                */}
                <h3>Software Devloper</h3>
                <p className="portfolio-description">
                    Greetings! I'm Fazrul Romli, a Software Developer with over 4 years of hands-on experience. My journey into the world of coding started in 2012 when I decided to create custom Tumblr themes, and since then, I've embraced various roles in the field of web development.
                    Throughout my career, I've had the privilege of contributing my skills to diverse projects, ranging from advertising agencies to start-ups, student-led design studios, and large corporations. Currently, I'm passionately leading projects and building products for clients at Upstatement.
                    My expertise lies in the Laravel framework, and I'm dedicated to constantly updating and improving my projects for future reference. As a highly skilled and innovative professional, I excel in prioritizing tasks, resolving technical challenges, and delivering exceptional results.
                    Outside the world of coding, you'll find me scaling rock walls, spending quality time with my wife and two cats, or embarking on adventures in Hyrule in search of elusive Korok seeds.
                    Feel free to explore my project collection, and don't hesitate to reach out if you have any questions or need assistance.
                </p>
              <Typography gutterBottom variant="h6" component="div">
                  {details.map((detail, index) => (
                      <li>
                          <i className="bi bi-chevron-right"></i> <strong>{detail.label}:</strong> <span>{detail.value}</span>
                      </li>
                  ))}

              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <a className="portfolio-button" data-toggle="modal" data-target="#resume">Learn More</a>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Box>
  );
};

const details = [
    { label: 'Birthday', value: '16 May 1996' },
    { label: 'Website', value: 'https://portfolio.mfzrl.cyou/' },
    { label: 'City', value: 'Dengkil, Selangor, Malaysia' },
    { label: 'Age', value: '27' },
    { label: 'Degree', value: 'Degree' },
    { label: 'Email', value: 'mfazrul07@gmail.com' },
    { label: 'Freelance', value: 'Available' },
];

const chipData = [
    { label: 'Software Developer', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'Business Analyst', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'Automation', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'CI/CD', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'PHP', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'Java', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'Cypress', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'Appium', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
    { label: 'SQL', imageUrl: 'https://wallpapercave.com/wp/wp2708351.jpg' },
];

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const ComplexGrid = () => {
return(
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginTop: '100px',
        marginBottom: '20px',
        flexGrow: 1,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("${'https://getwallpapers.com/wallpaper/full/7/d/c/1172966-free-download-developer-wallpaper-hd-2560x1440-cell-phone.jpg'}")`,
        backgroundSize: 'cover',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          <UserCard
              float
              href='https://github.com/fazrul96'
              header={profileImage}
              avatar={profileImage}
              name='Fazrul Romli'
              positionName='Software Developer'
          />
          {/*
          <ButtonBase sx={{ width: 480, height: 480 }}>
            <Img alt="complex" src={profileImage} />
          </ButtonBase>
          */}
        </Grid>
        <Grid item xs={12} sm container s>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Welcome to My Web Portfolio!
              </Typography>
              <Typography variant="body2" gutterBottom>
                <p> Greetings! I'm a versatile software developer with over 4+ years of hands-on experience. Proficient in both frontend and backend technologies. With a passion for crafting seamless digital experiences, I have a rich history of success in bringing ideas to life through code. </p>
                <p> I'm a dynamic and innovative web design and development professional with over 4 years of experience across diverse industries. My expertise lies in delivering exceptional results by seamlessly combining technical prowess with superior analytical thinking skills. As a task-driven individual, I excel in prioritizing tasks, promptly identifying and resolving technical issues, and ensuring timely project completion.</p>
                <p> Feel free to explore my project collection, and don't hesitate to reach out if you have any questions or need assistance. </p>
              </Typography>
            </Grid>
            {/*
            <Grid item xs>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <StarIcon />
                          </ListItemIcon>
                          <ListItemText primary="Chelsea Otakan" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText inset primary="Eric Hoffman" />
                        </ListItemButton>
                      </ListItem>

                      {details.map((detail, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton>
                          <ListItemText inset primary={`${detail.label}: ${detail.value}`} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Typography>
              </Grid>
              */}
              <Grid item xs>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    <Stack direction="row" spacing={1}>
                      {chipData.map((chip, index) => (
                        <Chip
                          key={index}
                          variant="outlined"
                          size="small"
                          label={chip.label}
                          style={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1)), url("${chip.imageUrl}")`,
                            backgroundSize: 'cover',
                          }}
                        />
                      ))}
                    </Stack>
                </Typography>
              </Grid>
            <Grid item xs>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <a className="portfolio-button" data-toggle="modal" data-target="#resume">More details</a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <StarIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
)
};

export default ComplexGrid;