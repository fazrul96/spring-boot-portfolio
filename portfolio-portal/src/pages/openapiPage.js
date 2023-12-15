import React from 'react';

const SwaggerPage = () => {
  const swaggerUrl = 'http://localhost:8080/swagger-ui.html'; // Replace with your Swagger UI URL

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

export default SwaggerPage;
