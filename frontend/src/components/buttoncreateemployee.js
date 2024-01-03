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
  const [hoten, setHoten] = useState('');
  const [sdt, setSdt] = useState('');
  const [gioitinh, setGioitinh] = useState('');
  const [diachi, setDiachi] = useState('');
  const [vitri, setVitri] = useState('');
  const [matkhau, setMatkhau] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
        if (matkhau.length < 8) {
            alert("Mật khẩu không đủ 8 kí tự trở lên");
            return;
        }
        if (gioitinh !== 'Nam' && gioitinh !== 'Nữ') {
            alert("Giới tính phải là Nam hoặc Nữ");
            return;
        }
        if (hoten === '') {
            alert("Yêu cầu nhập họ tên");
            return;
        }
        if (sdt === '') {
            alert("Yêu cầu nhập số điện thoại");
            return;
        }
        if (!/^\d{10}$/.test(sdt)) {
          alert("Số điện thoại phải là số và phải có đúng 10 kí tự");
          return;
        }
        if (vitri === '') {
            alert("Yêu cầu nhập vị trí");
            return;
        }
        if (diachi === '') {
            alert("Yêu cầu nhập địa chỉ");
            return;
        }
      const response = await fetch('http://localhost:5000/api/admins/createEmployeeByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          HoTen: hoten,
          SDT: sdt,
          GioiTinh: gioitinh,
          DiaChi: diachi,
          TinhTrangHoatDong: 'Còn làm',
          ViTri: vitri,
          MatKhau: matkhau
          // Include other required fields for creating an employee
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

  const handleHotenChange = (event) => {
    setHoten(event.target.value);
  };
  const handleSDTChange = (event) => {
    setSdt(event.target.value);
  };
  const handleGioiTinhChange = (event) => {
    setGioitinh(event.target.value);
  };
  const handleDiaChiChange = (event) => {
    setDiachi(event.target.value);
  };
  const handleViTriChange = (event) => {
    setVitri(event.target.value);
  };
  const handleMatKhauChange = (event) => {
    setMatkhau(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Tạo tài khoản nhân viên
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ tên"
            type="text"
            fullWidth
            variant="standard"
            value={hoten}
            onChange={handleHotenChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số điện thoại"
            type="tel"
            fullWidth
            variant="standard"
            value={sdt}
            onChange={handleSDTChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Giới tính"
            type="text"
            fullWidth
            variant="standard"
            value={gioitinh}
            onChange={handleGioiTinhChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Địa chỉ"
            type="text"
            fullWidth
            variant="standard"
            value={diachi}
            onChange={handleDiaChiChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Vị trí"
            type="text"
            fullWidth
            variant="standard"
            value={vitri}
            onChange={handleViTriChange}
            required
          />
           <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Mật khẩu"
      type="password"
      fullWidth
      variant="standard"
      value={matkhau}
      onChange={handleMatKhauChange}
      required
      minLength={8}
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