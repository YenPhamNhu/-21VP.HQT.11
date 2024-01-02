import React from "react";
import SearchPatient from "../../components/search_patient";
// import SearchDentist from "../../components/search_dentist";
// import SearchEmployee from "../../components/search_employee";

export default function Home() {
  return (
    <div className='container mt-4 mb-4'>
      <h3 className='mt-4' style={{ color: "#04364a" }}>
        Tìm kiếm bệnh nhân
      </h3>
      <SearchPatient />
      {/* <h3 className='mt-4' style={{ color: "#04364a" }}>
        Tìm kiếm nha sĩ
      </h3>
      <SearchDentist />
      <h3 className='mt-4' style={{ color: "#04364a" }}>
        Tìm kiếm nhân viên
      </h3>
      <SearchEmployee /> */}
    </div>
  );
}
