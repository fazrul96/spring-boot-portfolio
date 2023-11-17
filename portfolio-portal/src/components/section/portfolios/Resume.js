import React from 'react';
import resume from '../../../../src/assets/img/resume.png';

const Resume = () => {
  return (
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
              <p className="resume-download">
                <a href={resume} download="FazrulRomliResume.pdf">Download Resume</a>
              </p>
              <img className="img-fluid resume-image" src={resume} alt="Resume" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Resume;