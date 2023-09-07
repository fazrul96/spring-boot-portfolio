import React from 'react';
import {Col, Image, Row, Card} from 'react-bootstrap';

const PortfolioContent = () => {
  return (
    <Card>
        <Card.Body>
            <Card.Text>
            <div class="container">
                <div class="section-title">
                <h2>About</h2>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>
                <div class="row">
                <div class="col-lg-4 aos-init aos-animate" data-aos="fade-right">
                    <img src="assets/img/profile-img.jpg" class="img-fluid" alt=""></img>
                </div>
                <div class="col-lg-8 pt-4 pt-lg-0 content aos-init aos-animate" data-aos="fade-left">
                    <h3>UI/UX Designer &amp; Web Developer.</h3>
                    <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                    </p>
                    <div class="row">
                    <div class="col-lg-6">
                        <ul>
                        <li><i class="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>1 May 1995</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+123 456 7890</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>City:</strong> <span>New York, USA</span></li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <ul>
                        <li><i class="bi bi-chevron-right"></i> <strong>Age:</strong> <span>30</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Master</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>PhEmailone:</strong> <span>email@example.com</span></li>
                        <li><i class="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                        </ul>
                    </div>
                    </div>
                    <p>
                    Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.
                    Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
                    </p>
                </div>
                </div>
            </div>
            <Row>
                <Col xs={6} md={6}>
                    <Image src="cypress-mochasome.png" thumbnail/>
                    {/* <Image src="cypress-mochasome.png" style={{width: '350px', height: '200px', objectFit: 'scale-down'}}/> */}
                </Col>
                <Col xs={6} md={6}>
                <p className="portfolio-description">
                    I am a Software Developer with 4+ years of experience, specializing in the Laravel framework and web development projects. I constantly update and improve my projects for future reference.
                    As a highly skilled and innovative professional, I excel at prioritizing tasks, resolving technical issues, and delivering exceptional results. Feel free to explore my project collection and contact me if you have any questions or need assistance.
                </p>
                </Col>
            </Row>
            </Card.Text>
            <a className="portfolio-button" data-toggle="modal" data-target="#resume">Learn More</a>
        </Card.Body>    
    </Card>
  );
};

export default PortfolioContent;