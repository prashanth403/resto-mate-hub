import { Container } from 'react-bootstrap';
import ReservationForm from '../components/ReservationForm';

export default function Reservations() {
  return (
    <Container className="py-4">
      <h1 className="mb-3">Reservations</h1>
      <p className="text-muted">Book your table online. We will confirm via email.</p>
      <ReservationForm />
    </Container>
  );
}

