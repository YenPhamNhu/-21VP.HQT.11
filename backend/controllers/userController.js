// https://www.youtube.com/watch?v=ErK3Qt52a1M&ab_channel=EducationwithAnkur
"use strict";
const userData = require("../data/users");
const config = require("../config");
const sql = require("mssql");

const getAllUser = async (req, res, next) => {
	try {
		const userlist = await userData.getUser();
		res.send(userlist);
	} catch (error) {
		res.status(400).send(error.message);
	}
};
const userMap = {};

const getUserBySDT = async (req, res, next) => {
	try {
		const userlist = await userData.getUser();
		for (const user of userlist) {
			userMap[user.SDT] = user;
		}
		const userSDT = req.params.SDT;
		console.log("SDT:", userMap[userSDT]);
		const user = userMap[userSDT];

		if (!user) {
			res.status(404).send("User not found");
			return;
		}

		res.send(user);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		// console.log("deleteUser API is called");
		const userSDT = req.params.SDT; // Assuming userSDT is part of the URL parameters
		// Perform validation or additional checks if needed
		// console.log("Deleting patient with ID:", userSDT);
		const deletedUser = await userData.deleteUserBySDT(userSDT);
		console.log(deletedUser);

		res.send({ message: "User deleted successfully", deletedUser });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const createUser = async (req, res, next) => {
	try {
		const requiredFields = [
			"HoTen",
			"SDT",
			"GioiTinh",
			"NgaySinh",
			"DiaChi",
			"MatKhau",
		];
		for (const field of requiredFields) {
			if (!req.body[field]) {
				return res.status(400).json({ error: `${field} is required` });
			}
		}

		const pool = await sql.connect(config.sql);

		const {
			HoTen = "Bệnh nhân mới",
			NgaySinh = "1990-01-01",
			...rest
		} = req.body;

		const request = new sql.Request();

		const query = `
      EXEC TaoTaiKhoanBenhNhan
        @HoTen = N'${HoTen}',
        @SDT = '${rest.SDT}',
        @GioiTinh = N'${rest.GioiTinh.toLowerCase() === "male" ? "Nam" : "Nữ"}',
        @NgaySinh = '${NgaySinh}',
        @DiaChi = N'${rest.DiaChi}',
        @MatKhau = N'${rest.MatKhau}';
    `;

		const result = await request.query(query);

		console.log("Stored Procedure Result:", result);

		res
			.status(201)
			.json({ success: true, message: "User registered successfully" });
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

// const deleteAllUser = async (req, res, next) => {};
module.exports = {
	getAllUser,
	getUserBySDT,
	deleteUser,
	createUser,
	// deleteAllUser,
};
