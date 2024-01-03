import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaNhaSiKham",
        header: "Mã nha sĩ khám",
      },
      {
        accessorKey: "GhiChu",
        header: "Ghi chú",
      },
      {
        accessorKey: "NgayKham",
        header: "Ngày khám",
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);
  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/patients/medHistory/getMedHistoryByID/${localStorage.SDT}`
    );
    console.log(response);
    const serviceData = await response.json();
    console.log(serviceData);
    if (serviceData) {
      let modifiedData;
      if (Array.isArray(serviceData)) {
        modifiedData = serviceData.map((item) => {
          const formattedNgayKham = item.NgayKham.split("T")[0];
          return { ...item, NgayKham: formattedNgayKham };
        });
      } else {
        const formattedNgayKham = serviceData.NgayKham.split("T")[0];
        modifiedData = { ...serviceData, NgayKham: formattedNgayKham };
      }
      setDulieu(modifiedData);
    }
  };
  useEffect(() => {
    fetchService();
  }, []);
  if (!Dulieu) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={Dulieu}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <Link to='/'>View Details</Link>
          <IconButton
            color='secondary'
            onClick={() => {
              table.setEditingRow(row);
            }}
          ></IconButton>
          <IconButton
            color='error'
            onClick={() => {
              const updatedData = [...Dulieu];
              updatedData.splice(row.index, 1); // Assuming simple data table
              setDulieu(updatedData);
            }}
          >
            {/* Add your icon component code */}
          </IconButton>
        </Box>
      )}
    />
  );
}
