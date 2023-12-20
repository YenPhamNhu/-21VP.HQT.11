const express = require("express");
const config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/myRoutes");
const sql = require("mssql");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", userRoutes.routes);

const pool = new sql.ConnectionPool(config.sql);
const poolConnect = pool.connect();

poolConnect
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.post('/signup', async (req, res) => {
  try {
    const requiredFields = ['HoTen', 'SDT','GioiTinh', 'NgaySinh', 'DiaChi', 'MatKhau'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // const query = "INSERT INTO BENHNHAN (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau) VALUES (@HoTen, @SDT, @GioiTinh, @NgaySinh, @DiaChi, @MatKhau)";
    // const request = pool.request();
    // request.input("HoTen", sql.NVarChar(50), req.body.HoTen);
    // request.input("SDT", sql.NVarChar(20), req.body.SDT);
    // request.input("GioiTinh", sql.NVarChar(20), req.body.GioiTinh.toLowerCase() === 'male' ? 'Nam' : 'Nữ');
    // request.input("NgaySinh", sql.Date, req.body.NgaySinh);
    // request.input("DiaChi", sql.NVarChar(100), req.body.DiaChi);
    // request.input("MatKhau", sql.NVarChar(100), req.body.MatKhau);

    // const result = await request.query(query);
    // res.status(201).json({ success: true, message: "User registered successfully", data: result });

    const pool = await sql.connect(config.sql);
    // const request = pool.request();

    const { HoTen = "Bệnh nhân mới", NgaySinh = '1990-01-01', ...rest } = req.body;

    // Create Request object
    const request = new sql.Request();

    // Execute stored procedure
    const query = `
      EXEC TaoTaiKhoanBenhNhan
        @HoTen = N'${HoTen}',
        @SDT = '${rest.SDT}',
        @GioiTinh = N'${rest.GioiTinh.toLowerCase() === 'male' ? 'Nam' : 'Nữ'}',
        @NgaySinh = '${NgaySinh}',
        @DiaChi = N'${rest.DiaChi}',
        @MatKhau = N'${rest.MatKhau}';
    `;

    const result = await request.query(query);

    console.log("Stored Procedure Result:", result);

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const requiredFields = ['SDT', 'MatKhau'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    
    const pool = await sql.connect(config.sql);
    // const request = pool.request();

    const { ...rest } = req.body;

    // Create Request object
    const request = new sql.Request();

    // Execute stored procedure
    const query = `
      EXEC DangNhap
        @UserName = '${rest.SDT}',
        @Password = N'${rest.MatKhau}';
    `;

    const result = await request.query(query);

    console.log("Stored Procedure Result:", result);

    res.status(201).json({ success: true, message: "User registered successfully" });
    // const pool = sql.connect(config.sql);
    // const request = pool.request();

    // // Goi procedure DangNhap
    // const result = await request.execute("DangNhap", [
    //   { name: "UserName", type: sql.NVarChar(50), value: req.body.SDT },
    //   { name: "Password", type: sql.NVarChar(50), value: req.body.MatKhau }
    // ]);

    // // Check the user role theo stored procedure
    // const userRole = result.recordset[0].UserRole;

    // // đăng nhập theo user role
    // if (userRole === 'QTV' || userRole === 'NHANVIEN' || userRole === 'NHASI' || userRole === 'BENHNHAN') {
    //   res.status(200).json({ success: true, message: `User logged in successfully as ${userRole}` });
    // } else {
    //   res.status(401).json({ success: false, error: "Invalid credentials" });
    // }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});