"use strict";
const medHistorieseData = require("../data/medHistories");
const getAllMedHistory = async (req, res, next) => {
  try {
    const medHistoriesList = await medHistorieseData.getMedHistory();
    res.send(medHistoriesList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllMedHistory,
};
