import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
export default function Home() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaThuoc",
        header: "Mã thuốc",
        enableEditing: false,
      },
      {
        accessorKey: "NgayHetHan",
        header: "Ngày hết hạn",
        enableEditing: false,
      },
      {
        accessorKey: "TenThuoc",
        header: "Tên thuốc",
        required: true,
      },
      {
        accessorKey: "DonViTinh",
        header: "Đơn vị thuốc",
        required: true,
      },
      {
        accessorKey: "DonGia",
        header: "Đơn giá",
        required: true,
      },
      {
        accessorKey: "ChiDinh",
        header: "Chỉ định",
        required: true,
      },
      {
        accessorKey: "SoLuongTonKho",
        header: "Số lượng tồn kho",
        required: true,
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admins/drugs/getAllDrug`
    );
    const serviceData = await response.json();
    if (serviceData) {
      const modifiedData = serviceData.map((item) => {
        const formattedNgayHetHan = item.NgayHetHan.split("T")[0];
        return { ...item, NgayHetHan: formattedNgayHetHan };
      });
      setDulieu(modifiedData);
    }
  };

  const fetchDelete = async (row) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admins/drugs/deleteDrug/${row.original.MaThuoc}/${row.original.NgayHetHan}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          // Drug deleted successfully
          const updatedData = Dulieu.filter(
            (drug) => drug.MaThuoc !== row.original.MaThuoc
          );
          setDulieu(updatedData);
        } else {
          // Show error message if drug not found or could not be deleted
          console.error(data.error || "Error deleting drug");
        }
      } else if (response.status === 404) {
        console.error("Drug not found");
      } else {
        console.error(`Error deleting drug. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting drug:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  if (!Dulieu) {
    return <div>Loading...</div>;
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={Dulieu}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <IconButton
            color='secondary'
            onClick={() => {
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color='error' onClick={() => fetchDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
}
