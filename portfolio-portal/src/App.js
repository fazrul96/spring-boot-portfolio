import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

import Portfolio from './components/section/Porfolio';
import Project from './components/section/Project';
import Experience from './components/section/Experience';
import Education from './components/section/Education';
import Certification from './components/section/Certification';
import Skills from './components/section/Skill';
import Contact from './components/section/Contact';

// import 'jquery/dist/jquery.min.js'; // Import jQuery
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper)

// import './assets/themes/Original-Portfolio/assets/js/util.js';
// import './assets/themes/Original-Portfolio/assets/js/util.js';

// import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import './index.css'; // Import your own global styles
import './assets/css/main.css'; // Import custom main.css

// import './assets/themes/Original-Portfolio/assets/js/jquery.poptrox.min.js';
// import './assets/themes/Original-Portfolio/assets/js/browser.min.js';
// import './assets/themes/Original-Portfolio/assets/js/breakpoints.min.js';

// import './assets/themes/Original-Portfolio/assets/js/util.js';
// import './assets/themes/Original-Portfolio/assets/js/main.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Carousel />

      <main>
        <div class="container">
          <Portfolio />
          <Project />
          <Experience />
          <Education />
          <Certification />
          <Skills />
          <Contact />
        </div>
      </main>
      
      <Footer />
      {/* Your other components and content */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;