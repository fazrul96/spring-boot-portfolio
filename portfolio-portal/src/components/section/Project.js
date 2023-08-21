import React, { useState, useEffect } from 'react';
import { fetchVideo } from '../../services/ProjectServices';
import {Col, Container, Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Project = ({ projects }) => {
  const [videoProjects, setVideoProjects] = useState([]);

  useEffect(() => {
    async function fetchData(fetchFunction, setDataFunction) {
      try {
        const data = await fetchFunction();
        setDataFunction(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(fetchVideo, setVideoProjects);
  }, []);

  const [show, setShow] = useState(null);

  const handleShow = (index) => {
    setShow(index); // Set the index of the project to show its modal
  };

  const handleClose = () => {
    setShow(null); // Close the modal by setting show to null
  };

  return (
    <Container>
      <hr className="mb-3" />
      <section id="projects" className="pb-5">
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Projects</h1>
        <p className="portfolio-subheading">Explore My Projects</p>
        <div className="project-list">
          <div className="row mb-4">
            {projects.map((project, index) => (
              <Col className="col-4 col-xs-12 work-item" key={index}>
                <Card className="mb-4">
                  <div className="project-item">
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      src={project.img}
                      alt={project.description}
                      style={{ width: '350px', height: '200px', objectFit: 'scale-down' }}
                    />
                    <Card.Body>
                      <Card.Title>
                        <a href={project.reference} target="_blank" rel="noopener noreferrer">
                          {project.title}
                        </a>
                      </Card.Title>
                      <Card.Text>{project.status}</Card.Text>
                      {project.items.map((item, indexItem) => (
                        <li key={indexItem} style={{ textAlign: 'left' }}>
                          <a href={item.reference} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                          <span className="favorite-star" style={{ color: 'gold', marginLeft: '10px' }}>
                            {((index === 0 && indexItem === 0) || (index === 4 && indexItem === 0)) && <FontAwesomeIcon icon={faStar} />}
                          </span>
                        </li>
                      ))}
                    </Card.Body>
                    <div className="card-footer">
                      <Button variant="primary" onClick={() => handleShow(index)}>
                        More Details
                      </Button>
                    </div>
                  </div>
                </Card>
                <Modal 
                show={show === index}
                size="lg" centered
                onHide={handleClose} key={index}>

                  <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {project.items.map((item, indexItem) => (
                      <ul key={indexItem} style={{ textAlign: 'left' }}>
                        <h4>{item.title} </h4>
                        <li>
                          {item.description}
                        </li>
                      </ul>
                    ))}
                    </Modal.Body>
                </Modal>
              </Col>
            ))}
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <h3 className="text-center font-weight-bold mt-5">Preview</h3>
            </div>
            {videoProjects.map((project, index) => (
              <div className="col-12 d-flex justify-content-center align-items-center" key={index}>
                <video controls width="480" height="270" loop>
                  <source src={project.path} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Project;