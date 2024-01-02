import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from 'axios';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);
  const [showEditErrorMessage, setShowEditErrorMessage] = useState(false);

  const [editedName, setEditedName] = useState(""); // Add state variables for edited user details
  const [editedEmail, setEditedEmail] = useState("");

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

  const [admin, setAdmin] = useState(null);
    const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admins/getAdminBySDT/${localStorage.SDT}`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    setAdmin(serviceData);
  };
  useEffect(() => {
    fetchService();
  }, []);
  if (!admin) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = () => {
    // Password length validation
    if (newPassword.length !== 8) {
      setShowErrorMessage(true);
      // Reset the error message after a certain duration (e.g., 5 seconds)
      setTimeout(() => setShowErrorMessage(false), 5000);
      return; // Exit the function if validation fails
    }

    // Assume the password change is successful (replace with your actual logic)
    // For simplicity, I'm using a timeout to simulate an asynchronous operation
    setTimeout(() => {
      // Reset the form and show the success message
      handleClose();
      setShowSuccessMessage(true);

      // Reset the success message after a certain duration (e.g., 3 seconds)
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 2000); // Simulating a delay, replace with your actual logic
  };

  // link chỉnh sửa
  

  const handleEditShow = () => {
    setShowEditModal(true);
    setShowEditSuccessMessage(false);
    setShowEditErrorMessage(false);
    // Initialize edited fields with current user details
    // You need to replace these with your actual user data
    setEditedName("");
    setEditedEmail("");
    // Set other edited fields with actual user data
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    // Reset edited fields when closing the modal
    setEditedName("");
    setEditedEmail("");
    // Reset other edited fields
  };

  const handleEditSave = () => {
    const fetchService = async () => {
      // Get the updated data from your form or wherever it's available
      const updatedData = {
        HoTen: editedName,
        Email: editedEmail,
      };
      const requestOptions = {
        method: 'PUT', // Use the PUT method for updating data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Convert the data to JSON format
      };
  
      try {
        const response = await fetch(
          `http://localhost:5000/api/admins/updateInfAdmin/${localStorage.SDT}`,
          requestOptions
        ); // Fetch service data
  
        if (response.ok) {
          // Handle the successful response
          const serviceData = await response.json();
          console.log('Data updated successfully:', serviceData);
        } else {
          // Handle the error response
          console.error('Failed to update data');
        }
      } catch (error) {
        // Handle any network or other errors
        console.error('An error occurred:', error);
      }
    };
  
    fetchService();
  };

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
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp' /*đẩy ảnh từ đâu lên z? ai làm thì làm dùm nha*/
                    alt='Avatar'
                    className='img-fluid my-5'
                    style={{ width: "80px" }}
                  />
                  <h5 style={{ color: "#04364a" }}>{admin.Hoten}</h5>
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
                        <h6>Mã QTV</h6>
                        <p className='text-muted'>{admin.MaNhanVien}</p>
                      </div>
                    </div>
                    <div className='col pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Họ Tên</h6>
                        <p className='text-muted'>{admin.HoTen}</p>
                      </div>
                    </div>
                    <div className='row pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Email</h6>
                        <p className='text-muted'>{admin.Email}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Số điện thoại</h6>
                        <p className='text-muted'>{admin.SDT}</p>
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
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                require
              />
            </Form.Group>

            <Form.Group controlId='formNewPassword'>
              <Form.Label>Mật khẩu mới (8 kí tự)</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập mật khẩu mới'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                onChange={(e) => setEditedName(e.target.value)}
                require={true}
              />
            </Form.Group>

            <Form.Group controlId='formEditedEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Nhập email'
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                require={true}
              />
            </Form.Group>
            {/* Add other form fields for additional details */}
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
