import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid } from '@mui/material';

const cardStyles = {
  completed: { color: 'green' },
  testing: { color: '#b8860b' },
  development: { color: 'blue' },
  pending: { color: 'red' },
};

const cardsData = [
  {
    id: 1,
    status: "Completed",
    title: 'Cypress',
    description: 'Description for Cypress',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:713/1*kQoWz5i50D9R8IlCtWAvdw.png',
    onClick: () => window.open(process.env.REACT_APP_CYPRESS_URL, '_blank'),
  },
  {
    id: 2,
    status: "Testing",
    title: 'Jenkins',
    description: 'Description for Jenkins',
    imageUrl: 'https://media.licdn.com/dms/image/C5612AQEjVEGEpTu6qg/article-cover_image-shrink_600_2000/0/1535449639610?e=2147483647&v=beta&t=HH2FtY2XGClmpqfoEY8rFHePGwNb72FrzcvEbrFXnpw',
    onClick: () => window.open(process.env.REACT_APP_JENKINS_URL, '_blank'),
  },
  {
    id: 3,
    status: "Development",
    title: 'MinIO',
    description: 'Description for MinIO',
    imageUrl: 'https://th.bing.com/th/id/OIP.FZaTfocOgKvX0uXOXQ1i2wAAAA?rs=1&pid=ImgDetMain',
    onClick: () => window.open(process.env.REACT_APP_S3_URL, '_blank'),
  },
  {
    id: 4,
    status: "Completed",
    title: 'SonarQube',
    description: 'Description for SonarQube',
    imageUrl: 'https://blog.pirago.vn/content/images/2021/08/sonarqube-share.png',
    onClick: () => window.open(process.env.REACT_APP_SONARQUBE_URL, '_blank'),
  },
  {
    id: 5,
    status: "Pending",
    title: 'Grafana',
    description: 'Description for Grafana',
    imageUrl: 'https://th.bing.com/th/id/OIP.bOoQ_Hc-xd_Pf7UUoy6vkQHaEK?w=1024&h=576&rs=1&pid=ImgDetMain',
    onClick: () => window.open(process.env.REACT_APP_GRAFANA_URL, '_blank'),
  },
];


const SpacePage = () => {
console.log(process.env)
  return (
    <Box sx={{ flexGrow: 1, padding: 2, marginTop: '70px' }}>
      <section id="space">
        <Typography variant="h4" gutterBottom>
          DevOps
        </Typography>
        <Grid container spacing={1}>
          {cardsData.map((card, index) => (
            <Grid item xs={3} m key={index}>
              <Card>
                <CardActionArea onClick={card.onClick}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.imageUrl}
                    alt="Card Image"
                  />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                      <Typography variant="body2" style={cardStyles[card.status.toLowerCase()]}>{card.status}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={card.onClick}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </Box>
  );
};

export default SpacePage;
