"use strict";
const drugData = require("../data/drugs");
const config = require("../config");
const sql = require("mssql");
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

const createDrug = async (req, res, next) => {
  try {
    const requiredFields = [
      "MaThuoc",
      "NgayHetHan",
      "TenThuoc",
      "DonViTinh",
      "DonGia",
      "ChiDinh",
      "SoLuongTonKho",
      "ThaoTac",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const pool = await sql.connect(config.sql);

    const { MaThuoc, NgayHetHan, ...rest } = req.body;

    const request = new sql.Request();

    const query = `
      EXEC QuanLyKhoThuoc
        @MaThuoc = ${parseInt(MaThuoc)},
        @NgayHetHan = '${NgayHetHan}',
        @TenThuoc = N'${rest.TenThuoc}',
        @DonViTinh = '${rest.DonViTinh}',
        @DonGia = ${parseFloat(rest.DonGia)},
        @ChiDinh = N'${rest.ChiDinh}',
        @SoLuongTonKho = ${parseFloat(rest.SoLuongTonKho)},
        @ThaoTac = '${rest.ThaoTac}';
    `;

    const result = await request.query(query);

    console.log("Stored Procedure Result:", result);

    res
      .status(201)
      .json({ success: true, message: "Drug created successfully" });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createDrug,
};

module.exports = {
	getAllDrug,
	getDrugById,
	createDrug,
};
