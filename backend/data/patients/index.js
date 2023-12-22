"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getPatient = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Patients");
    const userList = await pool.request().query(sqlQueries.GetAllPatient);
    return userList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const deletePatientBySDT = async (patientSDT) => {
  try {
    console.log("deletePatient API is called");
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Patients");
    // Modify the SQL query according to your database schema
    const result = await pool
      .request()
      .input("patientSDT", sql.VarChar, patientSDT)
      .query`EXEC XoaTaiKhoan @SDT = ${patientSDT};`;
    console.log("SQL Query Result:", result);
    return result.rowsAffected > 0; // Check if any rows were affected
  } catch (error) {
    console.log(error.message);
    throw new Error("Error deleting patient");
  }
};
module.exports = {
  getPatient,
  deletePatientBySDT,
};
