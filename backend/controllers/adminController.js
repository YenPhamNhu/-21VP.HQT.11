"use strict";
const adminData = require("../data/admins");
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
      res.status(404).send("Patient not found");
      return;
    }

    res.send(admin);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllAdmin,
  getAdminBySDT,
};
