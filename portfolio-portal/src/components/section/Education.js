import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const Education = ({ educations }) => {
  return (
    <Container>
      <hr className="mb-3" />
      <section id="education">
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Education</h1>
      <p className="portfolio-subheading">Here are my previous educations</p>
      <Row>
        {educations.map((education, index) => (
          <Col md={12} key={index}>
            <ul>
              <li style={{ textAlign: 'left' }}>
                {education.name} ({education.year})
                <ul>
                  <li>{education.module}</li>
                </ul>
              </li>
            </ul>
          </Col>
        ))}
      </Row>
      </section>
    </Container>
  );
};

export default Education;