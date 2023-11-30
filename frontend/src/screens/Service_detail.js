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
  const SerImgs = [
    {
      name: "Bọc răng sứ",
      url: "1",
      img: "/images_services/boc-rang-su.png",
    },
    {
      name: "Cấy ghép implant",
      url: "2",
      img: "/images_services/trong-rang-implant.png",
    },
    {
      name: "Niềng răng thẩm mỹ",
      url: "3",
      img: "/images_services/nieng-rang-tham-my.png",
    },
    {
      name: "Mặt dán sứ Veneer",
      url: "4",
      img: "/images_services/mat-dan-su-veneer.png",
    },
    {
      name: "Tẩy trắng răng",
      url: "5",
      img: "/images_services/tay-trang-rang.png",
    },
    {
      name: "Nhổ răng khôn",
      url: "6",
      img: "/images_services/nho-rang-khon.png",
    },
    {
      name: "Bệnh lý nha chu",
      url: "7",
      img: "/images_services/benh-ly-nha-chu.png",
    },
    {
      name: "Điều trị tủy",
      url: "8",
      img: "/images_services/dieu-tri-tuy.png",
    },
    {
      name: "Hàn trám răng",
      url: "9",
      img: "/images_services/han-tram-rang.png",
    },
  ];

  const specificImageUrl = service.MaDichVu;
  const specificImage = SerImgs.find((SerImg) => SerImg.url == specificImageUrl);//Kệ warning
  console.log(specificImage);
  return (
    <div>
        {/*Chỉnh sửa tại đây*/}
      <div>
        <img src={specificImage.img} alt={specificImage.name} />
      </div>   
      <h2>Service Details</h2>
      <p>TenDichVu: {service.TenDichVu}</p>
      <p>MoTa: {service.MoTa}</p>
      <p>DonGia: {service.DonGia}</p>
    </div>
  );
};

export default ServiceDetails;
