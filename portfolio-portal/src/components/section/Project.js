import React from 'react';
import videoFile from '../../assets/video/Project.mp4';

const Project = () => {
  return (
    <div>
      <hr className="mb-3" />
      <section id="project" className="pb-5">
        <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: 100 }}>Projects</h1>
        <div className="row mb-4">
          <article className="col-4 col-xs-12 work-item">
            <div className="card">
              <img src="https://th.bing.com/th/id/R.3548e421c01b0f748bff76499bc26601?rik=2VM1RoPhaP%2f52w&riu=http%3a%2f%2fdarrenstephenson.ie%2fwp-content%2fuploads%2f2015%2f03%2flaravel-logo.png&ehk=jLAh49QKn3bN%2fSAYBiw%2foznFMvmLKdLV8DTiwMJc3vg%3d&risl=&pid=ImgRaw&r=0" alt="Laravel Framework" className="card-img-top" />
              <div className="card-body" style={{ height: 200 }}>
                <h5 className="card-title">
                  <a href="./pages/web-development-page.html" target="_blank">Web Development - Laravel Project</a>
                </h5>
                <p className="card-text">Status: Still in development</p>
              </div>
              <div className="card-footer">
                <a data-toggle="modal" data-target="#intelligentfood" className="btn btn-primary">More Details</a>
              </div>
            </div>
          </article>

          <article className="col-4 col-xs-12 work-item">
            <div className="card">
              <img src="https://getwallpapers.com/wallpaper/full/b/2/0/491662.jpg" alt="Java Framework" className="card-img-top"/>
              <div className="card-body" style={{ height: 200 }}>
                <h5 className="card-title">
                  <a href="./pages/eclipse-page.html" target="_blank">University Eclipse Collection - Java Project</a>
                </h5>
                <p className="card-text">Status: Still in development</p>
              </div>
              <div className="card-footer">
                <a data-toggle="modal" data-target="#intelligentfood" className="btn btn-primary">More Details</a>
              </div>
            </div>
          </article>
          
          <article className="col-4 col-xs-12 work-item">
            <div className="card">
              <img src="https://images.squarespace-cdn.com/content/v1/5f031aa98cea4c639ef3f14f/1628960759502-QD0B2LMTGQHDAAC3DY42/Unity.jpeg" alt="Unity Framework" className="card-img-top"/>
              <div className="card-body" style={{ height: 200 }}>
                <h5 className="card-title">
                  <a href="./pages/unity-page.html" target="_blank">3D Game - Unity Project</a>
                </h5>
                <p className="card-text">Status: Still in development</p>
              </div>
              <div className="card-footer">
                <a data-toggle="modal" data-target="#intelligentfood" className="btn btn-primary">More Details</a>
              </div>
            </div>
          </article>
        </div>

        <div className="row mb-4">
          <article className="col-6 col-xs-12 work-item">
            <div className="card">
              <img src="https://miro.medium.com/max/3960/1*taf9WHc3BPmhbxyKEu2jIg.png" alt="Python Framework" className="card-img-top"/>
              <div className="card-body" style={{ height: 200 }}>
                <h5 className="card-title">
                  <a href="./pages/python-page.html" target="_blank">Python Assessment - Python Project</a>
                </h5>
                <p className="card-text">Status: Still in development</p>
              </div>
              <div className="card-footer">
                <a data-toggle="modal" data-target="#intelligentfood" className="btn btn-primary">More Details</a>
              </div>
            </div>
          </article>
          
          <article className="col-6 col-xs-12 work-item">
            <div className="card">
              <img src="https://blog.aspiresys.com/wp-content/uploads/2017/12/shutterstock_727680178.jpg" alt="Automation Framework" className="card-img-top" style={{ height: 280 }}/>
              <div className="card-body" style={{ height: 200 }}>
                <h5 className="card-title">
                  <a href="./pages/automation-page.html" target="_blank">Automated Testing Framework Implementation</a>
                </h5>
                <p className="card-text">Status: Still in development</p>
              </div>
              <div className="card-footer">
                <a data-toggle="modal" data-target="#intelligentfood" className="btn btn-primary">More Details</a>
              </div>
            </div>
          </article>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <h3 className="text-center font-weight-bold mt-5">Preview</h3>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center">
            <video controls width="480" height="270" loop>
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;