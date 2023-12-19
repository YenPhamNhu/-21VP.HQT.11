"use strict";
const drugData = require("../data/drugs");
const getAllDrug = async (req, res, next) => {
  try {
    const druglist = await drugData.getDrug();
    res.send(druglist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllDrug,
};
