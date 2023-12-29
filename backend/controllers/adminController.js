"use strict";
const adminData = require("../data/admins");
const patientData = require("../data/admins/index");
const employeeData = require("../data/admins/index");
const userData = require("../data/admins/index");

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
//admins/createEmployeeByAdmin
const createEmployeeByAdmin = async (req, res, next) => {
  try {
    const requiredFields = [
      "HoTen",
      "SDT",
      "GioiTinh",
      "DiaChi",
      "TinhTrangHoatDong",
      "ViTri",
      "MatKhau",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const pool = await sql.connect(config.sql);

    const {
      HoTen = "Nhân Viên mới",
      NgaySinh = "1990-01-01",
      ...rest
    } = req.body;

    const request = new sql.Request();

    const query = `
      EXEC TaoTaiKhoanNhanVien
        @HoTen = N'${HoTen}',
        @SDT = '${rest.SDT}',
        @GioiTinh = N'${rest.GioiTinh.toLowerCase() === "male" ? "Nam" : "Nữ"}',
        @DiaChi = N'${rest.DiaChi}',
        @TinhTrangHoatDong = N'${rest.TinhTrangHoatDong}',
        @ViTri = N'${rest.ViTri}',
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

//admins/createDentistByAdmin
const createDentistByAdmin = async (req, res, next) => {
  try {
    const requiredFields = [
      "HoTen",
      "SDT",
      "GioiTinh",
      "NgaySinh",
      "DiaChi",
      "ChuyenMon",
      "BangCap",
      "MatKhau",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const pool = await sql.connect(config.sql);

    const { HoTen = "Nha Sĩ mới", NgaySinh = "1990-01-01", ...rest } = req.body;

    const request = new sql.Request();

    const query = `
      EXEC TaoTaiKhoanNhaSi
        @HoTen = N'${HoTen}',
        @SDT = '${rest.SDT}',
        @GioiTinh = N'${rest.GioiTinh.toLowerCase() === "male" ? "Nam" : "Nữ"}',
        @NgaySinh = '${NgaySinh}',
        @DiaChi = N'${rest.DiaChi}',
        @ChuyenMon = N'${rest.ChuyenMon}',
        @BangCap = N'${rest.BangCap}',
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

// delete user
const deletePatientByAdmin = async (req, res, next) => {
  try {
    // console.log("deletePatient API is called");
    const patientSDT = req.params.SDT; // Assuming patientSDT is part of the URL parameters
    // Perform validation or additional checks if needed
    // console.log("Deleting patient with ID:", patientSDT);
    const deletedP = await patientData.deletePatientBySDT(patientSDT);
    console.log(deletedP);

    res.send({ message: "Patient deleted successfully", deletedP });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteEmployeeByAdmin = async (req, res, next) => {
  try {
    // console.log("deleteEmployee API is called");
    const employeeSDT = req.params.SDT; // Assuming employeeSDT is part of the URL parameters
    // Perform validation or additional checks if needed
    // console.log("Deleting employee with ID:", employeeSDT);
    const deletedEm = await employeeData.deleteEmployeeBySDT(employeeSDT);
    console.log(deletedEm);

    res.send({ message: "Employee deleted successfully", deletedEm });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteDentistByAdmin = async (req, res, next) => {
  try {
    // console.log("deleteUser API is called");
    const userSDT = req.params.SDT; // Assuming userSDT is part of the URL parameters
    // Perform validation or additional checks if needed
    // console.log("Deleting patient with ID:", userSDT);
    const deletedUser = await userData.deleteDentistBySDT(userSDT);
    console.log(deletedUser);

    res.send({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllAdmin,
  getAdminBySDT,
  createPatientByAdmin,
  createEmployeeByAdmin,
  createDentistByAdmin,
  deletePatientByAdmin,
  deleteEmployeeByAdmin,
  deleteDentistByAdmin,
};
