import "../screen.css/Main.css";
import "../components/banner.js";
import Banner from "../components/banner.js";
import Header from "../components/header.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
const Main = () => {
	const [name, setName] = useState("");
	// const navigate = userNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:5000")
			.then((res) => {
				// console.log(res)
				if (res.data.valid) {
					setName(res.data.SDT);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<main class='container-img' id='main'>
			{/* <Header /> */}
			<div className='welcome-section'>
				<h2>Welcome {name} to Chigsa!</h2>
				<p>Explore our services and enjoy a seamless experience.</p>
			</div>
			<Banner />
		</main>
	);
};

export default Main;

// import "../screen.css/Main.css";
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
// import Banner from "../components/banner";
// import "../screen.css/Main.css";
// import axios from "axios";

// const Main = () => {
// const [name, setName] = useState("");
// // const navigate = userNavigate();
// useEffect(() => {
// 	axios
// 		.get("http://localhost:5000")
// 		.then((res) => {
// 			// console.log(res)
// 			if (res.data.valid) {
// 				setName(res.data.SDT);
// 			}
// 		})
// 		.catch((err) => console.log(err));
// }, []);
// 	return (
// 		// <div className="Main">
// 		// 	<BrowserRouter>
// 		// 	<Routes>
// 		// 		<Route path="/login" element={<h1>Product Component</h1>}></Route>
// 		// 	</Routes>
// 		// 	</BrowserRouter>
// 		// 	<div className='welcome-section'>
// 		// 		<h2>Welcome {name} to Chigsa!</h2>
// 		// 		<p>Explore our services and enjoy a seamless experience.</p>
// 		// 	</div>
// 		// </div>
// 		<main className='container-img' id='main'>
// 			<div className='buttons-container'>
// 				<Link to='/login' className='btn btn-primary'>
// 					Đăng Nhập
// 				</Link>
// 				<Link to='/signup' className='btn btn-secondary'>
// 					Đăng Ký
// 				</Link>
// 			</div>

// <div className='welcome-section'>
// 	<h2>Welcome {name} to Chigsa!</h2>
// 	<p>Explore our services and enjoy a seamless experience.</p>
// </div>

// 			<Banner />
// 		</main>
// 	);
// };
