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
  updateAppointmentStatus,
};
