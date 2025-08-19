import { useForm } from 'react-hook-form';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

type ReservationFormData = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
};

export default function ReservationForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ReservationFormData>({
    defaultValues: { guests: 2 },
  });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const onSubmit = async (data: ReservationFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(`Reservation confirmed for ${data.name} on ${data.date} at ${data.time} for ${data.guests}.`);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitted && <Alert variant="success" className="mb-4">{submitted}</Alert>}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Jane Doe" {...register('name', { required: 'Name is required' })} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="jane@example.com" {...register('email', { required: 'Email is required' })} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="(123) 456-7890" {...register('phone', { required: 'Phone is required' })} isInvalid={!!errors.phone} />
            <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="guests">
            <Form.Label>Guests</Form.Label>
            <Form.Select {...register('guests', { required: 'Guests required', min: 1 })}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" {...register('date', { required: 'Date is required' })} isInvalid={!!errors.date} />
            <Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" {...register('time', { required: 'Time is required' })} isInvalid={!!errors.time} />
            <Form.Control.Feedback type="invalid">{errors.time?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group controlId="notes">
            <Form.Label>Notes (optional)</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Allergies, special requests, etc." {...register('notes')} />
          </Form.Group>
        </Col>
        <Col xs={12} className="pt-2">
          <Button type="submit" disabled={isSubmitting} className="px-4">
            {isSubmitting ? 'Booking…' : 'Book Table'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

