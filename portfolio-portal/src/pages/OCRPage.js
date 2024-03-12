import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { FilePond } from 'react-filepond';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Swiper from '../components/Swiper';

import sampleJpg from './../assets/img/ocrSample/sampleJpg.jpg';
import samplePng from './../assets/img/ocrSample/samplePng.png';

const OCRPage = () => {
  const [ocrResult, setOcrResult] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      if (!file) {
        console.error('No file selected.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file.file); // Use file.file to get the actual file object

      const response = await fetch('http://localhost:8080/api/v1/processOCR', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        setOcrResult(result);
      } else {
        console.error('OCR process failed');
      }
    } catch (error) {
      console.error('Error during OCR process:', error.message);
    }
  };

// Format OCR result with line breaks
const formattedResult = ocrResult ? ocrResult.replace(/\n/g, '<br />') : null;

const latestUpdates = [
  {
    id: 1,
    image: sampleJpg,
    title: 'Sample JPG',
  },
  {
    id: 2,
    image: samplePng,
    title: 'Sample PNG',
  },
];

  return (
    <Grid container spacing={2}>
    {latestUpdates.map((update, index) => (
      <Grid item xs={6} md={6} key={index}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image={update.image}
              alt={update.title}
            />
          </CardActionArea>
        </Card>
      </Grid>
    ))}
      <Grid item xs={12} md={12}>
        <Card >
          <CardActionArea>
            <CardContent>
              <FilePond onupdatefiles={(fileItems) => handleFileUpload(fileItems[0])} />
              {/*
               <Button onClick={() => handleFileUpload()}>Trigger OCR</Button>
               */}
              {formattedResult && (
              <Typography variant="body1" component="div">
                <div dangerouslySetInnerHTML={{ __html: formattedResult }} />
              </Typography>
//                 <SyntaxHighlighter language="plaintext" style={vs}>
//                  {formattedResult}
//                </SyntaxHighlighter>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OCRPage;