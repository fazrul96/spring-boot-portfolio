import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const Experience = ({ experiences }) => {
  return (
    <Container>
      <hr className="mb-3" />
      <section id="experience">
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Experience</h1>
      <p className="portfolio-subheading">Here are my previous experiences</p>
      <Row>
        {experiences.map((experience, index) => (
          <Col md={12} key={index}>
            <h3 style={{ textAlign: 'justify' }}>
              {experience.companyName} - {experience.role} ({experience.year})
            </h3>
            <ul>
              {experience.items.map((item, indexItem) => (
                <li key={indexItem} style={{ textAlign: 'left' }}>
                  {item.title}
                  {item.description && (
                    <ul>
                      <li>{item.description}</li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
      </section>
    </Container>
  );
};

export default Experience;