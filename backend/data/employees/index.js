"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getEmployee = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Employees");
    const userList = await pool.request().query(sqlQueries.GetAllEmployee);
    return userList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteEmployeeBySDT = async (employeeSDT) => {
  try {
    // console.log("deletePatient API is called");
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Employees");
    // Modify the SQL query according to your database schema
    const result = await pool
      .request()
      .input("employeeSDT", sql.VarChar, employeeSDT)
      .query`EXEC XoaTaiKhoan @SDT = ${employeeSDT};`;
    console.log("SQL Query Result:", result);
    return result.rowsAffected > 0; // Check if any rows were affected
  } catch (error) {
    console.log(error.message);
    throw new Error("Error deleting employee");
  }
};

module.exports = {
  getEmployee,
  deleteEmployeeBySDT,
};
