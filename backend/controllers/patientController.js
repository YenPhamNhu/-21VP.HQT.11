"use strict";
// benh nhan
const patientData = require("../data/patients");
const getAllPatient = async (req, res, next) => {
  try {
    const patientlist = await patientData.getPatient();
    res.send(patientlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPatient,
};
