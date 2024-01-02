import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function ProfileSection() {
  const [patient, setPatient] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/patients/getPatientBySDT/${localStorage.SDT}`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    let modifiedData;
    const formattedNgaySinh = serviceData.NgaySinh.split('T')[0];
    modifiedData = { ...serviceData, NgaySinh: formattedNgaySinh};
    setPatient(modifiedData);
  };

  useEffect(() => {
    fetchService(); 
  }, []); 
  if (!patient) {
    return <div>Loading...</div>; 

  }

  return (
    <section className='vh-100' style={{ backgroundColor: "#E1F2FB", padding: "0%", color: "#04364a" }}>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col col-lg-6 mb-4 mb-lg-0'>
            <div className='card mb-3' style={{ borderRadius: ".5rem" }}>
              <div className='row g-0'>
                <div className='col-md-4 gradient-custom text-center text-white' style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem", backgroundColor: "whitesmoke" }}>
                  <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp' alt='Avatar' className='img-fluid my-5' style={{ width: "80px" }} />
                  <h5 style={{ color: "#04364a" }}>{patient.HoTen}</h5>
                  <p>
                    <Link className='far fa-edit mb-5 text-dark' >
                      chỉnh sửa
                    </Link>    
                  </p>
                  <p>
                    <Link style={{ color: "#04364a" }}>Đổi mật khẩu</Link>
                  </p>
                </div>
                <div className='col-md-8' style={{ backgroundColor: "#64ccc5" }}>
                  <div className='card-body p-4'>
                    <h6 className='text-uppercase'>Thông tin</h6>
                    <hr className='mt-0 mb-4' />
                    <div className='col pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Mã bệnh nhân</h6>
                        <p className='text-muted'>{patient.MaBenhNhan}</p>
                      </div>
                    </div>
                    <div className='row pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Họ tên</h6>
                        <p className='text-muted'>{patient.HoTen}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Số điện thoại</h6>
                        <p className='text-muted'>{patient.SDT}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Giới tính</h6>
                        <p className='text-muted'>{patient.GioiTinh}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Ngày Sinh</h6>
                        <p className='text-muted'>{patient.NgaySinh}</p>
                      </div>
                    </div>
                    <div className='col pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Địa chỉ</h6>
                        <p className='text-muted'>{patient.DiaChi}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};