import React, { useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBCardImage } from "mdb-react-ui-kit";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    SDT: "",
    MatKhau: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:5000/login', values)
        .then(res => {
          navigate('/service');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const Validation = (values) => {
    const errors = {};

    if (!values.SDT) {
      errors.SDT = "Vui lòng nhập số điện thoại";
    }

    if (!values.MatKhau) {
      errors.MatKhau = "Vui lòng nhập mật khẩu";
    }

    return errors;
  };

  return (
    <MDBContainer fluid style={{ margin: "40px 10px", padding: "5px 50px" }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>
          <MDBCard className='my-4'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='d-none d-md-block' marginTop='5%'>
                <MDBCardImage
                  width='50%'
                  height='50%'
                  src='/signup.png'
                  alt='Welcome to Chigsa Clinic'
                  className='d-flex align-items-center mx-auto'
                  fluid
                />
              </MDBCol>
              <MDBCol md='6'>
                <div className="bg-white p-3 rounded">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="SDT"><strong>Số điện thoại</strong></label>
                      <input type="text" placeholder="Số điện thoại" name='SDT'
                        onChange={handleInput}
                        className="form-control rounded-0" />
                      {errors.SDT && <span className="text-danger">{errors.SDT}</span>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="MatKhau"><strong>Mật khẩu</strong></label>
                      <input type="password" placeholder="Mật khẩu" name='MatKhau'
                        onChange={handleInput}
                        className="form-control rounded-0" />
                      {errors.MatKhau && <span className="text-danger">{errors.MatKhau}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Đăng nhập</button>
                    <Link to='/signup' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Chưa có tài khoản? Đăng ký</Link>
                  </form>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
