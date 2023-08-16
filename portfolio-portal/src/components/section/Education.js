import React, { useState, useEffect } from 'react';
import { fetch } from '../../services/EducationServices';

const Education = () => {
  const [educations, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData(fetchFunction, setDataFunction) {
      try {
        const data = await fetchFunction();
        setDataFunction(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(fetch, setProjects);
  }, []);

  return (
    <div>
      <hr className="mb-3" />
      <section id="education">
        <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: 100 }}>Education</h1>
        <div className="row">
          {educations.map((education) => (
            <div className="col-md-12" key={education.id}>
              <article className="work-item">
                <ul>
                  <li style={{ textAlign: 'left' }}>
                    {education.name} ({education.year})
                    <ul>
                      <li>{education.module}</li>
                    </ul>
                  </li>
                </ul>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Education;