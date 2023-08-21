import React from 'react';
import resume from '../../../src/assets/img/resume.png';
import {Col, Container, Image, Row} from 'react-bootstrap';

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
      <Row>
          <Col xs={6} md={4}>
              <Image src="cypress-mochasome.png" thumbnail/>
              {/* <Image src="cypress-mochasome.png" style={{width: '350px', height: '200px', objectFit: 'scale-down'}}/> */}
          </Col>
          <Col xs={6} md={4}>
            <p className="portfolio-description">
              I am a Software Developer with 4+ years of experience, specializing in the Laravel framework and web development projects. I constantly update and improve my projects for future reference.
              As a highly skilled and innovative professional, I excel at prioritizing tasks, resolving technical issues, and delivering exceptional results. Feel free to explore my project collection and contact me if you have any questions or need assistance.
            </p>
          </Col>
      </Row>
      <a className="portfolio-button" data-toggle="modal" data-target="#resume">Learn More</a>

      {/* Resume Modal */}
      <div className="modal fade" id="resume" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">RESUME</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="resume-download">
                <a href={resume} download="FazrulRomliResume.pdf">Download Resume</a>
              </p>
              <img className="img-fluid resume-image" src={resume} alt="Resume" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      </section>
    </Container>
  );
};

export default Portfolio;