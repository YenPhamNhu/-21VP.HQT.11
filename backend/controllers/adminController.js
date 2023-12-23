"use strict";
const adminData = require("../data/admins");
const patientData = require("../data/admins/index");
const getAllAdmin = async (req, res, next) => {
  try {
    const adminlist = await adminData.getAdmin();
    res.send(adminlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const adminMap = {};

const getAdminBySDT = async (req, res, next) => {
  try {
    const admintlist = await adminData.getAdmin();
    for (const admin of admintlist) {
      adminMap[admin.SDT] = admin;
    }
    const adminSDT = req.params.SDT;
    console.log("SDT:", adminMap[adminSDT]);
    const admin = adminMap[adminSDT];

    if (!admin) {
      res.status(404).send("Admin not found");
      return;
    }

    res.send(admin);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPatientByAdmin = async (req, res, next) => {
  try {
    const { HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau } = req.body;

    // Call the function to create a patient in the data layer
    await patientData.createPatient(
      HoTen,
      SDT,
      GioiTinh,
      NgaySinh,
      DiaChi,
      MatKhau
    );

    res.status(201).send("Patient created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllAdmin,
  getAdminBySDT,
  createPatientByAdmin,
};
