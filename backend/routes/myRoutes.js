"use strict";

const express = require("express");
const userControll = require("../controllers/userController");
const serviceControll = require("../controllers/serviceController");
const router = express.Router();

const { getAllUser, getUserById, createUser, deleteUserById, updateUser } =
	userControll;

router.get("/users/getAllUser", getAllUser);

const {
	getAllService,
	getServiceById,
	createService,
	deleteServiceById,
	updateService,
} = serviceControll;

router.get("/services/getAllService", getAllService);

module.exports = {
	routes: router,
};
