import React from 'react';
import { Container} from 'react-bootstrap';
import ProjectLists from '../../../components/section/projects/ProjectLists';

const Project = ({projects}) => {
  return (
    <Container>
      <hr className="mb-3" />
      <section id="projects" className="pb-5">
      <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>Projects</h1>
        <p className="portfolio-subheading">Explore My Projects</p>
        <div className="project-list">
          <ProjectLists projects={projects} id="projects" />
        </div>
      </section>
    </Container>
  );
};

export default Project;