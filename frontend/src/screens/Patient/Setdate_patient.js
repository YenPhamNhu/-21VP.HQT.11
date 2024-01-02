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
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1); // Subtract 1 day from the current date
  const currentDateTime = currentDate.toISOString().slice(0, -8); // Get current date and time in the required format
  const [dateTime, setDateTime] = useState('');
  const [Dulieu, setDulieu] = useState([]);
  const [services, setServices] = useState([]);
 
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedService, setSelectedService] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services/getAllService")
      .then((response) => {
        const services = response.data;
        setServices(services);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  

 
	const GetLichNhaSi = async () => {
		const response = await fetch(
			`http://localhost:5000/api/employee/getAllWorkCalendar`
		);
		const serviceData = await response.json();
    const modifiedData = serviceData.map((item) => {
      const formattedNgay = item.Ngay.split("T")[0];
      return { ...item, Ngay: formattedNgay };
    });
    const [datePart, timePart] = dateTime.split('T');
    const NgayHen = datePart;
    const [GioHen,PhutHen] = timePart.split(':');
    if (Dulieu) {
    const filteredDulieu = modifiedData.filter(({ Ngay }) => Ngay === NgayHen);
      const filteredDulieu1 = filteredDulieu.filter(({ CaDangKy }) => 
    (CaDangKy === "Sáng" && 12 >= GioHen && GioHen >= 6) ||
    (CaDangKy === "Chiều" && 17 >= GioHen && GioHen >= 13) ||
    (CaDangKy === "Tối" && 22 >= GioHen && GioHen >= 18));
    setDulieu(filteredDulieu1);
  } }

  const [dentists, setDentists] = useState([]);
  const GetNhaSi = async () => {
    const response = await fetch(
      `http://localhost:5000/api/dentists/getAllDentist`
    );
    const datadentist = await response.json();
    setDentists(datadentist);
    await GetLichNhaSi();
    const filterdentist = dentists.filter((dentist) =>
    Dulieu.some((item) => item.SDT === dentist.SDT));
    setDentists(filterdentist);
   };

   const handleDateTimeChange = async (e) => { // Add async keyword
    setDateTime(e.target.value);
    await GetNhaSi(); // Wait for GetNhaSi() to complete
  };

  const handleCancel = () => {
    // Reset the form
    setDateTime("");
    setSelectedService([]);
    setSelectedDentist("");
  };
  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleDentistChange = (e) => {
    setSelectedDentist(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                min={currentDateTime}
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
