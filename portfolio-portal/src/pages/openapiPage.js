import React from 'react';

const OpenApiPage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const swaggerUrl = `${baseUrl}/swagger-ui.html`;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="Swagger UI"
        src={swaggerUrl}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default OpenApiPage;
