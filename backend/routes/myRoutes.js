"use strict";

const express = require("express");
const userControll = require("../controllers/userController");
const serviceControll = require("../controllers/serviceController");
const employeeController = require("../controllers/employeeController");
const patientController = require("../controllers/patientController");
const drugController = require("../controllers/drugController");
const adminController = require("../controllers/adminController");
const receiptController = require("../controllers/receiptController");
const appointmentScheduleController = require("../controllers/appointmentScheduleController");
const medHistoryController = require("../controllers/medHistoryController");

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

  getAllServiceUsage,
} = serviceControll;

router.get("/services/getAllService", getAllService);
router.get("/services/getServiceById/:MaDichVu", getServiceById);

// service_usages
router.get("/services_usages/getAllServiceUsage", getAllServiceUsage);
// drug
const { getAllDrug } = drugController;
router.get("/drugs/getAllDrug", getAllDrug);

// receipt
const { getAllReceipt } = receiptController;
router.get("/receipts/getAllReceipt", getAllReceipt);

// lich hen appointmentSchedule
const { getAllAppointmentSchedule } = appointmentScheduleController;
router.get(
  "/appointmentSchedule/getAllAppointmentSchedule",
  getAllAppointmentSchedule
);

//l.ich su kham benh
const { getAllMedHistory } = medHistoryController;
router.get("/medHistory/getAllMedHistory", getAllMedHistory);

module.exports = {
  routes: router,
};
