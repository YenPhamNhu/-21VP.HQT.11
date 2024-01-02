import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const Search = () => {
 
  const columns = useMemo(
    () => [
        {
            accessorKey: 'MaHoaDon',
            header: 'Mã hóa đơn',
          },
          {
            accessorKey: 'MaBenhNhan',
            header: 'Mã bệnh nhân',
          },
          {
            accessorKey: 'STTLichSuKB',
            header: 'Số thứ tự lịch sử KB',
          },
          {
            accessorKey: 'MaPhieuDVSD',
            header: 'Mã phiếu dịch vụ sử dụng',
          },
          {
            accessorKey: 'TongTien',
            header: 'Tổng tiền',
          },
          {
            accessorKey: 'TinhTrangThanhToan',
            header: 'Tình trạng thanh toán',
          },
          {
            accessorKey: 'NgayThanhToan',
            header: 'Ngày thanh toán',
          },
    ],
    []
  );

  
  const [Dulieu, setDulieu] = useState(null);

  const fetchService = async () => {

    const response = await fetch(
      `http://localhost:5000/api/employees/receipts/getAllReceipt`
    ); // Fetch service data
    console.log(response);
    const serviceData = await response.json();
    if (serviceData) {
      const modifiedData = serviceData.map((item) => {
        const formattedNgayThanhToan = item.NgayThanhToan.split('T')[0]; // Extract the date part
        return { ...item, NgayThanhToan: formattedNgayThanhToan };
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
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
            color="green" >
            <EditIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default Search;