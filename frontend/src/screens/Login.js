import React, { useState } from "react";
import {
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

function Login() {
	const [values, setValues] = useState({
		SDT: "",
		MatKhau: "",
	});
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const handleInput = (event) => {
		setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	axios.defaults.withCredentials = true;

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = Validation(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			axios
				.post("http://localhost:5000/login", values)
				.then((res) => {
					// Alert Log-in thanh cong
					// alert(res.data.message);
					// Navigate to Home page
					navigate("/");
				})
				.catch((err) => {
					// Display error message
					alert(err.response.data.error);
				});
		}
		// if (Object.keys(validationErrors).length === 0) {
		// 	axios
		// 		.post("http://localhost:5000/login", values)
		// 		.then((res) => {
		// 			const { userRole } = res.data;

		// 			// Assign userRole to USER_TYPE
		// 			switch (userRole) {
		//         case "QTV":
		//           CURRENT_USER_TYPE.current = "ADMIN";
		//           break;
		//         case "NHANVIEN":
		//           CURRENT_USER_TYPE.current = "EMPLOYEE";
		//           break;
		//         case "NHASI":
		//           CURRENT_USER_TYPE.current = "DENTIST";
		//           break;
		//         case "BENHNHAN":
		//           CURRENT_USER_TYPE.current = "PATIENT";
		//           break;
		//         default:
		//           CURRENT_USER_TYPE.current = "PUBLIC";
		//       }

		// 			// Display success message on the screen
		// 			alert(res.data.message);

		// 			// Navigate to the desired page
		// 			navigate("/");
		// 		})
		// 		.catch((err) => {
		// 			// Display error message on the screen
		// 			alert(err.response.data.error);
		// 		});
		// }
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
	//                   alt='Welcome to Chigsa Clinic'
	//                   className='d-flex align-items-center mx-auto'
	//                   fluid
	//                 />
	//               </MDBCol>
	//               <MDBCol md='6'>
	//                 <div className="bg-white p-3 rounded">
	//                   <form onSubmit={handleSubmit}>
	//                     <div className="mb-3">
	//                       <label htmlFor="SDT"><strong>Số điện thoại</strong></label>
	//                       <input type="text" placeholder="Số điện thoại" name='SDT'
	//                         onChange={handleInput}
	//                         className="form-control rounded-0" />
	//                       {errors.SDT && <span className="text-danger">{errors.SDT}</span>}
	//                     </div>
	//                     <div className="mb-3">
	//                       <label htmlFor="MatKhau"><strong>Mật khẩu</strong></label>
	//                       <input type="password" placeholder="Mật khẩu" name='MatKhau'
	//                         onChange={handleInput}
	//                         className="form-control rounded-0" />
	//                       {errors.MatKhau && <span className="text-danger">{errors.MatKhau}</span>}
	//                     </div>
	//                     <button type="submit" className="btn btn-success w-100 rounded-0">Đăng nhập</button>
	//                     <Link to='/signup' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Chưa có tài khoản? Đăng ký</Link>
	//                   </form>
	//                 </div>
	//               </MDBCol>
	//             </MDBRow>
	//           </MDBCard>
	//         </MDBCol>
	//       </MDBRow>
	//     </MDBContainer>
	//   );
	// }
	return (
		<MDBContainer fluid style={{ margin: "40px 10px" }}>
			<MDBRow
				className='d-flex justify-content-center align-items-center'
				id='logcontain'
			>
				<MDBCol md='6' className='mx-auto'>
					<MDBCard>
						<MDBCardBody
							className='text-black d-flex flex-column justify-content-center'
							id='logcontain'
						>
							<MDBRow>
								<MDBCol md='12' className='d-flex justify-content-center'>
									<img src='logicon.png' alt='Logo' className='img-fluid' />
								</MDBCol>
							</MDBRow>

							<MDBRow>
								<MDBCol md='12'>
									{errors.SDT && (
										<span className='text-danger'>{errors.SDT}</span>
									)}
									<MDBInput
										wrapperClass='mb-4'
										label='Số điện thoại'
										size='lg'
										id='logtel'
										type='tel'
										name='SDT'
										value={values.SDT}
										onChange={handleInput}
										errorMessage={errors.SDT}
										required
									/>
								</MDBCol>
							</MDBRow>
							<MDBRow>
								<MDBCol md='12'>
									{errors.SDT && (
										<span className='text-danger'>{errors.MatKhau}</span>
									)}
									<MDBInput
										wrapperClass='mb-4'
										label='Mật khẩu'
										size='lg'
										id='logpass'
										type='password'
										value={values.MatKhau}
										onChange={handleInput}
										errorMessage={errors.MatKhau}
										name='MatKhau'
										required
									/>
								</MDBCol>
							</MDBRow>
							<MDBRow>
								<MDBCol md='6' className='d-flex justify-content-start'>
									<MDBCheckbox label='Ghi nhớ mật khẩu' id='rememberMatKhau' />
								</MDBCol>

								<MDBCol md='6' className='d-flex justify-content-end'>
									<Nav.Link as={Link} to='/forgetpass' className='text-primary'>
										Quên mật khẩu?
									</Nav.Link>
								</MDBCol>
							</MDBRow>
							<div className='d-flex justify-content-center pt-3'>
								<MDBBtn
									className='ms-2'
									color='warning'
									size='lg'
									onClick={handleSubmit}
								>
									Đăng nhập
								</MDBBtn>
							</div>
							<div className='d-flex justify-content-center pt-3'>
								<Nav.Link as={Link} to='/signup' className='text-primary'>
									Chưa có tài khoản? Đăng ký
								</Nav.Link>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
}

export default Login;
