import React, { useState, useEffect } from 'react';
import { fetchVideo } from '../../services/ProjectServices';

const Project = ({ projects }) => {
  const [videoProjects, setVideoProjects] = useState([]);

  useEffect(() => {
    async function fetchData(fetchFunction, setDataFunction) {
      try {
        const data = await fetchFunction();
        setDataFunction(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(fetchVideo, setVideoProjects);
  }, []);

  return (
    <div>
      <hr className="mb-3" />
      <section id="project" className="pb-5">
        <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: 100 }}>Projects</h1>
        <div className="project-list">
          <div className="row mb-4">
            {projects.map((project) => (
                <article className="col-4 col-xs-12 work-item">
                  <div className="card">
                    <div key={project.id} className="project-item">
                      <img src={project.img} alt={project.description} className="card-img-top" />
                      <div className="card-body" style={{ height: 200 }}>
                        <h5 className="card-title">
                          <a href={project.reference} target="_blank">{project.title}</a>
                        </h5>
                        <p className="card-text">{project.status}</p>
                      </div>
                      <div className="card-footer">
                        <a data-toggle="modal" data-target={project.footer} className="btn btn-primary">More Details</a>
                      </div>
                    </div>
                  </div>
                </article>
            ))}
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <h3 className="text-center font-weight-bold mt-5">Preview</h3>
            </div>
            {videoProjects.map((project) => (
              <div className="col-12 d-flex justify-content-center align-items-center">
                <video controls width="480" height="270" loop>
                  <source src={project.path} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;