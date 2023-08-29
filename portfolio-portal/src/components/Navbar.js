import React from 'react';

const Navbar = () => {
  const navLinks = [
    { href: '#', text: 'Home' },
    { href: '#portfolio', text: 'Portfolio' },
    { href: '#project', text: 'Project' },
    { href: '#experience', text: 'Experience' },
    { href: '#education', text: 'Education' },
    { href: '#certification', text: 'Certification' },
    { href: '#skills', text: 'Skills' },
    { href: '#contact', text: 'Contact' }
  ];

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
          {navLinks.map((link, index) => (
            <li className="nav-item" key={index}>
              <a className="nav-link" href={link.href}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="https://www.linkedin.com/in/fazrul-romli-79138415b/" className="nav-link" target="_blank">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="mailto:mfazrul07@gmail.com" className="nav-link" target="_blank">
                <i className="fa fa-envelope"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="http://github.com/fazrul96/" className="nav-link" target="_blank">
                <i className="fa fa-github mr-2"></i>GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;