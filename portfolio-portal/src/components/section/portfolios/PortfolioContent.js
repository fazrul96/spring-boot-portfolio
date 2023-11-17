import React from 'react';
import {Col, Image, Row, Card} from 'react-bootstrap';
import Filepond from '../../../components/filepond/Filepond';
import profileImage from '../../../assets/img/profile-img.jpg';

const PortfolioContent = () => {
    const details = [
        { label: 'Birthday', value: '16 May 1996' },
        { label: 'Website', value: 'https://portfolio.mfzrl.cyou/' },
        { label: 'City', value: 'Dengkil, Selangor, Malaysia' },
        { label: 'Age', value: '27' },
        { label: 'Degree', value: 'Degree' },
        { label: 'Email', value: 'mfazrul07@gmail.com' },
        { label: 'Freelance', value: 'Available' },
    ];

  return (
    <Card>
        <Card.Body>
            <Card.Text>
            <Row>
                <Col xs={4} md={4}>
                {/* <Filepond /> */}
                    {/* <Image src={profileImage} thumbnail /> */}
                    <Image src={profileImage} style={{width: '450px', height: '450px', objectFit: 'scale-down'}}/>
                </Col>
                <Col xs={8} md={8}>
                    <h3>Software Devloper</h3>
                    <p className="portfolio-description">
                        I am a Software Developer with 4+ years of experience, specializing in the Laravel framework and web development projects. I constantly update and improve my projects for future reference.
                        As a highly skilled and innovative professional, I excel at prioritizing tasks, resolving technical issues, and delivering exceptional results. Feel free to explore my project collection and contact me if you have any questions or need assistance.
                    </p>
                    <Row>
                        {details.map((detail, index) => (
                            <Col xs={6} md={6} key={index}>
                                <li>
                                    <i className="bi bi-chevron-right"></i> <strong>{detail.label}:</strong> <span>{detail.value}</span>
                                </li>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            </Card.Text>
            <a className="portfolio-button" data-toggle="modal" data-target="#resume">Learn More</a>
        </Card.Body>    
    </Card>
  );
};

export default PortfolioContent;