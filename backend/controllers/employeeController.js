"use strict";
// nhan vien
const employeeData = require("../data/employees");
const getAllEmployee = async (req, res, next) => {
  try {
    const employeelist = await employeeData.getEmployee();
    res.send(employeelist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllEmployee,
};
