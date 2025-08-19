import { Container } from 'react-bootstrap';

export default function SiteFooter() {
  return (
    <footer className="footer mt-auto py-4">
      <Container className="text-center">
        <div className="mb-2">
          <a href="https://facebook.com" className="text-decoration-none me-3 text-light"><i className="bi bi-facebook" /></a>
          <a href="https://instagram.com" className="text-decoration-none me-3 text-light"><i className="bi bi-instagram" /></a>
          <a href="https://twitter.com" className="text-decoration-none text-light"><i className="bi bi-twitter-x" /></a>
        </div>
        <small>© {new Date().getFullYear()} Gourmet Place • 123 Main St, City • (123) 456-7890</small>
      </Container>
    </footer>
  );
}

