import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const Search = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaNhaSi",
        header: "Mã nha sĩ",
      },
      {
        accessorKey: "HoTen",
        header: "Họ và tên",
      },
      {
        accessorKey: "SDT",
        header: "Số điện thoại",
      },
      {
        accessorKey: "GioiTinh",
        header: "Giới tính",
      },
      {
        accessorKey: "NgaySinh",
        header: "Ngày sinh",
      },
      {
        accessorKey: "DiaChi",
        header: "Địa chỉ",
      },
      {
        accessorKey: "ChuyenMon",
        header: "Chuyên môn",
      },
      {
        accessorKey: "BangCap",
        header: "Bằng cấp",
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admins/getAllDentistByAdmin`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    if (serviceData) {
      const modifiedData = serviceData.map((item) => {
        const formattedNgaySinh = item.NgaySinh.split("T")[0]; // Extract the date part
        return { ...item, NgaySinh: formattedNgaySinh };
      });
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

          <IconButton
  color='error'
  onClick={async () => {
    try {
      const cellsdt = row.original.SDT;
      const response = await fetch(
        `http://localhost:5000/api/admins/deleteEmployee/${cellsdt}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = await response.json();
      window.location.reload();
      if (responseData.ok) {
        await fetchService();
        const updatedData = Dulieu.filter(
          (SDT) => SDT !== row.orginal.SDT
        );
        setDulieu(updatedData);
      } else {
        console.error(responseData.error);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }} >
  <DeleteIcon />
</IconButton>
        </Box>
      )}
    />
  );
};

export default Search;
