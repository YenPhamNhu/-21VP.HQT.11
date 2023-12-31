"use strict";
const config = require("../config");
const sql = require("mssql");

// benh nhan
const patientData = require("../data/patients");
const getAllPatient = async (req, res, next) => {
  try {
    const patientlist = await patientData.getPatient();
    res.send(patientlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const patientMap = {};

const getPatientBySDT = async (req, res, next) => {
  try {
    const patientlist = await patientData.getPatient();
    for (const patient of patientlist) {
      patientMap[patient.SDT] = patient;
    }
    const patientSDT = req.params.SDT;
    console.log("SDT:", patientMap[patientSDT]);
    const patient = patientMap[patientSDT];

    if (!patient) {
      res.status(404).send("Patient not found");
      return;
    }

    res.send(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateInfPatient = async (req, res, next) => {
  try {
    const { SDT } = req.params;
    const { HoTen, GioiTinh, NgaySinh, DiaChi } = req.body;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();

    // Call the stored procedure to update patient information
    const query = `
      EXEC CapNhatThongTin
        @SDT = '${SDT}',
        @HoTen = N'${HoTen}',
        @GioiTinh = N'${GioiTinh}',
        @NgaySinh = '${NgaySinh}',
        @DiaChi = N'${DiaChi}';
    `;

    const result = await request.query(query);

    // Check the result of the stored procedure
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({
        success: true,
        message: "Patient information updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Patient not found or information could not be updated",
      });
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// const scheduleAppointment = async (req, res, next) => {
//   try {
//     const { Ngay, SDT, MaNhaSi, CaDangKy } = req.body;

//     // Connect to the SQL Server database
//     const pool = await sql.connect(config.sql);
//     const request = new sql.Request();
//     console.log("Received request to schedule appointment:", {
//       Ngay,
//       SDT,
//       MaNhaSi,
//       CaDangKy,
//     });

//     // Call the stored procedure to schedule an appointment
//     const query = `
//       EXEC DatLichHen
//         @Ngay = '${Ngay}',
//         @SDT = '${SDT}',
//         @MaNhaSi = ${MaNhaSi},
//         @CaDangKy = N'${CaDangKy}';
//     `;

//     const result = await request.query(query);

//     // Check the result of the stored procedure
//     if (result.rowsAffected[0] > 0) {
//       console.log(result);
//       res.status(200).json({
//         success: true,
//         message: "Appointment scheduled successfully",
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         error:
//           "Failed to schedule appointment. Please select another schedule.",
//       });
//     }
//   } catch (err) {
//     console.error("Error executing SQL query:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// đặt lịch hẹn
const scheduleAppointment = async (req, res, next) => {
  try {
    const { Ngay, SDT, MaNhaSi, CaDangKy } = req.body;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();

    // Execute the stored procedure
    const result = await request
      .input("Ngay", sql.DateTime, Ngay)
      .input("SDT", sql.VarChar(10), SDT)
      .input("MaNhaSi", sql.Int, MaNhaSi)
      .input("CaDangKy", sql.NVarChar(50), CaDangKy)
      .execute(`DatLichHen`);

    // Check the result of the stored procedure
    if (result.returnValue === 0 && result.rowsAffected > 0) {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "Appointment scheduled successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        error:
          "Failed to schedule appointment. Please check the input parameters.",
      });
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const viewPaymentStatusByPatient = async (req, res, next) => {
  try {
    const { SDT, STTLichSuKB } = req.params;

    // Connect to the SQL Server database
    const pool = await sql.connect(config.sql);
    const request = new sql.Request();

    // Execute the stored procedure
    const query = `EXEC XemTrangThaiThanhToan @SDT = '${SDT}', @STTLichSuKB = '${STTLichSuKB}';`;
    const result = await request.query(query);

    console.log("Stored Procedure Result:", result);
    // const messages = result.recordset.map((record) => record.Message);

    // Trả về kết quả dưới dạng JSON
    res.json({ Messages: result.recordset });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllPatient,
  getPatientBySDT,
  updateInfPatient,
  scheduleAppointment,
  viewPaymentStatusByPatient,
};
