"use strict";

const express = require("express");
const userControll = require("../controllers/userController");
const serviceControll = require("../controllers/serviceController");
const employeeController = require("../controllers/employeeController");
const patientController = require("../controllers/patientController");
const drugController = require("../controllers/drugController");
const adminController = require("../controllers/adminController");

const router = express.Router();

// get user // nha si
const { getAllUser, getUserById, createUser, deleteUserById, updateUser } =
  userControll;

router.get("/users/getAllUser", getAllUser);
// router.get("/users/getUserById/:MaNhaSi", getUserById);

// nhan vien
const { getAllEmployee } = employeeController;
router.get("/employees/getAllEmployee", getAllEmployee);

// benh nhan
const { getAllPatient } = patientController;

router.get("/patients/getAllPatient", getAllPatient);

// qtv
const { getAllAdmin } = adminController;
router.get("/admins/getAllAdmin", getAllAdmin);

// get service
const {
  getAllService,
  getServiceById,
  createService,
  deleteServiceById,
  updateService,
} = serviceControll;

router.get("/services/getAllService", getAllService);
// router.get("/services/getServiceById/:MaDichVu", getServiceById);

// drug
const { getAllDrug } = drugController;
router.get("/drugs/getAllDrug", getAllDrug);

module.exports = {
  routes: router,
};
