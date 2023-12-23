"use strict";
const adminData = require("../data/admins");
const patientData = require("../data/admins/index");
const config = require("../config");
const sql = require("mssql");
const getAllAdmin = async (req, res, next) => {
	try {
		const adminlist = await adminData.getAdmin();
		res.send(adminlist);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const adminMap = {};

const getAdminBySDT = async (req, res, next) => {
	try {
		const admintlist = await adminData.getAdmin();
		for (const admin of admintlist) {
			adminMap[admin.SDT] = admin;
		}
		const adminSDT = req.params.SDT;
		console.log("SDT:", adminMap[adminSDT]);
		const admin = adminMap[adminSDT];

		if (!admin) {
			res.status(404).send("Admin not found");
			return;
		}

		res.send(admin);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

// const createPatientByAdmin = async (req, res, next) => {
//   try {
//     const { HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau } = req.body;

//     // Call the function to create a patient in the data layer
//     await patientData.createPatient(
//       HoTen,
//       SDT,
//       GioiTinh,
//       NgaySinh,
//       DiaChi,
//       MatKhau
//     );

//     res.status(201).send("Patient created successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

const createPatientByAdmin = async (req, res, next) => {
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

module.exports = {
	getAllAdmin,
	getAdminBySDT,
	createPatientByAdmin,
};
