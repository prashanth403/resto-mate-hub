import { Col, Container, Row } from 'react-bootstrap';

export default function About() {
  return (
    <Container>
      <Row className="align-items-center my-5 g-4">
        <Col md={6}>
          <img src="/images/restaurant.jpg" alt="Our Restaurant" className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h1>About Us</h1>
          <p>
            At Gourmet Place, we believe in simple, honest cooking. Our chefs craft seasonal menus that
            celebrate local produce and global flavors.
          </p>
          <p>
            Since 2010, we have welcomed diners with warm hospitality and memorable meals. Our team has
            earned multiple local awards for excellence in cuisine and service.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

