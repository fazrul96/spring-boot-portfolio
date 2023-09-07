import React from 'react';
import { Container } from 'react-bootstrap';

import PortfolioContent from '../../../components/section/portfolios/PortfolioContent';
import Resume from '../../../components/section/portfolios/Resume';

const Portfolio = () => {
  return (
    <Container>
      <hr className="mb-3" />
      <section id="portfolio" className="portfolio-section">
              
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>About</h1>
      <p className="portfolio-subheading">Welcome to my Portfolio Page</p>
      <p className="portfolio-description">
        I am a Software Developer with 4+ years of experience, specializing in the Laravel framework and web development projects. I constantly update and improve my projects for future reference.
        As a highly skilled and innovative professional, I excel at prioritizing tasks, resolving technical issues, and delivering exceptional results. Feel free to explore my project collection and contact me if you have any questions or need assistance.
      </p>
      <PortfolioContent/>
      <Resume/>

      </section>
    </Container>
  );
};

export default Portfolio;