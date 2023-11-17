import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const SkillLists = ({ skills }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
        <Card.Body>
            <Card.Text>
            <Row>
                {skills.map((skill, index) => (
                <Col md={6} key={index}>
                    <ul className="list-unstyled">
                    <h3 className="font-weight-bold" style={{ textAlign: 'left' }}>{skill.title}</h3>
                    <ul className="list-unstyled" style={{ textAlign: 'left' }}>
                        {skill.name}
                    </ul>
                    </ul>
                </Col>
                ))}
            </Row>
            </Card.Text>
        </Card.Body>
    </Card>
  );
};

export default SkillLists;