import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const AppointmentForm = () => {
  const [dateTime, setDateTime] = useState("");
  const [services, setServices] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    // Fetch services
    axios
      .get("http://localhost:5000/api/services/getAllService")
      .then((response) => {
        const services = response.data;
        setServices(services);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Fetch dentists
    axios
      .get("http://localhost:5000/api/dentists/getAllDentist")
      .then((response) => {
        const dentists = response.data;
        setDentists(dentists);
      })
      .catch((error) => {
        console.error("Error fetching dentists:", error);
      });
  }, []);

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleCancel = () => {
    // Reset the form
    setDateTime("");
    setSelectedService([]);
    setSelectedDentist("");
  };
  // const handleServiceChange = (event) => {
  //   const serviceId = event.target.value;
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     setSelectedService([...selectedService, serviceId]);
  //   } else {
  //     setSelectedService(
  //       selectedService.filter((service) => service !== serviceId)
  //     );
  //   }
  // };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleDentistChange = (e) => {
    setSelectedDentist(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log("Date & Time:", dateTime);
    console.log("Services:", selectedService);
    console.log("Dentist:", selectedDentist);
  };

  return (
    <div
      className='container mt-4 mb-4'
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "#64ccc5",
        width: "500px",
      }}
    >
      <Container className='my-5'>
        <div className='d-flex justify-content-center'>
          <Form onSubmit={handleSubmit} style={{ width: "500px" }}>
            <FormGroup>
              <FormLabel>Thời gian:</FormLabel>
              <FormControl
                type='datetime-local'
                value={dateTime}
                onChange={handleDateTimeChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Dịch vụ sử dụng:</FormLabel>
              <FormControl
                as='select'
                value={selectedService}
                onChange={handleServiceChange}
                required
              >
                <option value=''>-- Dịch vụ sử dụng --</option>
                {services.map((service) => (
                  <option key={service.MaDichVu} value={service.MaDichVu}>
                    {service.TenDichVu}
                  </option>
                ))}
              </FormControl>
            </FormGroup>

            <FormGroup>
              <FormLabel>Chọn nha sĩ:</FormLabel>
              <FormControl
                as='select'
                value={selectedDentist}
                onChange={handleDentistChange}
                required
              >
                <option value=''>-- Chọn nha sĩ --</option>
                {dentists.map((dentist) => (
                  <option key={dentist.MaNhaSi} value={dentist.MaNhaSi}>
                    {dentist.HoTen}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <Row
              className='justify-content-center d-flex'
              style={{ marginTop: "30px" }}
            >
              <Col sm={6} className='text-center'>
                <Button
                  type='submit'
                  variant='primary'
                  className='mr-2'
                  onClick={handleSubmit}
                >
                  Đặt lịch
                </Button>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={handleCancel}
                  style={{ marginLeft: "30px" }}
                >
                  Hủy
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AppointmentForm;
