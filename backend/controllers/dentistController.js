"use strict";
// benh nhan
const dentistData = require("../data/dentists");
const getAllDentist = async (req, res, next) => {
  try {
    const dentisList = await dentistData.getDentist();
    res.send(dentisList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const dentistMap = {};

const getDentistBySDT = async (req, res, next) => {
  try {
    const dentisList = await dentistData.getDentist();
    for (const dentist of dentisList) {
      dentistMap[dentist.SDT] = dentist;
    }
    const dentistSDT = req.params.SDT;
    console.log("SDT:", dentistMap[dentistSDT]);
    const dentist = dentistMap[dentistSDT];

    if (!dentist) {
      res.status(404).send("Dentist not found");
      return;
    }

    res.send(dentist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllDentist,
  getDentistBySDT,
};
