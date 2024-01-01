import React, { useState } from "react";
import axios from "axios";

const ScheduleForm = () => {
	const [formData, setFormData] = useState({
		MaNhaSi: 100,
		Ngay: "",
		CaDangKy: "Sáng",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/dentists/updateSchedule",
				{
					...formData,
					Ngay: new Date(formData.Ngay).toISOString().split("T")[0],
				}
			);
			console.log("API response:", response.data);
		} catch (error) {
			console.error("API error:", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} style={formStyles}>
			<div style={inputContainerStyles}>
				<label htmlFor='MaNhaSi' style={labelStyles}>
					MaNhaSi:
				</label>
				<input
					type='number'
					id='MaNhaSi'
					name='MaNhaSi'
					value={formData.MaNhaSi}
					onChange={handleChange}
					style={inputStyles}
				/>
			</div>
			<div style={inputContainerStyles}>
				<label htmlFor='Ngay' style={labelStyles}>
					Ngay:
				</label>
				<input
					type='datetime-local'
					id='Ngay'
					name='Ngay'
					value={formData.Ngay}
					onChange={handleChange}
					style={inputStyles}
				/>
			</div>
			<div style={inputContainerStyles}>
				<label htmlFor='CaDangKy' style={labelStyles}>
					CaDangKy:
				</label>
				<select
					id='CaDangKy'
					name='CaDangKy'
					value={formData.CaDangKy}
					onChange={handleChange}
					style={inputStyles}
				>
					<option value='Sáng'>Sáng</option>
					<option value='Chiều'>Chiều</option>
				</select>
			</div>
			<button type='submit' style={buttonStyles}>
				Submit
			</button>
		</form>
	);
};

const formStyles = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "300px",
	margin: "0 auto",
};

const inputContainerStyles = {
	marginBottom: "20px",
};

const labelStyles = {
	marginBottom: "5px",
};

const inputStyles = {
	padding: "5px",
	borderRadius: "4px",
	border: "1px solid #ccc",
};

const buttonStyles = {
	padding: "10px 20px",
	borderRadius: "4px",
	backgroundColor: "#4CAF50",
	color: "white",
	border: "none",
	cursor: "pointer",
};

export default ScheduleForm;
