import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from 'react-bootstrap';

function ExperienceLists({ experiences }) {
  return (
    <Row>
        {/* <div class="container">
            <div class="row">
                <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up">
                <h3 class="resume-title">Sumary</h3>
                <div class="resume-item pb-0">
                    <h4>Alex Smith</h4>
                    <p><em>Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.</em></p>
                    <ul>
                    <li>Portland par 127,Orlando, FL</li>
                    <li>(123) 456-7891</li>
                    <li>alice.barkley@example.com</li>
                    </ul>
                </div>

                <h3 class="resume-title">Education</h3>
                <div class="resume-item">
                    <h4>Master of Fine Arts &amp; Graphic Design</h4>
                    <h5>2015 - 2016</h5>
                    <p><em>Rochester Institute of Technology, Rochester, NY</em></p>
                    <p>Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend</p>
                </div>
                <div class="resume-item">
                    <h4>Bachelor of Fine Arts &amp; Graphic Design</h4>
                    <h5>2010 - 2014</h5>
                    <p><em>Rochester Institute of Technology, Rochester, NY</em></p>
                    <p>Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila</p>
                </div>
                </div>
                <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <h3 class="resume-title">Professional Experience</h3>
                <div class="resume-item">
                    <h4>Senior graphic design specialist</h4>
                    <h5>2019 - Present</h5>
                    <p><em>Experion, New York, NY </em></p>
                    <ul>
                    <li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>
                    <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. </li>
                    <li>Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design</li>
                    <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>
                    </ul>
                </div>
                <div class="resume-item">
                    <h4>Graphic design specialist</h4>
                    <h5>2017 - 2018</h5>
                    <p><em>Stepping Stone Advertising, New York, NY</em></p>
                    <ul>
                    <li>Developed numerous marketing programs (logos, brochures,infographics, presentations, and advertisements).</li>
                    <li>Managed up to 5 projects or tasks at a given time while under pressure</li>
                    <li>Recommended and consulted with clients on the most appropriate graphic design</li>
                    <li>Created 4+ design presentations and proposals a month for clients and account managers</li>
                    </ul>
                </div>
                </div>
            </div>
        </div> */}
        {experiences.map((experience, index) => (
            <Col md={12} key={index}>
                <Card style={{ marginBottom: '20px' }}>
                    {/* <Card.Img variant="top" src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg" /> */}
                    <Card.Body>
                    <Card.Title>
                        <h3 style={{ textAlign: 'justify' }}>
                            {experience.companyName} - {experience.role} ({experience.year})
                        </h3>
                    </Card.Title>
                    <Card.Text>
                    <ul>
                        {experience.items.map((item, indexItem) => (
                            <li key={indexItem} style={{ textAlign: 'left' }}>
                            {item.title}
                            {item.description && (
                                <ul>
                                <li>{item.description}</li>
                                </ul>
                            )}
                            </li>
                        ))}
                    </ul>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
  );
}

export default ExperienceLists;