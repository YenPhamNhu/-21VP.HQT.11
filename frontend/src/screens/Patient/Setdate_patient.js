import React, { useState } from 'react';
import { Button, Form, FormGroup, FormLabel, FormControl, Container, Row, Col } from 'react-bootstrap';

const AppointmentForm = () => {
  const [dateTime, setDateTime] = useState('');
  const [services, setServices] = useState([]);
  const [dentist, setDentist] = useState('');

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServices([...services, value]);
    } else {
      setServices(services.filter((service) => service !== value));
    }
  };

  const handleDentistChange = (e) => {
    setDentist(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data
    console.log('Date & Time:', dateTime);
    console.log('Services:', services);
    console.log('Dentist:', dentist);

    // Reset the form
    setDateTime('');
    setServices([]);
    setDentist('');
  };

  const handleCancel = () => {
    // Reset the form
    setDateTime('');
    setServices([]);
    setDentist('');
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Thời gian:</FormLabel>
          <FormControl
            type="datetime-local"
            value={dateTime}
            onChange={handleDateTimeChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Dịch vụ sử dụng:</FormLabel>
          <FormGroup>
            <Form.Check
              type="checkbox"
              label="Dịch vụ 1"
              value="Dịch vụ 1"
              checked={services.includes('Dịch vụ 1')}
              onChange={handleServiceChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Dịch vụ 2"
              value="Dịch vụ 2"
              checked={services.includes('Dịch vụ 2')}
              onChange={handleServiceChange}
              inline
            />
            {/* Add more service options here */}
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <FormLabel>Chọn nha sĩ:</FormLabel>
          <FormControl
            as="select"
            value={dentist}
            onChange={handleDentistChange}
            required
          >
            <option value="">-- Chọn nha sĩ --</option>
            <option value="Nha sĩ 1">Nha sĩ 1</option>
            <option value="Nha sĩ 2">Nha sĩ 2</option>
            {/* Add more dentist options here */}
          </FormControl>
        </FormGroup>

        <Row className="justify-content-center" style={{marginTop:'30px'}}>
          <Col sm={6} className="text-center">
            <Button type="submit" variant="primary" className="mr-2">Chấp nhận</Button>
            <Button type="button" variant="secondary" onClick={handleCancel} style={{marginLeft:'30px'}}>Hủy</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AppointmentForm;