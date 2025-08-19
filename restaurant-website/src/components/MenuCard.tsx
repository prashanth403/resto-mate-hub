import { Card, Button } from 'react-bootstrap';

type MenuCardProps = {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  onAdd?: () => void;
};

export default function MenuCard({ title, description, price, imageUrl, onAdd }: MenuCardProps) {
  return (
    <Card className="h-100">
      {imageUrl && <Card.Img variant="top" src={imageUrl} className="menu-card-img" alt={title} />}
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <span>{title}</span>
          <span className="fw-bold">{price}</span>
        </Card.Title>
        <Card.Text className="text-muted">{description}</Card.Text>
        {onAdd && (
          <Button variant="primary" onClick={onAdd} aria-label={`Add ${title} to cart`}>
            <i className="bi bi-cart-plus me-2" /> Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

