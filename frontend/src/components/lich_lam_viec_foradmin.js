
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon, RowingSharp } from "@mui/icons-material";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
export default function Home() {
	
	const columns = useMemo(
		() => [
{
				accessorKey: "HoTen",
				header: "Nha Sĩ",
				enableEditing: false,
			},
			{
				accessorKey: "Ngay",
				header: "Ngày Đăng Ký",
				enableEditing: false,
			},
			{
				accessorKey: "CaDangKy",
				header: "Ca Đăng Ký",
				required: false,
			},
			{
				accessorKey: "SDT",
				header: "Số điện thoại",
				required: false,
			},
		
		],
		[]
	);

	const [Dulieu, setDulieu] = useState(null);

	const fetchService = async () => {
		
		const response = await fetch(
			`http://localhost:5000/api/employee/getAllWorkCalendar`
		);
		const serviceData = await response.json();
		if (serviceData) {
			const modifiedData = serviceData.map((item) => {
				const formattedNgay = item.Ngay.split("T")[0];
				return { ...item, Ngay: formattedNgay };
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
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          </Box>
        );}
      }
    />
	);
}

