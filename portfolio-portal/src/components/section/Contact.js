import React from 'react';
import { Box, Grid } from '@mui/material';
import {Col, Container, Row, Image} from 'react-bootstrap';

const Contact = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <section id="contact">
        <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Contact</h1>
        <p className="contact-subheading">If you have any inquiries, please feel free to contact me:</p>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body" style={{ height: '250px' }}>
                <i className="fas fa-map-marker-alt fa-5x mb-4"></i>
                <h5 className="card-title">Location</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body" style={{ height: '250px' }}>
                <i className="fas fa-envelope fa-5x mb-4"></i>
                <h5 className="card-title">Email</h5>
                <p className="card-text">For any inquiries, send an email to:</p>
                <a href="mailto:mfazrul07@gmail.com" className="btn btn-primary btn-sm">mfazrul07@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body" style={{ height: '250px' }}>
                <i className="fas fa-comments fa-5x mb-4"></i>
                <h5 className="card-title">Social Media</h5>
                <p className="card-text">Connect with me on social media:</p>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="https://github.com/fazrul96/" target="_blank" className="btn btn-outline-dark btn-sm"><i className="fab fa-github"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.linkedin.com/in/fazrul-romli-79138415b/" target="_blank" className="btn btn-outline-dark btn-sm"><i className="fab fa-linkedin-in"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.facebook.com/muhammad.f.romli" target="_blank" className="btn btn-outline-dark btn-sm"><i className="fab fa-facebook-f"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Contact;