import React from 'react';

const Portfolio = () => {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="text-center">
          <h1 className="font-weight-bold">Hello, I'm Fazrul Romli</h1>
          <p>Welcome to my Portfolio Page</p>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <p className="text-justify">
              This portfolio showcases my skills and accomplishments as a Software Developer. With 4+ years of experience, I specialize in Laravel framework and enjoy working on web development projects. I'm constantly updating and improving my projects for future reference.
            </p>
            <p className="text-justify">
              I'm a highly skilled and innovative web design and development professional. I excel at prioritizing tasks, resolving technical issues, and delivering exceptional results. Feel free to explore my project collection and contact me if you have any questions or need assistance.
            </p>
            <ul className="actions justify-content-center">
              <li style={{ textAlign: 'left' }}>
                <a className="button" data-toggle="modal" data-target="#resume">Learn More</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
              <p><a href="images/resume.PNG" download="FazrulRomli">Download Resume</a></p>
              <img className="img-fluid" src="images/resume.PNG" alt="Resume" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;