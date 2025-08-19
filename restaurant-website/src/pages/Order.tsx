import { useState } from 'react';
import { Badge, Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import MenuCard from '../components/MenuCard';

type Item = { id: string; title: string; price: number };

const items: Item[] = [
  { id: 'pasta', title: 'Truffle Pasta', price: 24 },
  { id: 'salmon', title: 'Seared Salmon', price: 28 },
  { id: 'cake', title: 'Lava Cake', price: 12 },
];

export default function Order() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [show, setShow] = useState(false);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = items.reduce((sum, i) => sum + (cart[i.id] || 0) * i.price, 0);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Order Online</h1>
        <Button variant="primary" onClick={() => setShow(true)}>
          Cart <Badge bg="light" text="dark" className="ms-2">{totalCount}</Badge>
        </Button>
      </div>
      <Row className="g-4">
        {items.map((i) => (
          <Col md={4} key={i.id}>
            <MenuCard title={i.title} description="Delicious selection" price={`$${i.price}`} onAdd={() => add(i.id)} />
          </Col>
        ))}
      </Row>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {totalCount === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {items.filter((i) => cart[i.id]).map((i) => (
                <div key={i.id} className="d-flex justify-content-between mb-2">
                  <span>{i.title} × {cart[i.id]}</span>
                  <span>${(i.price * (cart[i.id] || 0)).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="mt-3 w-100">Checkout</Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

