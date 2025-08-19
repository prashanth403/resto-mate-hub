import { Col, Container, Row } from 'react-bootstrap';

const photos = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery6.jpg',
];

export default function Gallery() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Gallery</h1>
      <Row className="g-3">
        {photos.map((src, idx) => (
          <Col key={src} xs={6} md={4} lg={3}>
            <img src={src} alt={`Gallery ${idx + 1}`} className="img-fluid rounded" />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

