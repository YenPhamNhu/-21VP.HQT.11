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

const deleteEmployee = async (req, res, next) => {
  try {
    // console.log("deleteEmployee API is called");
    const employeeSDT = req.params.SDT; // Assuming employeeSDT is part of the URL parameters
    // Perform validation or additional checks if needed
    // console.log("Deleting employee with ID:", employeeSDT);
    const deletedEm = await employeeData.deleteEmployeeBySDT(employeeSDT);
    console.log(deletedEm);

    res.send({ message: "Employee deleted successfully", deletedEm });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllEmployee,
  getEmployeeBySDT,
  deleteEmployee,
};
