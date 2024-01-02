import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const Search = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaNhanVien",
        header: "Mã nhân viên",
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
      // {
      //   accessorKey: 'NgaySinh',
      //   header: 'Ngày sinh',
      // },
      {
        accessorKey: "DiaChi",
        header: "Địa chỉ",
      },
      {
        accessorKey: "TinhTrangHoatDong",
        header: "Tình trạng hoạt động",
      },
      {
        accessorKey: "ViTri",
        header: "Vị trí",
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/employees/getAllEmployee`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    if (serviceData) {
      setDulieu(serviceData);
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
                const response = await fetch(
                  `http://localhost:5000/api/admins/deleteEmployee/${row.orginal.SDT}`
                );
                const responseData = await response.json();
                if (responseData.success) {
                  const updatedData = Dulieu.filter(
                    (patient) => patient.SDT !== row._valuesCache.SDT
                  );
                  setDulieu(updatedData);
                } else {
                  console.error(responseData.error);
                }
              } catch (error) {
                console.error("Error deleting employee:", error);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default Search;
