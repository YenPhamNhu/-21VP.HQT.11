"use strict";
const config = require("../config");
const sql = require("mssql");

const appointmentScheduleData = require("../data/appointmentSchedules");

const getAllAppointmentSchedule = async (req, res, next) => {
  try {
    const appointmentScheduleList =
      await appointmentScheduleData.getAppointmentSchedule();
    res.send(appointmentScheduleList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUpcomingAppointments = async (req, res, next) => {
  try {
    const allAppointments =
      await appointmentScheduleData.getAppointmentSchedule();

    // Lọc những lịch hẹn sắp tới (thời gian lớn hơn hoặc bằng thời điểm hiện tại)
    const upcomingAppointments = allAppointments.filter(
      (appointment) =>
        new Date(appointment.NgayGioKham) >= new Date() &&
        appointment.TrangThaiLichHen === "Đã đặt"
    );

    res.status(200).json({
      success: true,
      data: upcomingAppointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const appointmentScheduleMap = {};
const getAppointmentScheduleByMaBenhNhan = async (req, res, next) => {
  try {
    const appointmentList =
      await appointmentScheduleData.getAppointmentSchedule();
    for (const appointment of appointmentList) {
      appointmentScheduleMap[appointment.MaBenhNhan] = appointment;
    }
    const appointmentMaBenhNhan = req.params.MaBenhNhan;
    console.log("MaBenhNhan:", appointmentScheduleMap[appointmentMaBenhNhan]);
    console.log("appointmentMaBenhNhan:", appointmentMaBenhNhan);
    const appointment = appointmentScheduleMap[appointmentMaBenhNhan];

    if (!appointment) {
      res.status(404).send("appointmentMaBenhNhan not found");
      return;
    }

    res.send(appointment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Declare the appointmentScheduleMap object outside the function
// const appointmentScheduleMap = {};

const getAppointmentScheduleByMaNhaSi = async (req, res, next) => {
  try {
    const appointmentList =
      await appointmentScheduleData.getAppointmentSchedule();
    for (const appointment of appointmentList) {
      appointmentScheduleMap[appointment.MaNhaSi] = appointment;
    }
    const appointmentMaNhaSi = req.params.MaNhaSi;
    console.log("MaNhaSi:", appointmentScheduleMap[appointmentMaNhaSi]);
    const appointment = appointmentScheduleMap[appointmentMaNhaSi];

    if (!appointment) {
      res.status(404).send("appointmentMaNhaSi not found");
      return;
    }

    res.send(appointment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// cập nhât trạng thái lịch hẹn
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { MaLichHen, TrangThaiMoi } = req.body;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();

    try {
      // Call the stored procedure with parameterized query
      const result = await request
        .input("MaLichHen", sql.Int, MaLichHen)
        .input("TrangThaiMoi", sql.NVarChar(50), TrangThaiMoi).query(`
          EXEC CapNhatTrangThaiLichHen
          @MaLichHen = ${MaLichHen},
          @TrangThaiMoi = N'${TrangThaiMoi}'
      `);
      // Check the result of the query
      if (result.rowsAffected[0] > 0) {
        res.status(200).json({
          success: true,
          message: "Appointment status updated successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          error:
            "Failed to update appointment status. Please check the input parameters.",
        });
      }
    } catch (err) {
      throw err;
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllAppointmentSchedule,
  getUpcomingAppointments,
  updateAppointmentStatus,
  getAppointmentScheduleByMaBenhNhan,
  getAppointmentScheduleByMaNhaSi,
};
