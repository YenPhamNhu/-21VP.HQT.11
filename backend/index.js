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

    const query = "INSERT INTO BENHNHAN (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau) VALUES (@HoTen, @SDT, @GioiTinh, @NgaySinh, @DiaChi, @MatKhau)";
    const request = pool.request();
    request.input("HoTen", sql.NVarChar(50), req.body.HoTen);
    request.input("SDT", sql.NVarChar(20), req.body.SDT);
    request.input("GioiTinh", sql.NVarChar(20), req.body.GioiTinh.toLowerCase() === 'male' ? 'Nam' : 'Nữ');
    request.input("NgaySinh", sql.Date, req.body.NgaySinh);
    request.input("DiaChi", sql.NVarChar(100), req.body.DiaChi);
    request.input("MatKhau", sql.NVarChar(100), req.body.MatKhau);

    const result = await request.query(query);
    res.status(201).json({ success: true, message: "User registered successfully", data: result });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
