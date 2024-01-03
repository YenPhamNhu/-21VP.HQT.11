import React from "react";
import DonThuoc from "../../components/donthuocIDBN";
import DonKhamBenh from "../../components/donKhamBenh";
export default function Home() {
  return (
    <div className='container mt-3 mb-4'>
      <div>
        <h3 style={{ color: "#04364a" }}>Đơn thuốc</h3>
        <DonThuoc />
      </div>
      <div>
        <h3 className='mt-4'>Đơn khám bệnh</h3>
        <DonKhamBenh />
      </div>
    </div>
  );
}
