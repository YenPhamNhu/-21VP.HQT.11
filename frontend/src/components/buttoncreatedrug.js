import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [mathuoc, setMathuoc] = useState('');
  const [ngayhh, setNgayhh] = useState('');
  const [tenthuoc, setTenthuoc] = useState('');
  const [donvitinh, setDonvitinh] = useState('');
  const [dongia, setDongia] = useState('');
  const [chidinh, setChidinh] = useState('');
  const [soluong, setSoluong] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
        if (mathuoc === '') {
            alert("Yêu cầu nhập mã thuốc");
            return;
        }
        if (ngayhh === '') {
            alert("Yêu cầu nhập số điện thoại hết hạn")
        }
        if (tenthuoc === '') {
            alert("Yêu cầu nhập tên thuốc");
            return;
        }
        if (donvitinh === '') {
            alert("Yêu cầu nhập đơn vị tính");
            return;
        }
        if (dongia === '') {
            alert("Yêu cầu nhập đơn giá");
            return;
        }
        if (chidinh === '') {
            alert("Yêu cầu nhập chỉ định");
            return;
        }
        if (soluong === '') {
            alert("Yêu cầu nhập số lượng");
            return;
        }
      const response = await fetch('http://localhost:5000/api/admins/drugs/createDrug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            MaThuoc: mathuoc,
            NgayHetHan: ngayhh,
            TenThuoc: tenthuoc,
            DonViTinh: donvitinh,
            DonGia: dongia,
            ChiDinh: chidinh,
            SoLuongTonKho: soluong,
            ThaoTac: 'ThemMoi'
        }),
      });

      if (response.ok) {
        window.location.reload();
        const data = await response.json();
        console.log('Employee created successfully:', data);
        handleClose();
      } else {
        const error = await response.json();
        console.error('Failed to create employee:', error);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleMaThuocChange = (event) => {
    setMathuoc(event.target.value);
  };
  const handleNgayHetHanChange = (event) => {
    setNgayhh(event.target.value.split("T")[0]);
  };
  const handleTenThuocChange = (event) => {
    setTenthuoc(event.target.value);
  };
  const handleDonGiaChange = (event) => {
    setDongia(event.target.value);
  };
  const handleDonViTinhChange = (event) => {
    setDonvitinh(event.target.value);
  };
  const handleChiDinhChange = (event) => {
    setChidinh(event.target.value);
  };
  const handleSoLuongChange = (event) => {
    setSoluong(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Tạo thuốc mới
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo thuốc mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mã thuốc"
            type="text"
            fullWidth
            variant="standard"
            value={mathuoc}
            onChange={handleMaThuocChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ngày hết hạn"
            type="date"
            fullWidth
            variant="standard"
            value={ngayhh}
            onChange={handleNgayHetHanChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên thuốc"
            type="text"
            fullWidth
            variant="standard"
            value={tenthuoc}
            onChange={handleTenThuocChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Đơn giá"
            type="text"
            fullWidth
            variant="standard"
            value={dongia}
            onChange={handleDonGiaChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Đơn vị tính"
            type="text"
            fullWidth
            variant="standard"
            value={donvitinh}
            onChange={handleDonViTinhChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chỉ định"
            type="text"
            fullWidth
            variant="standard"
            value={chidinh}
            onChange={handleChiDinhChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số lượng"
            type="text"
            fullWidth
            variant="standard"
            value={soluong}
            onChange={handleSoLuongChange}
            required
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}