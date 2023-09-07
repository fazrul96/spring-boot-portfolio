import React, { useState, useEffect } from 'react';

import { Image } from 'react-bootstrap';
import { Row, Col, Card, Button, Modal, Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { CDBIframe } from 'cdbreact';
import { fetchVideo } from '../../../services/ProjectServices';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperElements = ({projects}) => {
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
        <Swiper
            style={{ marginBottom: '20px' }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            autoplay={{
                delay: 3000, // Delay between slides in milliseconds (3 seconds in this example)
                disableOnInteraction: false, // Set to false if you want autoplay to continue even when a user interacts with the Swiper
            }}
        >
            {projects.map((project, index) => (
                <SwiperSlide key={index}>
                    <Card>
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
                            <Row>
                            <Col md={5}>
                                <ul className="list-unstyled">
                                {/* {project.items.map((item, indexItem) => ( */}
                                {project.items.slice(0, Math.ceil(project.items.length / 2)).map((item, indexItem) => (
                                    <li key={indexItem} style={{ textAlign: 'left' }}>
                                    <a href={item.reference} target="_blank" rel="noopener noreferrer">
                                        {item.title}
                                    </a>
                                    </li>
                                ))}
                                </ul>
                            </Col>
                            <Col md={6}>
                                <ul className="list-unstyled">
                                    {project.items.slice(Math.ceil(project.items.length / 2)).map((item, indexItem) => (
                                    <li key={indexItem} style={{ textAlign: 'left' }}>
                                        <a href={item.reference} target="_blank" rel="noopener noreferrer">
                                        {item.title}
                                        </a>
                                        <span className="favorite-star" style={{ color: 'gold', marginLeft: '10px' }}>
                                        {((index === 0 && indexItem === 0) || (index === 4 && indexItem === 0)) && <FontAwesomeIcon icon={faStar} />}
                                        </span>
                                    </li>
                                    ))}
                                </ul>
                            </Col>
                            </Row>
                        </Card.Body>
                        <div className="card-footer">
                            <Button variant="primary" onClick={() => handleShow(index)}>
                            More Details
                            </Button>
                        </div>
                        </div>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
        <Card>
            <Card.Body>
                <Card.Title>
                    Preview
                </Card.Title>
                <Card.Text>
                    {videoProjects.map((project, index) => (
                        <CDBIframe src={project.path} key={index}  />
                    ))}   
                </Card.Text>
            </Card.Body>    
        </Card>
    </Container>
  );
};

export default SwiperElements;