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

const drugMap = {};
const getDrugById = async (req, res, next) => {
  try {
    const druglist = await drugData.getDrug();
    for (const drug of druglist) {
      drugMap[drug.MaThuoc] = drug;
    }
    const drugId = req.params.MaThuoc;
    console.log("MaThuoc: ", drugMap[drugId]);
    const drug = drugMap[drugId];

    if (!drug) {
      res.status(404).send("Drug not found");
      return;
    }

    res.send(drug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllDrug,
  getDrugById,
};
