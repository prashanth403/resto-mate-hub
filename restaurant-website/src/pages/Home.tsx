import { Col, Container, Row } from 'react-bootstrap';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Hero title="Experience Fine Dining" subtitle="Seasonal ingredients, crafted with passion." />
      <Container className="py-5">
        <h2 className="mb-4">Featured Dishes</h2>
        <Row className="g-4">
          <Col md={4}><MenuCard title="Truffle Pasta" description="Handmade tagliatelle with black truffle." price="$24" imageUrl="/images/truffle-pasta.jpg" /></Col>
          <Col md={4}><MenuCard title="Seared Salmon" description="With lemon butter and asparagus." price="$28" imageUrl="/images/salmon.jpg" /></Col>
          <Col md={4}><MenuCard title="Chocolate Lava Cake" description="Molten center with vanilla gelato." price="$12" imageUrl="/images/lava-cake.jpg" /></Col>
        </Row>
        <div className="text-center mt-4">
          <Link to="/menu" className="btn btn-outline-primary">View Full Menu</Link>
        </div>
      </Container>
    </div>
  );
}

