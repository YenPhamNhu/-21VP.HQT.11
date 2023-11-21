"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getService = async () => {
	try {
		let pool = await sql.connect(config.sql);
		const sqlQueries = await utils.loadSqlQueries("Services");
		const serviceList = await pool.request().query(sqlQueries.GetAllService);
		return serviceList.recordset;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	getService,
};
