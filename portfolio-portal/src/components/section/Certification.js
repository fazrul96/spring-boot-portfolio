import React from 'react';

const Certification = () => {
  return (
    <div>
      <hr className="mb-3" />
      <section id="certification">
        <h1 className="text-center font-weight-bold">Certification</h1>
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
                    <div className="col-xs-12 col-sm-6 col-md-6">
                      <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                          <div className="frontside">
                            <div className="card">
                              <div className="card-header text-center">
                                <a href="http://androidatc.com/_transcript.php?action=transcript">Android Certified Application Developer</a>
                              </div>
                              <div className="card-body text-center">
                                <img src="https://androidatc.com/template/style/img/new_theme/logo.png" alt="Android ATC" className="card-img-top" />
                                <p className="card-text text-muted">Android ATC</p>
                                <p className="card-text text-muted">Issued: Oct 2017</p>
                                <p className="card-text text-muted">Credential ID: ATC1001761</p>
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
                                <p>ATC</p>
                                <p>Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6">
                      <div className="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div className="mainflip">
                          <div className="frontside">
                            <div className="card">
                              <div className="card-header text-center">
                                <a href="http://www.mstb.org/IREB.php">Certified Professional Requirements Engineer (CPRE-FL)</a>
                              </div>
                              <div className="card-body text-center">
                                <img src="https://th.bing.com/th/id/R.cd12ed352bce0c80fc5fcf5c9e81d991?rik=9WE5d%2bkNI9KbOQ&riu=http%3a%2f%2fwww.gripoprequirements.nl%2fimg%2flogo-ireb.jpg&ehk=EwXrzLBz%2btzxziwTZfDWobZqQfiu9bWESXGA2u5Jqr0%3d&risl=&pid=ImgRaw&r=0" alt="IREB" className="card-img-top"/>
                                <p className="card-text text-muted">IREB</p>
                                <p className="card-text text-muted">Issued: Jan 2017</p>
                                <p className="card-text text-muted">Credential ID: MY-CPRE-FL-2017-00007</p>
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
                                <p>IREB</p>
                                <p>Will update later</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, blanditiis deserunt eligendi ex expedita, incidunt ipsa mollitia optio quaerat qui saepe sit, vel voluptatum! Cupiditate dignissimos fuga quas quibusdam velit!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
    </div>
  );
};

export default Certification;