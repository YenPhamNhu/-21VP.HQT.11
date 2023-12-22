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

const deletePatient = async (req, res, next) => {
  try {
    console.log("deletePatient API is called");
    const patientSDT = req.params.SDT; // Assuming patientSDT is part of the URL parameters
    // Perform validation or additional checks if needed
    console.log("Deleting patient with ID:", patientSDT);
    const deletedP = await patientData.deletePatientBySDT(patientSDT);
    console.log(deletedP);
    if (deletedP) {
      res.send({ message: "Patient deleted successfully", deletedP });
    } else {
      res.status(404).send({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllPatient,
  getPatientBySDT,
  deletePatient,
};
