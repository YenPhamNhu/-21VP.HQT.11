import "../screen.css/Main.css";
import "../components/banner.js";
import Banner from "../components/banner.js";
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
					setName(res.data.HoTen);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<main class='container-img' id='main'>
			
			{/* <SwipeableTemporaryDrawer/> */}
			<div className='welcome-section'>
				
				<h2>Welcome {name} to Chigsa!</h2>
				<p>Explore our services and enjoy a seamless experience.</p>
			</div>
			<Banner />
		</main>
	);
};

export default Main;

