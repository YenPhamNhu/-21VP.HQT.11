"use strict";
const receiptData = require("../data/receipts");
const getAllReceipt = async (req, res, next) => {
  try {
    const receiptlist = await receiptData.getReceipt();
    res.send(receiptlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllReceipt,
};
