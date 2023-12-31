import React from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/header_user.js";
// import SwipeableTemporaryDrawer from "../../components/sidebar_admin.js";
const MainAdmin = () => {
	return (
		<div className='container mt-5'>
			<div className='d-flex justify-content-begin mt-4'>
				{/* <SwipeableTemporaryDrawer /> */}
				{/* <Header /> */}
			</div>
			<h1 className='mb-4'>Admin Home Page</h1>
			<p>
				Welcome to the Admin Home Page. Here, you can manage various aspects of
				your application.
			</p>
		</div>
	);
};

export default MainAdmin;
