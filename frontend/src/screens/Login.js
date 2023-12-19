import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput,MDBCheckbox} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav';
import Validation from './LoginValidation'
function Login(){
  const [values, setValues] = useState({
    phone: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission
    }
  };

  const Validation = (values) => {
    // Perform your validation logic here
    // Validate the phone and password fields
    const errors = {};

    if (!values.phone) {
      errors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    return errors;
  };
  return(
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="phone"><strong>Số điện thoại</strong></label>
            <input type="phone" placeholder="Số điện thoại" name='phone'
            onChange={handleInput}
            className="form-control rounded-0"/>
            {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Mật khẩu</strong></label>
            <input type="password" placeholder="Mật khẩu" name='password'
            onChange={handleInput}
            className="form-control rounded-0"/>
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Đăng nhập</button>
          <Link to='/signup' className="btn btn-default border w-100 bg-light rounded-0 text-deccoration-none">Chưa có tài khoản? Đăng ký</Link>
        </form>
      </div>
    </div>
  )
}

// const Login = () => {
//   return (
//     <MDBContainer fluid style={{ margin: "40px 10px"}} >
//       <MDBRow className="d-flex justify-content-center align-items-center" id='logcontain'>
//         <MDBCol md="6" className="mx-auto">
//           <MDBCard>
//             <MDBCardBody className="text-black d-flex flex-column justify-content-center" id='logcontain'>
//             <MDBRow>
//                 <MDBCol md="12" className="d-flex justify-content-center">
//                   <img src="logicon.png" alt="Logo" className="img-fluid" />
//                 </MDBCol>
//             </MDBRow>
            
//               <MDBRow>
//                 <MDBCol md="12">
//                   <MDBInput
//                     wrapperClass="mb-4"
//                     label="Số điện thoại"
//                     size="lg"
//                     id="logtel"
//                     type="tel"
//                   />
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow>
//                 <MDBCol md="12">
//                   <MDBInput
//                     wrapperClass="mb-4"
//                     label="Mật khẩu"
//                     size="lg"
//                     id="logpass"
//                     type="password"
//                   />
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow>
//                 <MDBCol md="6" className="d-flex justify-content-start">
//                   <MDBCheckbox
//                     label="Ghi nhớ mật khẩu"
//                     id="rememberPassword"
//                   />
//                 </MDBCol>

//                 <MDBCol md="6" className="d-flex justify-content-end">
//                   <Nav.Link as={Link} to="/forgetpass" className="text-primary">Quên mật khẩu?</Nav.Link>
//                 </MDBCol>
//               </MDBRow>
//               <div className="d-flex justify-content-center pt-3">
//                 <MDBBtn className="ms-2" color="warning" size="lg">
//                   Đăng nhập
//                 </MDBBtn>
//               </div>
//               <div className="d-flex justify-content-center pt-3">
//               <Nav.Link as={Link} to='/signup' className="text-primary">Chưa có tài khoản? Đăng ký</Nav.Link>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

export default Login;
