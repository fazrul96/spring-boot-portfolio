import React, { useState } from 'react';
import {Col, Container, Row, Image} from 'react-bootstrap';

const Certification = ({ certifications }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTouchStart = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container>
      <section id="certification">
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Certification</h1>
      <p className="certification-subheading">Here are my certifications</p>
        <div className="row wow fadeIn">
          <div id="carousel-tool-1z" className="carousel slide carousel-fade" data-ride="carousel">
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li data-target="#carousel-tool-1z" data-slide-to="0" className="active"></li>
            </ol>
            {/* /.Indicators */}

            {/* Slides */}
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <div className="view">
                  <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
                    
                    {certifications.map((certification, index) => (
                      <div className="col-xs-12 col-sm-6 col-md-6" key={index}>
                        <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                          <div className="mainflip">
                            <div className="frontside">
                              <div className="card">
                                <div className="card-header text-center">
                                  <a href={certification.reference}>{certification.title}</a>
                                </div>
                                <div className="card-body text-center">
                                  <Image src={certification.logo} alt={certification.name} style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/>
                                  <p className="card-text text-muted">{certification.name}</p>
                                  <p className="card-text text-muted">Issued: {certification.issued_date}</p>
                                  <p className="card-text text-muted">Credential ID: {certification.cred_id}</p>
                                </div>
                                <div className="card-footer text-center">
                                  <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                                </div>
                              </div>
                            </div>
                            <div className="backside">
                              <div className="card">
                                <div className="card-body text-center mt-4">
                                  <i className="icon solid fa-map"></i>
                                  <p>{certification.name}</p>
                                  <p>Will update later</p>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="carousel-caption"></div>
              </div>
            </div>
            {/* /.Slides */}

            {/* Controls */}
            <a className="carousel-control-prev" href="#carousel-tool-1z" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carousel-tool-1z" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
            {/* /.Controls */}
          </div>
        </div>
      </section>
      <hr className="mb-3" />
    </Container>
  );
};

export default Certification;