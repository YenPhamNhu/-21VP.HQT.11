// "use strict";
// const receiptData = require("../data/receipts");
// const getReceipt = async (req, res, next) => {
//   try {
//     const receiptlist = await receiptData.getReceipt();
//     res.send(receiptlist);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

"use strict";
const receiptData = require("../data/receipts");

const config = require("../config");
const sql = require("mssql");

const getAllReceipt = async (req, res, next) => {
  try {
    const receiptlist = await receiptData.getReceipt();
    res.send(receiptlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const receiptMap = {};

const getReceiptByID = async (req, res, next) => {
  try {
    const receiptlist = await receiptData.getReceipt();
    for (const receipt of receiptlist) {
      receiptMap[receipt.MaHoaDon] = receipt;
    }
    const receiptID = req.params.MaHoaDon;
    console.log("MaHoaDon:", receiptMap[receiptID]);
    const receipt = receiptMap[receiptID];

    if (!receipt) {
      res.status(404).send("Receipt not found");
      return;
    }

    res.send(receipt);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllReceipt,
  getReceiptByID,
};
