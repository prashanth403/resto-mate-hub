import { Col, Container, Row } from 'react-bootstrap';
import MenuCard from '../components/MenuCard';

const sections = [
  { title: 'Starters', items: [
    { title: 'Bruschetta', description: 'Tomatoes, basil, olive oil on grilled bread', price: '$9', imageUrl: '/images/bruschetta.jpg' },
    { title: 'Calamari', description: 'Crispy fried with aioli', price: '$12', imageUrl: '/images/calamari.jpg' },
  ]},
  { title: 'Mains', items: [
    { title: 'Ribeye Steak', description: '12oz, garlic butter, fries', price: '$36', imageUrl: '/images/steak.jpg' },
    { title: 'Mushroom Risotto', description: 'Porcini, parmesan, herbs', price: '$22', imageUrl: '/images/risotto.jpg' },
  ]},
  { title: 'Desserts', items: [
    { title: 'Tiramisu', description: 'Classic Italian dessert', price: '$10', imageUrl: '/images/tiramisu.jpg' },
    { title: 'Panna Cotta', description: 'Vanilla bean, berry coulis', price: '$9', imageUrl: '/images/pannacotta.jpg' },
  ]},
  { title: 'Beverages', items: [
    { title: 'Espresso', description: 'Rich and bold', price: '$4', imageUrl: '/images/espresso.jpg' },
    { title: 'House Red', description: 'Glass of red wine', price: '$8', imageUrl: '/images/red-wine.jpg' },
  ]},
];

export default function Menu() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Menu</h1>
      {sections.map((section) => (
        <div key={section.title} className="mb-5">
          <h3 className="mb-3">{section.title}</h3>
          <Row className="g-4">
            {section.items.map((item) => (
              <Col md={6} lg={4} key={item.title}>
                <MenuCard {...item} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

