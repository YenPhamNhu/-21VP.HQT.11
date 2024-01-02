import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const Search = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaBenhNhan",
        header: "Mã bệnh nhân",
        enableEditing: false,
      },
      {
        accessorKey: "HoTen",
        header: "Họ tên",
        required: true,
      },
      {
        accessorKey: "SDT",
        header: "Số điện thoại",
        required: true,
      },
      {
        accessorKey: "NgaySinh",
        header: "Ngày sinh",
        required: true,
      },
      {
        accessorKey: "DiaChi",
        header: "Địa chỉ",
        required: true,
      },
      {
        accessorKey: "GioiTinh",
        header: "Giới tính",
        required: true,
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admins/getAllPatientByAdmin`
      );
      const serviceData = await response.json();
      if (serviceData) {
        const modifiedData = serviceData.map((item) => {
          const formattedNgaySinh = item.NgaySinh.split("T")[0];
          return { ...item, NgaySinh: formattedNgaySinh };
        });
        setDulieu(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
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

          <IconButton
            color='error'
            onClick={async () => {
              try {
                const response = await fetch(
                  `http://localhost:5000/api/admins/deletePatient/${row._valuesCache.SDT}`
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
                console.error("Error deleting patient:", error);
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
