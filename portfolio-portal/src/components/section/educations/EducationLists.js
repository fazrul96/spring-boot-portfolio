import React from 'react';
import { Card, Col, Row} from 'react-bootstrap';

const EducationLists = ({ educations }) => {
  return (
    <Card>
        <Card.Body>
            <Card.Text>
            <Row>
                {educations.map((education, index) => (
                <Col md={12} key={index}>
                    <ul>
                    <li style={{ textAlign: 'left' }}>
                        {education.name} ({education.year})
                        <ul>
                        <li>{education.module}</li>
                        </ul>
                    </li>
                    </ul>
                </Col>
                ))}
            </Row>
            </Card.Text>
        </Card.Body>    
    </Card>
  );
};

export default EducationLists;