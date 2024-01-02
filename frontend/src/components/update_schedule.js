import React, { useState ,useEffect} from "react";
import axios from "axios";

const ScheduleForm = () => {
	const [formData, setFormData] = useState({
		MaNhaSi: "",
		Ngay: "",
		CaDangKy: "Sáng",
	});

const getMaNhaSi = async () => {
  const response = await fetch(
    `http://localhost:5000/api/dentists/getDentistBySDT/${localStorage.SDT}`
  );
  const data = await response.json();
  console.log(data);
  setFormData((prevFormData) => ({
    ...prevFormData,
    MaNhaSi: data.MaNhaSi, // Update MaNhaSi with the fetched value
  }));
};
useEffect(() => {
	getMaNhaSi();
  }, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(formData);
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

	const currentDate = new Date().toISOString().split('T')[0];

	return (
		<div>
		<form onSubmit={handleSubmit} style={formStyles}>
			<div style={inputContainerStyles}>
				<label htmlFor='Ngay' style={labelStyles}>
					Ngày: 
				</label>
				<input
					type='date'
					id='Ngay'
					name='Ngay'
					value={formData.Ngay}
					onChange={handleChange}
					min={currentDate}
					style={inputStyles}
				/>
			</div>
			<div style={inputContainerStyles}>
				<label htmlFor='CaDangKy' style={labelStyles}>
					Ca: 
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
				Xác nhận
			</button>
		</form>
		</div>
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
