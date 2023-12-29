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

const employeeMap = {};

const getEmployeeBySDT = async (req, res, next) => {
  try {
    const employeelist = await employeeData.getEmployee();
    for (const employee of employeelist) {
      employeeMap[employee.SDT] = employee;
    }
    const employeeSDT = req.params.SDT;
    console.log("SDT:", employeeMap[employeeSDT]);
    const employee = employeeMap[employeeSDT];

    if (!employee) {
      res.status(404).send("Employee not found");
      return;
    }

    res.send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllEmployee,
  getEmployeeBySDT,
};
