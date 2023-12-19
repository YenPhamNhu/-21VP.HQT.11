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

module.exports = {
  getAllAdmin,
};
