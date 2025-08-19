import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type ContactData = { name: string; email: string; message: string };

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactData>();
  const [sent, setSent] = useState(false);
  const onSubmit = async (data: ContactData) => {
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    reset();
  };

  return (
    <Container className="py-4">
      <h1 className="mb-3">Contact Us</h1>
      <Row className="g-4">
        <Col md={6}>
          {sent && <Alert variant="success">Thanks for reaching out. We will get back soon!</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register('name', { required: 'Name is required' })} isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register('email', { required: 'Email is required' })} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} {...register('message', { required: 'Message is required' })} isInvalid={!!errors.message} />
              <Form.Control.Feedback type="invalid">{errors.message?.message}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>Send</Button>
          </Form>
        </Col>
        <Col md={6}>
          <div className="ratio ratio-4x3 rounded overflow-hidden">
            <iframe
              title="Google Map"
              src="https://maps.google.com/maps?q=Times%20Square%2C%20NYC&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
          <div className="mt-3">
            <p className="mb-1"><strong>Address:</strong> 123 Main St, City</p>
            <p className="mb-1"><strong>Phone:</strong> (123) 456-7890</p>
            <p className="mb-0"><strong>Hours:</strong> Mon-Sun 11:00 - 22:00</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

