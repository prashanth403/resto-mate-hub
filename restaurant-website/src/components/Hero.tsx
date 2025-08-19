import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type HeroProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function Hero({ title, subtitle, ctaText = 'Reserve a Table', ctaHref = '/reservations' }: HeroProps) {
  return (
    <div className="hero">
      <Container>
        <h1 className="display-4 fw-bold">{title}</h1>
        {subtitle && <p className="lead mb-4">{subtitle}</p>}
        <Button as={Link as any} to={ctaHref} size="lg" variant="light" className="text-dark fw-semibold">
          {ctaText}
        </Button>
      </Container>
    </div>
  );
}

