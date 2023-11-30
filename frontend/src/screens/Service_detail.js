import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const [service, setService] = useState(null);
  const { number /* Extract service ID from route parameters */ } = useParams();

  const fetchService = async () => {
    const serviceId = number; 
    
    const response = await fetch(`http://localhost:5000/api/services/getServiceById/${serviceId}`); // Fetch service data
    console.log(response);
    const serviceData = await response.json();

    if (serviceData) {
      setService(serviceData);
    }
  };

  useEffect(() => {
    fetchService(); // Fetch service data on component mount
  },[]);//Kệ cái warning này đi nhé

  if (!service) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div>
        {/*Chỉnh sửa tại đây*/}
      <h2>Service Details</h2>
      {/* <p>MaDichVu: {service.MaDichVu}</p> */}
      <p>TenDichVu: {service.TenDichVu}</p>
      <p>MoTa: {service.MoTa}</p>
      <p>DonGia: {service.DonGia}</p>
    </div>
  );
};

export default ServiceDetails;
