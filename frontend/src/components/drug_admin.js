import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
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
        header: 'Đơn giá',
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
            onClick={async () => {
              try {
                const response = await fetch(`http://localhost:5000/api/admins/drugs/deleteDrug/${row._valuesCache.MaThuoc}/${row._valuesCache.NgayHetHan}`);
                if (response.data.success) {
                  // Drug deleted successfully, update the local state or refetch data
                  const updatedData = Dulieu.filter(drug => drug.MaThuoc !== row.MaThuoc);
                  setDulieu(updatedData);
                } else {
                  // Show error message if drug not found or could not be deleted
                  console.error(response.data.error);
                }
              } catch (error) {
                // Handle any API request errors
                console.error('Error deleting drug:', error);
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