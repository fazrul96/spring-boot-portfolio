import React from 'react';
import { Container } from 'react-bootstrap';
import EducationLists from '../../../components/section/educations/EducationLists';

const Education = ({ educations }) => {
  return (
    <Container>
      <section id="education">
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Education</h1>
      <p className="portfolio-subheading">Here are my previous educations</p>
      <EducationLists educations={educations} id="educations" />
      </section>
      <hr className="mb-3" />
    </Container>
  );
};

export default Education;