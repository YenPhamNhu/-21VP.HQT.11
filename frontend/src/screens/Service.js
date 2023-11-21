import React from "react";
import { Link } from "react-router-dom";
import "../screen.css/Service.css";
import { padding } from "@mui/system";
// import { Card, Icon } from "antd";
const Services = () => {
  const services = [
    {
      name: "Bọc răng sứ",
      
      img: "/images_services/boc-rang-su.png",
    },
    {
      name: "Cấy ghép implant",
   
      img: "/images_services/trong-rang-implant.png",
    },
    {
      name: "Niềng răng thẩm mỹ",
     
      img: "/images_services/nieng-rang-tham-my.png",
    },
    {
      name: "Mặt dán sứ Veneer",
    
      img: "/images_services/mat-dan-su-veneer.png",
    },
    {
      name: "Tẩy trắng răng",
      
      img: "/images_services/tay-trang-rang.png",
    },
    {
      name: "Nhổ răng khôn",
    
      img: "/images_services/nho-rang-khon.png",
    },
    {
      name: "Bệnh lý nha chu",
     
      img: "/images_services/benh-ly-nha-chu.png",
    },
    {
      name: "Điều trị tủy",
     
      img: "/images_services/dieu-tri-tuy.png",
    },
    {
      name: "Hàn trám răng",
      url: "/service",
      img: "/images_services/han-tram-rang.png",
    },
  ];

  return (
    <div className='services'>
      <h2>Dịch vụ</h2>
      <div className='grid'>
        {services.map((service) => (
          <div
            key={service.name}
            className='service d-flex flex-wrap justify-content: space-between'
          >
            <Link to={service.url}>
              <img src={service.img} alt={service.name} />
              <br></br>
              <p>{service.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div style={{ padding: "2%" }}></div>
    </div>
  );
};

export default Services;
