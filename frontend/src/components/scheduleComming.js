import React, { useEffect, useState } from "react";
import axios from "axios";

const LichHenItem = ({ lichHen }) => {
  // Split the date and time
  const [date, time] = lichHen.NgayGioKham.split("T");

  return (
    <tr>
      <td>{lichHen.MaLichHen}</td>
      <td>{date}</td>
      {/* <td>{time}</td> */}
      <td>{lichHen.MaBenhNhan}</td>
      <td>{lichHen.MaNhaSi}</td>
    </tr>
  );
};

const LichHenList = ({ lichHenList }) => {
  return (
    <table className='table table-bordered flex justify-content-center mx-auto'>
      <thead>
        <tr>
          <th>Mã Lịch Hẹn</th>
          <th>Ngày Khám</th>
          {/* <th>Giờ Khám</th> */}
          <th>SĐT Bệnh Nhân</th>
          <th>SĐT Nha Sĩ</th>
        </tr>
      </thead>
      <tbody>
        {lichHenList.map((lichHen) => (
          <LichHenItem key={lichHen.MaLichHen} lichHen={lichHen} />
        ))}
      </tbody>
    </table>
  );
};

const LichHenTable = () => {
  const [lichHenList, setLichHenList] = useState([]);

  useEffect(() => {
    fetchLichHenList();
  }, []);

  const fetchLichHenList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admins/appointmentSchedule/getUpcomingAppointments`
      );
      const { success, data, error } = response.data;

      if (success) {
        setLichHenList(data);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Lịch Hẹn Sắp Đến</h2>
      <LichHenList lichHenList={lichHenList} />
    </div>
  );
};

export default LichHenTable;
