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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/currentUser";

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
	const getUserType = (userRole) => {
		switch (userRole) {
			case "QTV":
				return "Admin User";
			case "NHANVIEN":
				return "Employee User";
			case "NHASI":
				return "Dentist User";
			case "BENHNHAN":
				return "Patient User";
			default:
				return "Public User";
		}
	};
	
	const dispatch = useDispatch();
	// const currentUser = useSelector((state) => state.user);

	axios.defaults.withCredentials = true;

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = Validation(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			axios
				.post("http://localhost:5000/login", values)
				.then((res) => {
					sessionStorage.setItem("item_key", res.data.role);
					sessionStorage.setItem("item_Type", res.data.userType);
					localStorage.setItem("item_key", res.data.SDT);
					localStorage.setItem("user",JSON.stringify({role: res.data.userType}))
					const loginEvent = new Event("loginSuccess");
        			window.dispatchEvent(loginEvent);
					navigate("/");
					console.log(sessionStorage);
					console.log(localStorage);
					const userRole = sessionStorage.getItem("item_key");
					const user = {
						SDT: res.data.SDT,
						userRole: res.data.role,
						userType: getUserType(res.data.userType),
					};
					
					dispatch(login(user));
					switch (userRole) {
						case "QTV":
							navigate("/admin");
							break;
						case "NHANVIEN":
							navigate("/employee");
							break;
						case "NHASI":
							navigate("/dentist");
							break;
						case "BENHNHAN":
							navigate("/patient");
							break;
						default:
							navigate("/");
					};
				})
				.catch((err) => {
					// Display error message
					alert(err.response.data.error);
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

