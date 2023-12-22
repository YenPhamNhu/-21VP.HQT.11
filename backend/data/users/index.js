"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getUser = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Users");
    const userList = await pool.request().query(sqlQueries.GetAllUser);
    return userList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};
const deleteUserBySDT = async (userSDT) => {
  try {
    // console.log("deletePatient API is called");
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("Users");
    // Modify the SQL query according to your database schema
    const result = await pool.request().input("userSDT", sql.VarChar, userSDT)
      .query`EXEC XoaTaiKhoan @SDT = ${userSDT};`;
    console.log("SQL Query Result:", result);
    return result.rowsAffected > 0; // Check if any rows were affected
  } catch (error) {
    console.log(error.message);
    throw new Error("Error deleting user");
  }
};
module.exports = {
  getUser,
  deleteUserBySDT,
};
