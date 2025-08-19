import { Col, Container, Row } from 'react-bootstrap';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  { name: 'Alex P.', message: 'The best dining experience I have had this year!', rating: 5 },
  { name: 'Maria G.', message: 'Beautiful ambiance and delicious food.', rating: 4 },
  { name: 'Sam R.', message: 'Outstanding service and wines.', rating: 5 },
];

export default function Reviews() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Customer Reviews</h1>
      <Row className="g-4">
        {testimonials.map((t) => (
          <Col md={6} lg={4} key={t.name}>
            <TestimonialCard {...t} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

