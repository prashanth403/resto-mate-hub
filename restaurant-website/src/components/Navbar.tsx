import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function SiteNavbar() {
  return (
    <Navbar expand="lg" bg="light" variant="light" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Gourmet Place</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/menu">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/reservations">Reservations</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={NavLink} to="/reviews">Reviews</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <NavDropdown title="More" id="more-nav">
              <NavDropdown.Item as={NavLink} to="/about">About</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/order">Order Online</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/order" className="btn btn-primary text-white">Order Now</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

