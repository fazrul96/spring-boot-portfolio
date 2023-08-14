import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
      <div className="container">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* Left Links */}
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            {/* ... Add other links */}
          </ul>
          <ul className="navbar-nav">
            {/* Right Links */}
            <li className="nav-item">
              <a href="https://www.linkedin.com/in/fazrul-romli-79138415b/" className="nav-link" target="_blank">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
            {/* ... Add other social links */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;