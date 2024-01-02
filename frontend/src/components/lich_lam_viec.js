import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
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
	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Updated=()=>
  {
	
  }
	const columns = useMemo(
		() => [
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
			const filteredData = serviceData.filter(item => item.SDT === localStorage.SDT);
			const modifiedData = filteredData.map((item) => {
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
			enableRowActions
			renderRowActions={({ row, table }) => (
				<Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
					<Button variant="outlined" onClick={handleClickOpen}>
       					 CHỈNH SỬA
      				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogContent>
					<TextField
	autoFocus
	margin="dense"
	id="name"
	label="Ca Đăng Ký"
	select
	fullWidth
	variant="standard"
>
	<MenuItem value="Sáng">Sáng</MenuItem>
	<MenuItem value="Chiều">Chiều</MenuItem>
	<MenuItem value="Tối">Tối</MenuItem>
</TextField>
					</DialogContent>
					<DialogActions>
					<Button onClick={handleClose}>Hủy</Button>
					<Button onClick={handleClose} onclick={Updated}>Xác nhận</Button>
					</DialogActions>
				</Dialog>
				</Box>
			)}
		/>
	);
}
