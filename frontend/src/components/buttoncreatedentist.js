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
  const [ngaysinh, setNgaysinh] = useState('');
  const [chuyenmon, setChuyenmon] = useState('');
  const [bangcap, setBangcap] = useState('');
  const [diachi, setDiachi] = useState('');
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
        if (ngaysinh === '') {
            alert("Yêu cầu nhập ngày sinh");
            return;
        }
        if (!/^\d{10}$/.test(sdt)) {
          alert("Số điện thoại phải là số và phải có đúng 10 kí tự");
          return;
        }
        if (bangcap === '') {
            alert("Yêu cầu nhập bằng cấp");
            return;
        }
        if (chuyenmon === '') {
            alert("Yêu cầu nhập chuyên môn");
            return;
        }
        if (diachi === '') {
            alert("Yêu cầu nhập địa chỉ");
            return;
        }
      const response = await fetch('http://localhost:5000/api/admins/createDentistByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          HoTen: hoten,
          SDT: sdt,
          GioiTinh: gioitinh,
          NgaySinh: ngaysinh,
          ChuyenMon: chuyenmon,
          BangCap: bangcap,
          DiaChi: diachi,
          MatKhau: matkhau
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
  const handleNgaySinhChange = (event) => {
    setNgaysinh(event.target.value.split("T")[0]);
  };
  const handleDiaChiChange = (event) => {
    setDiachi(event.target.value);
  };
  const handleChuyenMonChange = (event) => {
    setChuyenmon(event.target.value);
  };
  const handleBangCapChange = (event) => {
    setBangcap(event.target.value);
  };
  const handleMatKhauChange = (event) => {
    setMatkhau(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Tạo tài khoản nha sĩ
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
            label="Ngày sinh"
            type="date"
            fullWidth
            variant="standard"
            value={ngaysinh}
            onChange={handleNgaySinhChange}
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
            label="Chuyên môn"
            type="text"
            fullWidth
            variant="standard"
            value={chuyenmon}
            onChange={handleChuyenMonChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Bằng cấp"
            type="text"
            fullWidth
            variant="standard"
            value={bangcap}
            onChange={handleBangCapChange}
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