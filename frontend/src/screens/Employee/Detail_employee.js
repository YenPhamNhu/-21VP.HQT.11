import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";

export default function Home() {
  const [employee, setEmployee] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/employees/getEmployeeBySDT/${localStorage.SDT}`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    setEmployee(serviceData);
  };

  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);
  const [showEditErrorMessage, setShowEditErrorMessage] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedMaNhaSi, setEditedMaNhaSi] = useState("");
  const [editedGioiTinh, setEditedGioiTinh] = useState("");
  const [editedViTri, setEditedViTri] = useState("");
  const [editedTinhTrangHoatDong, setEditedTinhTrangHoatDong] = useState("");
  const [editedDiaChi, setEditedDiaChi] = useState("");

  const handleEditShow = () => {
    setShowEditModal(true);
    setShowEditSuccessMessage(false);
    setShowEditErrorMessage(false);

    setEditedName(" ");
    setEditedPhoneNumber(" ");
    setEditedMaNhaSi(" ");
    setEditedGioiTinh(" ");
    setEditedViTri(" ");
    setEditedTinhTrangHoatDong(" ");
    setEditedDiaChi(" ");
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    // Reset edited fields when closing the modal
    setEditedName("");
    setEditedPhoneNumber("");
    setEditedMaNhaSi("");
    setEditedGioiTinh("");
    setEditedViTri("");
    setEditedTinhTrangHoatDong("");
    setEditedDiaChi("");
  };

  const handleEditSave = () => {
    // Assume the user information update is successful (replace with your actual logic)
    // For simplicity, I'm using a timeout to simulate an asynchronous operation
    setTimeout(() => {
      // Reset the form and show the success message
      handleEditClose();
      setShowEditSuccessMessage(true);

      // Reset the success message after a certain duration (e.g., 3 seconds)
      setTimeout(() => setShowEditSuccessMessage(false), 3000);
    }, 2000); // Simulating a delay, replace with your actual logic
  };

  useEffect(() => {
    fetchService();
  }, []);
  if (!employee) {
    return <div>Loading...</div>; // Display loading message while fetching data
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
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp' /*đẩy ảnh từ đâu lên z? ai làm thì làm dùm nha*/
                    alt='Avatar'
                    className='img-fluid my-5'
                    style={{ width: "80px" }}
                  />
                  <h5 style={{ color: "#04364a" }}>{employee.HoTen}</h5>
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
                    <div className='row pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Mã nhân viên</h6>
                        <p className='text-muted'>{employee.MaNhanVien}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Họ và tên</h6>
                        <p className='text-muted'>{employee.HoTen}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Số điện thoại</h6>
                        <p className='text-muted'>{employee.SDT}</p>
                      </div>
                    </div>
                    <div className='row pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Giới tính</h6>
                        <p className='text-muted'>{employee.GioiTinh}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Vị Trí</h6>
                        <p className='text-muted'>{employee.ViTri}</p>
                      </div>
                      <div className='col-6 mb-3'>
                        <h6>Tình Trạng Hoạt Động</h6>
                        <p className='text-muted'>
                          {employee.TinhTrangHoatDong}
                        </p>
                      </div>
                    </div>
                    <div className='col pt-1'>
                      <div className='col-6 mb-3'>
                        <h6>Địa chỉ</h6>
                        <p className='text-muted'>{employee.DiaChi}</p>
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
                value={employee.HoTen}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formEditedMaNhanVien'>
              <Form.Label>Mã Nhân viên</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập mã nhân viên'
                value={employee.MaNhanVien}
                onChange={(e) => setEditedMaNhaSi(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formEditedPhoneNumber'>
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập số điện thoại'
                value={employee.SDT}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formEditedGioiTinh'>
              <Form.Label>Giới tính</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập giới tính'
                value={employee.GioiTinh}
                onChange={(e) => setEditedGioiTinh(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formEditedViTri'>
              <Form.Label>Vị Trí</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập vị trí'
                value={employee.ViTri}
                onChange={(e) => setEditedViTri(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formEditedChuyenMon'>
              <Form.Label>Tình trạng hoạt động</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập tình trạng hoạt động'
                value={employee.TinhTrangHoatDong}
                onChange={(e) => setEditedTinhTrangHoatDong(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formEditedDiaChi'>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập địa chỉ'
                value={employee.DiaChi}
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

// export default ProfileSection;
