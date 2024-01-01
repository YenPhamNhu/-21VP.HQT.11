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
		],
		[]
	);

	const [Dulieu, setDulieu] = useState(null);

	const fetchService = async () => {
		const response = await fetch(
			`http://localhost:5000/api/employee/getAllWorkCalendar`
		);
		const serviceData = await response.json();
		setDulieu(serviceData);
		// if (serviceData) {
		//   const modifiedData = serviceData.map((item) => {
		//     const formattedNgayHetHan = item.NgayHetHan.split('T')[0];
		//     return { ...item, NgayHetHan: formattedNgayHetHan };
		//   });
		//   setDulieu(modifiedData);
		// }
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
									`http://localhost:5000/api/employee/getAllWorkCalendar/${row._valuesCache.Ngay}/${row._valuesCache.CaDangKy}`
								);
								if (response.data.success) {
									// Drug deleted successfully, update the local state or refetch data
									const updatedData = Dulieu.filter(
										(caDk) => caDk.Ngay !== row.Ngay
									);
									setDulieu(updatedData);
								} else {
									// Show error message if drug not found or could not be deleted
									console.error(response.data.error);
								}
							} catch (error) {
								// Handle any API request errors
								console.error("Error deleting drug:", error);
							}
						}}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			)}
		/>
	);
}
