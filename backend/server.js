// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     server: SQL_SERVER,
//     database: SQL_DATABASE,
//     user: SQL_USER,
//     password: SQL_PASSWORD
//     // SQL_USER='sa'
//     // SQL_PASSWORD='5h64ZuEf'
//     // SQL_DATABASE='QLPKNK'
//     // SQL_SERVER='localhost'
// })

// app.post('/signup',(rep,res)=>{
//     const sql = "INSERT INTO BENHNHAN (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau) VALUES (?)";
//     // "EXEC TaoTaiKhoanBenhNhan";
//     const values = [
//         // HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau
//         req.body.HoTen,
//         req.body.SDT,
//         req.body.GioiTinh,
//         req.body.NgaySinh,
//         req.body.DiaChi,
//         req.body.MatKhau
//     ]
//     db.query(sql,[values],(err,data)=>{
//         if(err){
//             return res.json("Error");
//         }
//         return res.json(data);
//     })
// })

// app.listen(8081,()=>{
//     console.log("listening");
// })