import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Payment() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'MaHoaDon',
        header: 'Mã hóa đơn',
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
        accessorKey: 'MaDonThuoc',
        header: 'Mã đơn thuốc',
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
    
    const fetchPatient = async() =>{
      const response = await fetch(`http://localhost:5000/api/patients/getPatientBySDT/${localStorage.SDT}`);
      const Patient_ID = await response.json();
      return Patient_ID;
    }
    const Patient_ID = await fetchPatient();
    const response = await fetch(`http://localhost:5000/api/employees/receipts/getAllReceipt`);
    const serviceData = await response.json();
    if (serviceData) {
      const filteredData = serviceData.filter(item => item.MaBenhNhan === Patient_ID.MaBenhNhan);
      const modifiedData = filteredData.map((item) => {
        const formattedNgayThanhToan = item.NgayThanhToan.split('T')[0];
        return { ...item, NgayThanhToan: formattedNgayThanhToan };
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
    <div className='container mt-5'>
      <MaterialReactTable
        columns={columns}
        data={Dulieu}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
              color='secondary'
              onClick={() => {
                table.setEditingRow(row);
              }}
            ></IconButton>
            <IconButton
              color='error'
              onClick={() => {
                const updatedData = [...Dulieu];
                updatedData.splice(row.index, 1);
                setDulieu(updatedData);
              }}
            ></IconButton>
          </Box>
        )}
      />
    </div>
  );
}

export default Payment;
