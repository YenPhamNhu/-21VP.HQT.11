import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
export default function Home() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'MaThuoc',
        header: 'Mã thuốc',
        enableEditing: false,
      },
      {
        accessorKey: 'NgayHetHan',
        header: 'Ngày hết hạn',
        enableEditing: false,
      },
      {
        accessorKey: 'TenThuoc',
        header: 'Tên thuốc',
        required: true,
      },
      {
        accessorKey: 'DonViTinh',
        header: 'Đơn vị thuốc',
        required: true,
      },
      {
        accessorKey: 'DonGia',
        header: 'TĐơn giá',
        required: true,
      },
      {
        accessorKey: 'ChiDinh',
        header: 'Chỉ định',
        required: true,
      },
      {
        accessorKey: 'SoLuongTonKho',
        header: 'Số lượng tồn kho',
        required: true,
      },
    ],
    []
  );

  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {
    const response = await fetch(`http://localhost:5000/api/admins/drugs/getAllDrug`);
    const serviceData = await response.json();
    if (serviceData) {
      const modifiedData = serviceData.map((item) => {
        const formattedNgayHetHan = item.NgayHetHan.split('T')[0];
        return { ...item, NgayHetHan: formattedNgayHetHan };
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
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color="secondary"
            onClick={() => {
              table.setEditingRow(row);}}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
                Dulieu.splice(row.index, 1); 
                setDulieu([...Dulieu]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
}