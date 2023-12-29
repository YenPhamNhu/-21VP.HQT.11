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

const patientMap = {};

const getPatientBySDT = async (req, res, next) => {
  try {
    const patientlist = await patientData.getPatient();
    for (const patient of patientlist) {
      patientMap[patient.SDT] = patient;
    }
    const patientSDT = req.params.SDT;
    console.log("SDT:", patientMap[patientSDT]);
    const patient = patientMap[patientSDT];

    if (!patient) {
      res.status(404).send("Patient not found");
      return;
    }

    res.send(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPatient,
  getPatientBySDT,
};
