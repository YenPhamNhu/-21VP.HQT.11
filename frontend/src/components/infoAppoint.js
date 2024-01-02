import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  RowingSharp,
} from "@mui/icons-material";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
export default function Home() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "MaLichHen",
        header: "Mã lịch hẹn",
        enableEditing: false,
      },
      {
        accessorKey: "NgayGioKham",
        header: "Ngày giờ khám",
        enableEditing: false,
      },
      {
        accessorKey: "MaBenhNhan",
        header: "Mã bệnh nhân",
        required: false,
      },
      {
        accessorKey: "MaNhaSi",
        header: "Mã nha sĩ",
        required: false,
      },
      {
        accessorKey: "TrangThaiLichHen",
        header: "Trạng thái lịch hẹn",
        required: false,
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admins/appointmentSchedule/getAllAppointmentSchedule`
    );
    const serviceData = await response.json();
    if (serviceData) {
      const modifiedData = serviceData.map((item) => {
        const formattedNgayGioKham = item.NgayGioKham.split("T")[0];
        return { ...item, NgayGioKham: formattedNgayGioKham };
      });
      setDulieu(modifiedData);
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
      renderRowActions={({ row, table }) => {
        return (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}></Box>
        );
      }}
    />
  );
}
