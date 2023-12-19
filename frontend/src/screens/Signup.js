import React from "react";
import "../screen.css/Signup.css";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBRadio,
// } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from 'react-router-dom'; 

function Signup(){
  return(
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="">
          <div className="mb-3">
            <label htmlFor="fullName"><strong>Họ và tên</strong></label>
            <input type="fullName" placeholder="Họ và tên" className="form-control rounded-0"/>
          </div>
          <div className="mb-3">
            <label htmlFor="phone"><strong>Số điện thoại</strong></label>
            <input type="phone" placeholder="Số điện thoại" className="form-control rounded-0"/>
          </div>
          <div className="mb-3">
            <label htmlFor="address"><strong>Địa chỉ</strong></label>
            <input type="address" placeholder="Địa chỉ" className="form-control rounded-0"/>
          </div>
          <div className="mb-3">
            <label htmlFor="dob"><strong>Ngày sinh</strong></label>
            <input type="date" placeholder="Ngày sinh" className="form-control rounded-0"/>
          </div>
          <div className="mb-3">
            <label htmlFor="gender"><strong>Giới tính</strong></label>
            <select className="form-control rounded-0" id="gender">
              {/* <option value="">Select Gender</option> */}
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Mật khẩu</strong></label>
            <input type="password" placeholder="Mật khẩu"className="form-control rounded-0"/>
          </div>
          <button className="btn btn-success w-100 rounded-0">Đăng ký</button>
          <Link to='/login' className="btn btn-default border w-100 bg-light rounded-0 text-deccoration-none">Có tài khoản? Đăng nhập</Link>
        </form>
      </div>
    </div>
  )
}

// const Signup = () => {
//   return (
//     <MDBContainer fluid style={{ margin: "40px 10px", padding: "5px 50px" }}>
//       <MDBRow className='d-flex justify-content-center align-items-center h-100'>
//         <MDBCol>
//           <MDBCard className='my-4'>
//             <MDBRow className='g-0'>
//               <MDBCol md='6' className='d-none d-md-block' marginTop='5%'>
//                 <MDBCardImage
//                   width='50%'
//                   height='50%'
//                   src='/signup.png'
//                   alt='Welcom to Chigsa Clinic'
//                   className='d-flex align-items-center mx-auto'
//                   fluid
//                 />
//               </MDBCol>

//               <MDBCol md='6'>
//                 <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
//                   <MDBRow>
//                     <MDBCol md='12' className='d-flex justify-content-center'>
//                       <img src='logicon.png' alt='Logo' className='img-fluid' />
//                     </MDBCol>
//                   </MDBRow>
//                   <MDBRow>
//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Họ và tên'
//                         size='lg'
//                         id='form1'
//                         type='text'
//                       />
//                     </MDBCol>

//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Số điện thoại'
//                         size='lg'
//                         id='form2'
//                         type='tel'
//                       />
//                     </MDBCol>
//                   </MDBRow>

//                   <MDBRow>
//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Địa chỉ'
//                         size='lg'
//                         id='form3'
//                         type='text'
//                       />
//                     </MDBCol>
//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Ngày sinh'
//                         size='lg'
//                         id='form4'
//                         type='date'
//                       />
//                     </MDBCol>
//                   </MDBRow>

//                   <MDBRow>
//                     <MDBCol md='6'>
//                       <div
//                         className='d-md-flex ustify-content-start align-items-center mb-4'
//                         id='gender'
//                       >
//                         <h6 class='mb-0 me-4'>Giới tính: </h6>
//                         <MDBRadio
//                           name='inlineRadio'
//                           id='inlineRadio1'
//                           value='option1'
//                           label='Female'
//                           inline
//                         />
//                         <MDBRadio
//                           name='inlineRadio'
//                           id='inlineRadio2'
//                           value='option2'
//                           label='Male'
//                           inline
//                         />
//                       </div>
//                     </MDBCol>
//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Email'
//                         size='lg'
//                         id='form5'
//                         type='email'
//                       />
//                     </MDBCol>
//                   </MDBRow>

//                   <MDBRow>
//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Mật khẩu'
//                         size='lg'
//                         id='form6'
//                         type='password'
//                       />
//                     </MDBCol>
//                     <MDBCol md='6'>
//                       <MDBInput
//                         wrapperClass='mb-4'
//                         label='Nhập lại mật khẩu'
//                         size='lg'
//                         id='form7'
//                         type='password'
//                       />
//                     </MDBCol>
//                   </MDBRow>

//                   <div className='d-flex justify-content-end pt-3'>
//                     <MDBBtn
//                       className='ms-2'
//                       color='warning'
//                       size='lg'
//                       style={{ marginLeft: "20%", marginRight: "40%" }}
//                     >
//                       Đăng ký
//                     </MDBBtn>
//                   </div>
//                 </MDBCardBody>
//               </MDBCol>
//             </MDBRow>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

export default Signup;
