import React, { useState } from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';

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

        <div className="row wow fadeIn">
          <div id="carousel-tool-1z" className="carousel slide carousel-fade" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carousel-tool-1z" data-slide-to="0" className="active"></li>
              <li data-target="#carousel-tool-1z" data-slide-to="1"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <div className="view">
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
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-caption">

                </div>
              </div>
              <div className="carousel-item">
                <div className="view">
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
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKKAKw5S3n-Vf-LuYCbGLuhhsM9JbFhe_UybhT7TP32hl2RVZU&usqp=CAU" alt="" style={{width: '250px', height: '200px', objectFit: 'scale-down'}}/>
                                <p className="card-text"><span style={{ color: 'gray' }}>VMware Workstation 15</span></p>
                              </div>
                              <div className="card-footer text-center">
                                <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                              </div>
                            </div>
                          </div>
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-caption">

                </div>
              </div>
              <div className="carousel-item">
                <div className="view">
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
                                <p className="card-text"><img src="data:image/png;base64,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" alt=""/></p>
                                <p className="card-text"><span style={{ color: 'gray' }}>Computer Program</span></p>
                              </div>
                              <div className="card-footer text-center">
                                <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                              </div>
                            </div>
                          </div>
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                                <p className="card-text"><img src="data:image/jpeg;base64,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" alt=""/></p>
                                <p className="card-text"><span style={{ color: 'gray' }}>System Software</span></p>
                              </div>
                              <div className="card-footer text-center">
                                <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                              </div>
                            </div>
                          </div>
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                                <p className="card-text"><img src="data:image/png;base64,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" alt=""/></p>
                                <p className="card-text"><span style={{ color: 'gray' }}>RDMS</span></p>
                              </div>
                              <div className="card-footer text-center">
                                <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                              </div>
                            </div>
                          </div>
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
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
                                <p className="card-text"><img src="https://seeklogo.net/wp-content/uploads/2012/03/mysql-vector1.jpg" alt=""/></p>
                                <p className="card-text"><span style={{ color: 'gray' }}>System Software</span></p>
                              </div>
                              <div className="card-footer text-center">
                                <a href="#" className="btn btn-primary btn-sm"><i className="fas fa-angle-double-right"></i> Hover for more information</a>
                              </div>
                            </div>
                          </div>
                          <div className="backside">
                            <div className="card">
                              <div className="card-body text-center mt-4">
                                <p className="card-text"><i className="icon solid fa-map"></i> Google Map</p>
                                <p> Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-caption">

                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carousel-tool-1z" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carousel-tool-1z" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Skills;