"use strict";
const config = require("../config");
const sql = require("mssql");
// nha si
const dentistData = require("../data/dentists");
const getAllDentist = async (req, res, next) => {
  try {
    const dentisList = await dentistData.getDentist();
    res.send(dentisList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const dentistMap = {};

const getDentistBySDT = async (req, res, next) => {
  try {
    const dentisList = await dentistData.getDentist();
    for (const dentist of dentisList) {
      dentistMap[dentist.SDT] = dentist;
    }
    const dentistSDT = req.params.SDT;
    console.log("SDT:", dentistMap[dentistSDT]);
    const dentist = dentistMap[dentistSDT];

    if (!dentist) {
      res.status(404).send("Dentist not found");
      return;
    }

    res.send(dentist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateInfDentist = async (req, res, next) => {
  try {
    const { SDT } = req.params;
    const { HoTen, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap } = req.body;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();

    // Call the stored procedure to update employee information
    const query = `
      EXEC CapNhatThongTinNhaSi
        @SDT = '${SDT}',
        @HoTen = N'${HoTen}',
        @GioiTinh = N'${GioiTinh}',
        @NgaySinh = '${NgaySinh}',
        @DiaChi = N'${DiaChi}',
        @ChuyenMon = N'${ChuyenMon}',
        @BangCap = '${BangCap}';
    `;

    const result = await request.query(query);

    // Check the result of the stored procedure
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({
        success: true,
        message: "Employee information updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Employee not found or information could not be updated",
      });
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// dang ky ca lam viec
const updateScheduleByDentist = async (req, res, next) => {
  try {
    const { MaNhaSi, Ngay, CaDangKy } = req.body;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();
    console.log("Received request:", req.body);
    // Execute the stored procedure
    const query = `
      EXEC CapNhatLichLamViec
        @MaNhaSi = ${MaNhaSi},
        @Ngay = '${Ngay}',
        @CaDangKy = N'${CaDangKy}';
      `;
    const result = await request.query(query);
    console.log("SQL Query result:", result);
    // Check the result of the stored procedure
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({
        success: true,
        message: "Schedule updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to update schedule. Please check the input parameters.",
      });
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const recordMedical = async (req, res, next) => {
  try {
    const { SDT } = req.params;
    const { NgayGioKham, HoTenNhaSi } = req.body;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();

    // Call the stored procedure to update medical records
    const query = `
      EXEC GhiNhanHoSoBenhAn
        @SDT = '${SDT}',
        @NgayGioKham = '${NgayGioKham}',
        @HoTenNhaSi = N'${HoTenNhaSi}';
    `;

    const result = await request.query(query);

    // Check the result of the stored procedure
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({
        success: true,
        message: "Medical record updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Patient not found or medical record could not be updated",
      });
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllDentist,
  getDentistBySDT,
  updateInfDentist,
  updateScheduleByDentist,
  recordMedical,
};
