// https://www.youtube.com/watch?v=ErK3Qt52a1M&ab_channel=EducationwithAnkur
"use strict";
const serviceData = require("../data/services");
const getAllService = async (req, res, next) => {
	try {
		const servicelist = await serviceData.getService();
		res.send(servicelist);
	} catch (error) {
		res.status(400).send(error.message);
	}
};
// const deleteAllUser = async (req, res, next) => {};
module.exports = {
	getAllService,
	// deleteAllUser,
};
