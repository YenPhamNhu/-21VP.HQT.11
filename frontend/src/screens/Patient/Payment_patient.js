import React from "react";
import List from "../../components/reciptlist";

export default function Home() {
  return (
    <div className='container mt-1 mb-4'>
      <h3 style={{ color: "#04364a" }}>Hoá đơn</h3>
      <List />
    </div>
  );
}
