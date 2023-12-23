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
const { getAllUser, getUserBySDT, createUser, deleteUser, updateUser } =
  userControll;

router.get("/users/getAllUser", getAllUser);
router.get("/users/getUserBySDT/:SDT", getUserBySDT);
router.delete("/users/deleteUser/:SDT", deleteUser);

// nhan vien
const { getAllEmployee, getEmployeeBySDT, deleteEmployee } = employeeController;
router.get("/employees/getAllEmployee", getAllEmployee);
router.get("/employees/getEmployeeBySDT/:SDT", getEmployeeBySDT);
router.delete("/employees/deleteEmployee/:SDT", deleteEmployee);

// benh nhan
const { getAllPatient, getPatientBySDT, deletePatient } = patientController;

router.get("/patients/getAllPatient", getAllPatient);
router.get("/patients/getPatientBySDT/:SDT", getPatientBySDT);
router.delete("/patients/deletePatient/:SDT", deletePatient);

// qtv
const { getAllAdmin, getAdminBySDT } = adminController;
router.get("/admins/getAllAdmin", getAllAdmin);
router.get("/admins/getAdminBySDT/:SDT", getAdminBySDT);

// get service
const {
  getAllService,
  getServiceById,
  createService,
  deleteService,
  updateService,

  getAllServiceUsage,
} = serviceControll;

router.get("/services/getAllService", getAllService);
router.get("/services/getServiceById/:MaDichVu", getServiceById);
// router.delete("/services/deleteService/:MaDichVu", deleteService);

// service_usages
router.get("/services_usages/getAllServiceUsage", getAllServiceUsage);

// drug
const { getAllDrug, getDrugById, updateDrug, createDrug } = drugController;
router.get("/drugs/getAllDrug", getAllDrug);
router.get("/drugs/getAllDrugByID/:MaThuoc", getDrugById);

// receipt
const { getAllReceipt } = receiptController;
router.get("/receipts/getAllReceipt", getAllReceipt);

// lich hen appointmentSchedule
const { getAllAppointmentSchedule } = appointmentScheduleController;
router.get(
  "/appointmentSchedule/getAllAppointmentSchedule",
  getAllAppointmentSchedule
);

//lich su kham benh
const { getAllMedHistory } = medHistoryController;
router.get("/medHistory/getAllMedHistory", getAllMedHistory);

module.exports = {
  routes: router,
};
