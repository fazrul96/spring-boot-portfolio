import {Col, Container, Image, Row} from 'react-bootstrap';
import cypressImage from '../../../assets/img/cypress-mochasome.png';

function Shape() {
    const circularImageStyle = {
        width: '150px', // Adjust this to your desired size
        height: '150px', // Same value as width to maintain circular shape
        objectFit: 'cover', // To ensure the image covers the entire circle
        borderRadius: '50%', // To make it a circle
    };
    
  return (
    <Container>
        <Row>
            <Col xs={6} md={4}>
                <Image src="logo192.png" rounded style={circularImageStyle} />
            </Col>
            <Col xs={6} md={4}>
                <Image src={cypressImage} roundedCircle style={circularImageStyle} />
            </Col>
            <Col xs={6} md={4}>
                <Image src={cypressImage} thumbnail />
            </Col>
        </Row>
  </Container>
  );
}

export default Shape;