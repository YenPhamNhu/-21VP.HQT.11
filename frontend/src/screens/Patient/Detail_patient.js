// import { Link } from "react-router-dom";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   TextField,
//   DialogActions,
//   Button,
// } from '@material-ui/core';

// export default function ProfileSection() {

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";

export default function ProfileSection() {
  const [patient, setPatient] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/patients/getPatientBySDT/${localStorage.SDT}`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    let modifiedData;
    const formattedNgaySinh = serviceData.NgaySinh.split("T")[0];
    modifiedData = { ...serviceData, NgaySinh: formattedNgaySinh };
    setPatient(modifiedData);
  };

  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleShow = () => {
    setShowModal(true);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const handleClose = () => {
    setShowModal(false);
    // Reset password fields when closing the modal
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = () => {
    // Check if the new password and confirm password match
    if (NewPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    if (NewPassword.length < 8) {
      alert("Mật khẩu mới không đủ 8 kí tự trở lên");
      return;
    }
    const SDT = localStorage.SDT;
    const data = {
      SDT,
      OldPassword,
      NewPassword,
    };
    console.log(data);
  
    // Make a fetch request to update the password
    fetch('http://localhost:5000/api/patients/changePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.success) {
          alert("Mật khẩu đã được cập nhật thành công.");
          // Reset the password fields
          setOldPassword(data.NewPassword);
          // setNewPassword("");
          // setConfirmPassword("");
          // Close the modal
          handleClose();
        } else {
          alert("Mật khẩu cũ không đúng hoặc có lỗi xảy ra.");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
      });
  };

  // link chỉnh sửa
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);
  const [showEditErrorMessage, setShowEditErrorMessage] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedNgaySinh, setEditedNgaySinh] = useState("");
  const [editedDiaChi, setEditedDiaChi] = useState("");
  const [editedGioiTinh, setEditedGioiTinh] = useState("");

  const handleEditShow = () => {
    setShowEditModal(true);
    setShowEditSuccessMessage(false);
    setShowEditErrorMessage(false);

    setEditedName("");
    setEditedNgaySinh("");
    setEditedDiaChi("");
    setEditedGioiTinh('Nam');
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditedName("");
    setEditedNgaySinh("");
    setEditedDiaChi("");
    setEditedGioiTinh("");
  };

  const handleEditSave = () => {
    const fetchService = async () => {
      // Get the updated data from your form or wherever it's available
      const updatedData = {};
    if (editedName !== "") {
      updatedData.HoTen = editedName;
    }
    if (editedNgaySinh !== "") {
      const date = new Date(editedNgaySinh);
      const formattedNgaySinh = date.toISOString().split('T')[0];
      updatedData.NgaySinh = formattedNgaySinh;
    }
    if (editedDiaChi !== "") {
      updatedData.DiaChi = editedDiaChi;
    }
    if (editedGioiTinh !== "") {
      updatedData.GioiTinh  = editedGioiTinh;
    }
    if (editedName.trim() === "") {
      // Display an error message or handle the validation error in some way
      console.error("Name field is empty");
      return;
    }
    if (editedNgaySinh.trim() === "") {
      // Display an error message or handle the validation error in some way
      console.error("NgaySinh field is empty");
      return;
    }
    if (editedDiaChi.trim() === "") {
      // Display an error message or handle the validation error in some way
      console.error("DiaChi field is empty");
      return;
    }
    if (editedGioiTinh.trim() === "") {
      // Display an error message or handle the validation error in some way
      console.error("GioiTinh field is empty");
      return;
    }
      const requestOptions = {
        method: 'PUT', // Use the PUT method for   updating data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Convert the data to JSON format
      };
  
      try {
        const response = await fetch(
          `http://localhost:5000/api/patients/updateInf/${localStorage.SDT}`,
          requestOptions
        );
        if (response.ok) {
          console.log('Data updated successfully');
          // Fetch the updated data
          const fetchResponse = await fetch(
            `http://localhost:5000/api/patients/getPatientBySDT/${localStorage.SDT}`
          );
          if (fetchResponse.ok) {
            const updatedAdminData = await fetchResponse.json();
            console.log('Updated patient data:', updatedAdminData);
            window.location.reload();
          } else {
            console.error('Failed to fetch updated data');
          }
        } else {
          console.error('Failed to update data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    fetchService();
  };

  useEffect(() => {
    fetchService();
  }, []);
  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className='vh-100'
      style={{ backgroundColor: "#E1F2FB", padding: "0%", color: "#04364a" }}
    >
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col col-lg-6 mb-4 mb-lg-0'>
            <div className='card mb-3' style={{ borderRadius: ".5rem" }}>
              <div className='row g-0'>
                <div
                  className='col-md-4 gradient-custom text-center text-white'
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                    alt='Avatar'
                    className='img-fluid my-5'
                    style={{ width: "80px" }}
                  />
                  <h5 style={{ color: "#04364a" }}>{patient.HoTen}</h5>
                  <p>
                    <Link onClick={handleEditShow} style={{ color: "#04364a" }}>
                      Chỉnh sửa
                    </Link>
                  </p>
                  <p>
                    <Link onClick={handleShow} style={{ color: "#04364a" }}>
                      Đổi mật khẩu
                    </Link>
                  </p>
                </div>
                <div
                  className='col-md-8'
                  style={{ backgroundColor: "#64ccc5" }}
                >
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
      {/* Modal for changing password */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formOldPassword'>
              <Form.Label>Mật khẩu cũ</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập mật khẩu cũ'
                value={OldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                require
              />
            </Form.Group>

            <Form.Group controlId='formNewPassword'>
              <Form.Label>Mật khẩu mới (8 kí tự)</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập mật khẩu mới'
                value={NewPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                require
              />
            </Form.Group>

            <Form.Group controlId='formConfirmPassword'>
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control
                type='password'
                placeholder='Xác nhận mật khẩu mới'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                require
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleChangePassword}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success message */}
      {showSuccessMessage && (
        <Alert variant='success' className='mt-3'>
          Đổi mật khẩu thành công!
        </Alert>
      )}

      {/* Error message */}
      {showErrorMessage && (
        <Alert variant='danger' className='mt-3'>
          Mật khẩu phải gồm đúng 8 kí tự. Vui lòng kiểm tra lại.
        </Alert>
      )}

      {/* link chỉnh sửa */}
      {/* Modal for editing user information */}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formEditedName'>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập họ và tên'
                value={editedName}
                require
                onChange={(e) => setEditedName(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group controlId='formEditedNgaySinh'>
              <Form.Label>Ngày Sinh</Form.Label>
              <Form.Control
                type='date'
                placeholder='Nhập ngày sinh'
                value={editedNgaySinh}
                require
                onChange={(e) => setEditedNgaySinh(e.target.value)}
              />
            </Form.Group>
                      <Form.Group controlId='formEditedGender'>
              <Form.Label>Giới tính</Form.Label>
              <Form.Control
                as='select'
                value={editedGioiTinh}
                required
                onChange={(e) => setEditedGioiTinh(e.target.value)}
              >
                <option value='Nam'>Nam</option>
                <option value='Nữ'>Nữ</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formEditedDiaChi'>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập địa chỉ'
                value={editedDiaChi}
                require
                onChange={(e) => setEditedDiaChi(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleEditClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleEditSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success message for editing user information */}
      {showEditSuccessMessage && (
        <Alert variant='success' className='mt-3'>
          Thay đổi thông tin thành công!
        </Alert>
      )}

      {/* Error message for editing user information */}
      {showEditErrorMessage && (
        <Alert variant='danger' className='mt-3'>
          Thay đổi thông tin không thành công. Vui lòng thử lại sau.
        </Alert>
      )}
    </section>
  );
}
