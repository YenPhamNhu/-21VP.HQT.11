import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn ,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import '../screen.css/Login.css'

const Login = () => {
  return (
    <MDBContainer fluid className="vh-100 gradient-custom">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol md={8} lg={6} xl={5}>
          <MDBCard className="bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <MDBCardBody className="p-5 text-center">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput label="Email" id="typeEmailX" type="email" size="lg" />

              <MDBInput label="Password" id="typePasswordX" type="password" size="lg" />

              <p className="small mb-5 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>

              <MDBBtn type="submit" color="outline-light" size="lg">
                Login
              </MDBBtn>

              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white">
                  <i className="fab fa-facebook-f fa-lg"></i>
                </a>
                <a href="#!" className="text-white">
                  <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                </a>
                <a href="#!" className="text-white">
                  <i className="fab fa-google fa-lg"></i>
                </a>
              </div>

              <p className="mb-0">
                Don't have an account?{' '}
                <a href="#!" className="text-white-50 fw-bold">
                  Sign Up
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
