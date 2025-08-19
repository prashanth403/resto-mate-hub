import { Card } from 'react-bootstrap';

type TestimonialCardProps = {
  name: string;
  message: string;
  rating?: number; // 1-5
};

export default function TestimonialCard({ name, message, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="h-100">
      <Card.Body>
        <div className="mb-2" aria-label={`${rating} star rating`}>
          {Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`} />
          ))}
        </div>
        <Card.Text>“{message}”</Card.Text>
        <Card.Subtitle className="text-muted">— {name}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

