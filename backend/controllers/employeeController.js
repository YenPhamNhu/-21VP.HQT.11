"use strict";
const config = require("../config");
const sql = require("mssql");

// nhan vien
const employeeData = require("../data/employees");
const getAllEmployee = async (req, res, next) => {
	try {
		const employeelist = await employeeData.getEmployee();
		res.send(employeelist);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const employeeMap = {};

const getEmployeeBySDT = async (req, res, next) => {
	try {
		const employeelist = await employeeData.getEmployee();
		for (const employee of employeelist) {
			employeeMap[employee.SDT] = employee;
		}
		const employeeSDT = req.params.SDT;
		console.log("SDT:", employeeMap[employeeSDT]);
		const employee = employeeMap[employeeSDT];

		if (!employee) {
			res.status(404).send("Employee not found");
			return;
		}

		res.send(employee);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const updateInfEmployee = async (req, res, next) => {
	try {
		const { SDT } = req.params;
		const { HoTen, GioiTinh, DiaChi, ViTri } = req.body;

		// Connect to the SQL Server database
		const pool = await sql.connect(config.sql);
		const request = new sql.Request();

		// Call the stored procedure to update employee information
		const query = `
      EXEC CapNhatThongTinNhanVien
        @SDT = '${SDT}',
        @HoTen = N'${HoTen}',
        @GioiTinh = N'${GioiTinh}',
        @DiaChi = N'${DiaChi}',
        @ViTri = N'${ViTri}';
    `;

		const result = await request.query(query);

		// Check the result of the stored procedure
		if (result.rowsAffected[0] > 0) {
			res.status(200).json({
				success: true,
				message: "Employee information updated successfully",
			});
		} else {
			res.status(404).json({
				success: false,
				error: "Employee not found or information could not be updated",
			});
		}
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

const updateInfPatientByEmployee = async (req, res, next) => {
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

const updateInfDentistByEmployee = async (req, res, next) => {
	try {
		const { SDT } = req.params;
		const { HoTen, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap } = req.body;

		// Connect to the SQL Server database
		const pool = await sql.connect(config.sql);
		const request = new sql.Request();

		// Call the stored procedure to update employee information
		const query = `
      EXEC CapNhatThongTinNhaSi
        @SDT = '${SDT}',
        @HoTen = N'${HoTen}',
        @GioiTinh = N'${GioiTinh}',
        @NgaySinh = '${NgaySinh}',
        @DiaChi = N'${DiaChi}',
        @ChuyenMon = N'${ChuyenMon}',
        @BangCap = '${BangCap}';
    `;

		const result = await request.query(query);

		// Check the result of the stored procedure
		if (result.rowsAffected[0] > 0) {
			res.status(200).json({
				success: true,
				message: "Employee information updated successfully",
			});
		} else {
			res.status(404).json({
				success: false,
				error: "Employee not found or information could not be updated",
			});
		}
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

const changePaymentStatus = async (req, res, next) => {
	try {
		const { SDT, STTLichSuKB } = req.body;

		// Connect to the SQL Server database
		const pool = await sql.connect(config.sql);
		const request = new sql.Request();

		// Call the stored procedure to change the payment status
		const query = `
          EXEC ThayDoiTrangThaiThanhToan
              @SDT = '${SDT}',
              @STTLichSuKB = ${STTLichSuKB};
      `;

		const result = await request.query(query);

		// Check the result of the stored procedure
		if (result.rowsAffected[0] > 0) {
			console.log("Payment status changed successfully");
			res.status(200).json({
				success: true,
				message: "Payment status changed successfully",
			});
		} else {
			console.error(
				"Patient not found, medical history not found, or payment status could not be changed"
			);
			console.error("Stored Procedure Result:", result);

			res.status(404).json({
				success: false,
				error:
					"Patient not found, medical history not found, or payment status could not be changed",
			});
		}
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

const ThongBaoLichKham = async (req, res, next) => {
	try {
		// Connect to the SQL Server database
		const pool = await sql.connect(config.sql);
		const request = new sql.Request();

		// Call the stored procedure to update employee information
		const query = `
			EXEC ThongBaoLichKham
		`;

		const result = await request.query(query);

		// Check the result of the stored procedure
		if (result.rowsAffected[0] > 0) {
			// console.log("Có lịch hẹn khám ngày mai");
			res
				.status(200)
				.json({ success: true, message: "Có lịch hẹn khám ngày mai" });
		} else {
			console.error("Không có lịch hẹn khám ngày mai");
			console.error("Stored Procedure Result:", result);
			res
				.status(404)
				.json({ success: false, message: "Không có lịch hẹn khám ngày mai" });
		}
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

const CapNhatHoSoBenhAn = async (req, res, next) => {
	try {
		const requiredFields = [
			"STT",
			"MaBenhNhan",
			"MaNhaSiKham",
			"GhiChu",
			"MaThuoc",
			"NgaySuDung",
			"LieuDung",
			"SoLuong",
		];
		for (const field of requiredFields) {
			if (!req.body[field]) {
				return res.status(400).json({ error: `${field} is required` });
			}
		}

		const pool = await sql.connect(config.sql);

		const {
			HoTen = "Bệnh nhân mới",
			NgaySinh = "1990-01-01",
			...rest
		} = req.body;

		const request = new sql.Request();

		const query = `
			EXEC CapNhatHoSoBenhAn
				@STT = '${rest.STT}',
				@MaBenhNhan = '${rest.MaBenhNhan}',
				@MaNhaSiKham = '${rest.MaNhaSiKham}',
				@GhiChu = N'${rest.GhiChu}',
				@MaThuoc = '${rest.MaThuoc}',
				@NgaySuDung = '${rest.NgaySuDung}',
				@LieuDung = N'${rest.LieuDung}',
				@SoLuong = '${rest.SoLuong}';
		`;

		const result = await request.query(query);

		console.log("Stored Procedure Result:", result);

		res
			.status(201)
			.json({ success: true, message: "HoSoBenhAn updated successfully" });
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

const LapHoaDonThanhToan = async (req, res, next) => {
	try {
		const { STTLichSuKB } = req.body;

		// Connect to the SQL Server database
		const pool = await sql.connect(config.sql);
		const request = new sql.Request();

		// Call the stored procedure to change the payment status
		const query = `
          EXEC LapHoaDonThanhToan
              @STTLichSuKB = ${STTLichSuKB};
      `;

		const result = await request.query(query);

		// Check the result of the stored procedure
		if (result.rowsAffected[0] > 0) {
			console.log("Invoice created successfully");
			res.status(200).json({
				success: true,
				message: "Invoice created successfully",
			});
		} else {
			console.error(
				"STTLichSuKB not found"
			);
			console.error("Stored Procedure Result:", result);

			res.status(404).json({
				success: false,
				error:
					"STTLichSuKB not found",
			});
		}
	} catch (err) {
		console.error("Error executing SQL query:", err);
		res.status(500).json({ success: false, error: err.message });
	}
};

module.exports = {
	getAllEmployee,
	getEmployeeBySDT,
	updateInfEmployee,
	updateInfPatientByEmployee,
	updateInfDentistByEmployee,
	changePaymentStatus,
	ThongBaoLichKham,
	CapNhatHoSoBenhAn,
	LapHoaDonThanhToan,
};
