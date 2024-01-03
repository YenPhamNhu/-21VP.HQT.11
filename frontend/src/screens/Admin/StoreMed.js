import React from "react";
import Drug from "../../components/drug_admin";
import AddDrug from "../../components/buttoncreatedrug"
export default function Home() {
  return (
    <div className='container mt-1 mb-4'>
      <h3 style={{ color: "#04364a" }}>Danh sách thuốc</h3>
      <Drug />
      <AddDrug/>
    </div>
  );
}
