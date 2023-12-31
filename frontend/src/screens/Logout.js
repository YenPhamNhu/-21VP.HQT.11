// export default Logout;
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/currentUser";
import axios from "axios";

function Logout() {
	const navigate = useNavigate();
	// const dispatch = useDispatch();
	const auth = localStorage.getItem("item_key");
	const handleLogout = () => {
		localStorage.clear();
		sessionStorage.clear();
		// navigate("/login");
	};

	return (
		<div className='buttons-container' style={styles.container}>
			<li>
				{auth ? (
					<Link onClick={handleLogout} to='/login' style={styles.link}>
						Đăng Xuất
					</Link>
				) : (
					<Link to='/login' style={styles.link}>
						Đăng Xuất
					</Link>
				)}
			</li>
			{/* You can add a logout message or UI here if needed */}
			<span style={styles.logoutMessage}>Logging out...</span>
		</div>
	);
}

export default Logout;

const styles = {
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	link: {
		color: "blue",
		textDecoration: "underline",
		// cursor: "pointer",
		margin: "10px",
	},
	logoutMessage: {
		fontStyle: "italic",
		color: "gray",
	},
};
