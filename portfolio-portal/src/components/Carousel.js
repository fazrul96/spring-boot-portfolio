import React from 'react';

const Carousel = () => {
  return (
    <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
        <li data-target="#carousel-example-1z" data-slide-to="1"></li>
        <li data-target="#carousel-example-1z" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner" role="listbox">
        {/* First slide */}
        <div className="carousel-item active" style={{ height: '100%' }}>
          <video className="video-intro" autoPlay loop muted style={{ width: '100%', height: '100%' }}>
            <source src="https://mdbootstrap.com/img/video/Tropical.mp4" type="video/mp4" />
          </video>
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
        {/* ... Add Second slides */}
        <div className="carousel-item" style={{ height: '100%' }}>
          <div className="view">
            <video className="video-intro" autoPlay loop muted style={{ width: '100%', height: '100%' }}>
              <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
