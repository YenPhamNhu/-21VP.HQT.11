import React from "react";
import InfpAppointement from "../../components/infoAppoint";
export default function Home() {
  return (
    <div className='container mt-5 mb-5'>
      <h3 className='mt-5'>Thông tin lịch hẹn</h3>
      <InfpAppointement />
    </div>
  );
}
