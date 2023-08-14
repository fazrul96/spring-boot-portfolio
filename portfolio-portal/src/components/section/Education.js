import React from 'react';

const Education = () => {
  return (
    <div>
      <hr className="mb-3" />
      <section id="education">
        <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: 100 }}>Education</h1>
        <div className="row">
          <div className="col-md-12">
            <article className="work-item">
              <ul>
                <li style={{ textAlign: 'left' }}>
                  National University of Malaysia (UKM) (2015 - 2019)
                  <ul>
                    <li>Bachelor of Software Engineering (Information Systems)</li>
                  </ul>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;