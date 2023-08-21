import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faFileAlt, faChartLine, faGraduationCap, faCertificate, faTools, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const circularImageStyle = {
    width: '150px', // Adjust this to your desired size
    height: '150px', // Same value as width to maintain circular shape
    objectFit: 'cover', // To ensure the image covers the entire circle
    borderRadius: '50%', // To make it a circle
  };

  return (
    <nav id="sidebar">
      <div className="sidebar-header text-center">
        <div className="logo-container">
          <Image src="cypress-mochasome.png" roundedCircle style={circularImageStyle} />
        </div>
      </div>
      <div className="sidebar text-center">
        <h1>Fazrul Romli</h1>
      </div>
      <ul className="list-unstyled components">
        <li className="nav-item">
          <Link className="nav-link" to="#">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#portfolio">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Portfolio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#projects">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Project
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#experiences">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Experience
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#educations">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Education
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#certifications">
            <FontAwesomeIcon icon={faCertificate} className="mr-2" />
            Certification
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#Skills">
            <FontAwesomeIcon icon={faTools} className="mr-2" />
            Skill
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#contacts">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Contact
          </Link>
        </li>
      </ul>
      <div className="social-media text-center mt-4">
        <a href="https://www.linkedin.com/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-2x mr-3"></i>
        </a>
        <a href="https://www.twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
      </div>
      <div className="sidebar-footer text-center mt-4">
        <p>&copy;  Copyright Fazrul Romli @ 2023. All rights reserved.</p>
      </div>
    </nav>
  );
};

export default Sidebar;