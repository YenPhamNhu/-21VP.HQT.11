"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getAdmin = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Admins");
    const adminList = await pool.request().query(sqlQueries.GetAllAdmin);
    return adminList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const createPatient = async (
  HoTen,
  SDT,
  GioiTinh,
  NgaySinh,
  DiaChi,
  MatKhau
) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Patients");
    const formattedDate = NgaySinh.split("T")[0];
    console.log(NgaySinh);
    // Call the stored procedure to create a patient
    await pool
      .request()
      .input("HoTen", sql.NVarChar(50), HoTen)
      .input("SDT", sql.VarChar(10), SDT)
      .input("GioiTinh", sql.NVarChar(5), GioiTinh)
      .input("NgaySinh", sql.DateTime, formattedDate)
      .input("DiaChi", sql.NVarChar(50), DiaChi)
      .input("MatKhau", sql.VarChar(8), MatKhau)
      .query`EXEC TaoTaiKhoanBenhNhan N'${HoTen}','${SDT}','${GioiTinh}','${formattedDate}',N'${DiaChi}','${MatKhau}'`;

    // You need to create the stored procedure CreatePatient in your SQL database
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  getAdmin,
  createPatient,
};
