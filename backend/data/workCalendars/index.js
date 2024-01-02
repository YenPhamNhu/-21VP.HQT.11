"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getWorkCalendar = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("WorkCalendars");
    const workList = await pool.request().query(sqlQueries.GetAllWorkCalendar);
    return workList.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getWorkCalendar,
};
