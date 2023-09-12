import React from 'react';
import { Container } from 'react-bootstrap';
import ExperineceLists from '../../../components/section/experiences/ExperienceLists';

const Experience = ({ experiences }) => {
  return (
    <Container>
      <section id="experience">
        <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Experience</h1>
        <p className="portfolio-subheading">Here are my previous experiences</p>
        <ExperineceLists experiences={experiences} id="experiences" />
      </section>
      <hr className="mb-3" />
    </Container>
  );
};

export default Experience;