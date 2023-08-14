import React, { useState, useEffect } from 'react';
import { fetchExperiences } from '../../services/api';

const Experience = () => {
  const [experiences, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData(fetchFunction, setDataFunction) {
      try {
        const data = await fetchFunction();
        setDataFunction(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(fetchExperiences, setProjects);
  }, []);

  return (
    <div>
      <hr className="mb-3" />
      <section id="experience">
        <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: 100 }}>Experience</h1>
        <div className="row">
          {experiences.map((experience) => (
            <div className="col-md-12" key={experience.id}>
              <h3 style={{ textAlign: 'justify' }}>
                {experience.companyName} - {experience.role} ({experience.year})
              </h3>
              <ul>
                {experience.items.map((item, index) => (
                  <li key={index} style={{ textAlign: 'left' }}>
                    {item.title}
                    {item.description && (
                      <ul>
                        <li>{item.description}</li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;