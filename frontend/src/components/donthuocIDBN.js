import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaDonThuoc",
        header: "Mã đơn thuốc",
      },
      {
        accessorKey: "MaThuoc",
        header: "Mã thuốc",
      },
      {
        accessorKey: "MaBenhNhan",
        header: "Mã bệnh nhân",
      },
      {
        accessorKey: "NgaySudung",
        header: "Ngày sử dụng",
      },
      {
        accessorKey: "NgayHetHan",
        header: "Ngày hết hạn",
      },
      {
        accessorKey: "LieuDung",
        header: "Liều dùng",
      },
      {
        accessorKey: "STTLichSuKB",
        header: "STT lịch sử khám bệnh",
      },
      {
        accessorKey: "SoLuong",
        header: "Số lượng",
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/patients/drugs/XemDonThuoc/${localStorage.SDT}`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    console.log(serviceData);
    if (serviceData) {
      let modifiedData;
      if (Array.isArray(serviceData)) {
        modifiedData = serviceData.map((item) => {
          const formattedNgaySuDung = item.NgaySuDung.split("T")[0]; // Extract the date part
          const formattedNgayHetHan = item.NgayHetHan.split("T")[0];
          console.log(formattedNgaySuDung);
          console.log(formattedNgayHetHan);
          return {
            ...item,
            NgaySuDung: formattedNgaySuDung,
            NgayHetHan: formattedNgayHetHan,
          };
        });
      } else {
        const formattedNgaySuDung = serviceData.NgaySuDung.split("T")[0]; // Extract the date part
        const formattedNgayHetHan = serviceData.NgayHetHan.split("T")[0];
        modifiedData = {
          ...serviceData,
          NgaySuDung: formattedNgaySuDung,
          NgayHetHan: formattedNgayHetHan,
        };
      }
      setDulieu(modifiedData);
    }
    // if (serviceData) {
    //   const modifiedData = serviceData.map((item) => {
    //     const formattedNgaySuDung = item.NgaySuDung.split("T")[0]; // Extract the date part
    //     const formattedNgayHetHan = item.NgayHetHan.split("T")[0];
    //     return {
    //       ...item,
    //       NgaySuDung: formattedNgaySuDung,
    //       NgayHetHan: formattedNgayHetHan,
    //     };
    //   });
    //   setDulieu(modifiedData);
    // }
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
