import React from "react";
import SearchBar from "../../components/search_dentist";

export default function Home() {
  return (
    <div className='container mt-4 mb-4'>
      <h3 className='mt-4' style={{ color: "#04364a" }}>
        Tìm kiếm nha sĩ
      </h3>
      <SearchBar />
    </div>
  );
}
