import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const OpenApiPage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const swaggerUrl = `${baseUrl}/swagger-ui.html`;

  const [width, setWidth] = useState('100vh');
  const [height, setHeight] = useState('100vh');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
        setWidth('53vh');
        setHeight('100vh');
      } else {
        setWidth('160vh');
        setHeight('100%');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial dimensions
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        marginTop: '70px',
        marginLeft: '10px',
        position: 'relative',
        width: width,
        height: height,
        paddingBottom: '56.25%', // 16:9 aspect ratio
        overflow: 'hidden',
        '& iframe': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0
        }
      }}
    >
      <iframe
        title="Swagger UI"
        src={swaggerUrl}
        frameBorder="0"
      />
    </Box>
  );
};

export default OpenApiPage;
