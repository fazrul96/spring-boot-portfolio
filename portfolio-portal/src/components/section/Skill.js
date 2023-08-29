import React, { useState } from 'react';
import {Col, Container, Image, Row, Carousel} from 'react-bootstrap';

const Skills = ({ skills }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTouchStart = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container>
      <hr className="mb-3" />
      <section id="skills">
        <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Skill</h1>
        <p className="skills-subheading">Here are some of the tools and technologies I have experience with:</p>
        <Row>
          {skills.map((skill, index) => (
            <Col md={12} key={index}>
              <h3 className="font-weight-bold" style={{ textAlign: 'left' }}>{skill.title}</h3>
                <ul className="list-unstyled" style={{ textAlign: 'left' }}>
                  {skill.name}
                </ul>
            </Col>
          ))}
        </Row>
        <hr className="mb-3" />
        <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Tool</h1>
        <Carousel>
          <Carousel.Item interval={1000}>
            <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
              <div className="col-xs-6 col-sm-3 col-md-3">
              <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          PhpStorm
                          </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          Eclipse
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>Computer program</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          <p className="card-text">Atom</p>
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          XAMPP
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>Downloadable Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          Adobe Photoshop
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          <p className="card-text">Android Studio</p>
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>System Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          <p className="card-text">Atom</p>
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKKAKw5S3n-Vf-LuYCbGLuhhsM9JbFhe_UybhT7TP32hl2RVZU&usqp=CAU" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>VMware Workstation 15</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          Microsoft Visual Studio
                        </div>
                        <div className="card-body text-center">
                          
                          <p className="card-text"><span style={{ color: 'gray' }}>Computer Program</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          Brackets
                        </div>
                        <div className="card-body text-center">
                          
                          <p className="card-text"><span style={{ color: 'gray' }}>System Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          <p className="card-text">PostgreSQL</p>
                        </div>
                        <div className="card-body text-center">
                          {/* <Image src="" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>RDMS</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className={`image-flip ${isFlipped ? 'hover' : ''}`} onTouchStart={handleTouchStart}>
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card">
                        <div className="card-header text-center">
                          <p className="card-text">MySQL</p>
                        </div>
                        <div className="card-body text-center">
                          {/* <p className="card-text"><img src="https://seeklogo.net/wp-content/uploads/2012/03/mysql-vector1.jpg" alt=""/></p> */}
                          <p className="card-text"><span style={{ color: 'gray' }}>System Software</span></p>
                        </div>
                        <div className="card-footer text-center">
                          <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
    </Container>
  );
};

export default Skills;