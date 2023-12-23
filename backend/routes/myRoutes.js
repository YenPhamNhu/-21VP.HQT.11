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

//http://localhost:5000/api/users/getAllUser
router.get("/users/getAllUser", getAllUser); //DONE
router.get("/users/getUserBySDT/:SDT", getUserBySDT);
router.delete("/users/deleteUser/:SDT", deleteUser);
router.post("/users/createUser", createUser);

// NHAN VIEN
const { getAllEmployee, getEmployeeBySDT, deleteEmployee } = employeeController;
// http://localhost:5000/api/employees/getAllEmployee
router.get("/employees/getAllEmployee", getAllEmployee);
router.get("/employees/getEmployeeBySDT/:SDT", getEmployeeBySDT);
router.delete("/employees/deleteEmployee/:SDT", deleteEmployee);

// BENH NHAN
const { getAllPatient, getPatientBySDT, deletePatient } = patientController;

// http://localhost:5000/api/patients/getAllPatient
router.get("/patients/getAllPatient", getAllPatient); //DONE
//http://localhost:5000/api/patients/getPatientBySDT/0123456780
router.get("/patients/getPatientBySDT/:SDT", getPatientBySDT);
// http://localhost:5000/api/patients/deletePatient/0123456780
//"message": "Error deleting patient"
router.delete("/patients/deletePatient/:SDT", deletePatient);

// qtv
const { getAllAdmin, getAdminBySDT, createPatientByAdmin } = adminController;
router.get("/admins/getAllAdmin", getAllAdmin);
router.get("/admins/getAdminBySDT/:SDT", getAdminBySDT);
router.post("/admins/createPatientByAdmin", createPatientByAdmin);
// get service
const {
	getAllService,
	getServiceById,
	createService,
	deleteService,
	updateService,

	getAllServiceUsage,
} = serviceControll;

router.get("/services/getAllService", getAllService); //DONE
router.get("/services/getServiceById/:MaDichVu", getServiceById); //DONE
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
