import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AppointmentSchedule = () => {
  const [appointmentScheduleList, setAppointmentScheduleList] = useState([]);

  useEffect(() => {
    fetchAppointmentScheduleData();
  }, []);

  const fetchAppointmentScheduleData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/dentists/appointmentSchedule/getAppointmentScheduleByMaNhaSi/${localStorage.SDT}`
    ); 
    const data = await response.json();
    if (data) {
      const filteredData = data.filter(
        (item) => item.TrangThaiLichHen !== "Đã hủy"
      );
      const modifiedData = filteredData.map((item) => {
        const formattedNgayGioKham = item.NgayGioKham.split("T")[0]; // Extract the date part
        return { ...item, NgayGioKham: formattedNgayGioKham };
      });
      setAppointmentScheduleList(modifiedData);
    }
  };

  return (
    <div className='container mt-4'>
      <h1>Lịch đặt hẹn</h1>
      <table
        className='table table-bordered flex justify-content-center mx-auto'
        style={{ width: "50%" }}
      >
        <thead>
          <tr>
            <th>Ngày giờ khám</th>
            <th>Mã bệnh nhân</th>
          </tr>
        </thead>
        <tbody>
          {appointmentScheduleList.map((appointment) => (
            <tr key={appointment.MaLichHen}>
              <td>{appointment.NgayGioKham}</td>
              <td>{appointment.MaBenhNhan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentSchedule;
