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

module.exports = {
  getAdmin,
};
