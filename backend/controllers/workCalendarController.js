"use strict";
const workData = require("../data/workCalendars/index.js");

const config = require("../config");
const sql = require("mssql");

const adminMap = {};
const getAllWorkCalendar = async (req, res, next) => {
	try {
		const worklist = await workData.getWorkCalendar();
		res.send(worklist);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const getAllWorkCalendarBySDT = async (req, res, next) => {
	try {
		const admintlist = await workData.getWorkCalendar();
		for (const admin of admintlist) {
			adminMap[admin.SDT] = admin;
		}
		const adminSDT = req.params.SDT;
		console.log("SDT:", adminMap[adminSDT]);
		const admin = adminMap[adminSDT];

		if (!admin) {
			res.status(404).send("Work Calendar not found");
			return;
		}

		res.send(admin);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = {
	getAllWorkCalendar,
	getAllWorkCalendarBySDT,
};
