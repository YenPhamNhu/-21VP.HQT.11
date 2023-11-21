// https://www.youtube.com/watch?v=ErK3Qt52a1M&ab_channel=EducationwithAnkur
"use strict";
const userData = require("../data/users");
const getAllUser = async (req, res, next) => {
	try {
		const userlist = await userData.getUser();
		res.send(userlist);
	} catch (error) {
		res.status(400).send(error.message);
	}
};
// const deleteAllUser = async (req, res, next) => {};
module.exports = {
	getAllUser,
	// deleteAllUser,
};
