import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import SiteNavbar from './components/Navbar';
import SiteFooter from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Order from './pages/Order';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteNavbar />
      <Container className="flex-fill py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Container>
      <SiteFooter />
    </div>
  );
}

