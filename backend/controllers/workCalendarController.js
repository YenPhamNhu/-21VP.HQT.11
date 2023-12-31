"use strict";
const workData = require("../data/workCalendars");

const config = require("../config");
const sql = require("mssql");

const getAllWorkCalendar = async (req, res, next) => {
  try {
    const worklist = await workData.getWorkCalendar();
    res.send(worklist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllWorkCalendar,
};
