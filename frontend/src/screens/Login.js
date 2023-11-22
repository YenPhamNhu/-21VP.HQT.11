import React from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput,MDBCheckbox} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav';

const Login = () => {
  return (
    <MDBContainer fluid style={{ margin: "40px 10px"}} >
      <MDBRow className="d-flex justify-content-center align-items-center" id='logcontain'>
        <MDBCol md="6" className="mx-auto">
          <MDBCard>
            <MDBCardBody className="text-black d-flex flex-column justify-content-center" id='logcontain'>
            <MDBRow>
                <MDBCol md="12" className="d-flex justify-content-center">
                  <img src="logicon.png" alt="Logo" className="img-fluid" />
                </MDBCol>
            </MDBRow>
            
              <MDBRow>
                <MDBCol md="12">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Số điện thoại"
                    size="lg"
                    id="logtel"
                    type="tel"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mật khẩu"
                    size="lg"
                    id="logpass"
                    type="password"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6" className="d-flex justify-content-start">
                  <MDBCheckbox
                    label="Ghi nhớ mật khẩu"
                    id="rememberPassword"
                  />
                </MDBCol>

                <MDBCol md="6" className="d-flex justify-content-end">
                  <Nav.Link as={Link} to="/forgetpass">Quên mật khẩu?</Nav.Link>
                </MDBCol>
              </MDBRow>
              <div className="d-flex justify-content-center pt-3">
                <MDBBtn className="ms-2" color="warning" size="lg">
                  Đăng nhập
                </MDBBtn>
              </div>
              <div className="d-flex justify-content-center pt-3">
              <Nav.Link as={Link} to='/signup'>Chưa có tài khoản? Đăng ký</Nav.Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
