-- //0.Người dùng khách (người dùng chưa đăng nhập) 
--//-------------------
-- 0.1/Có quyền đăng kí tài khoản (gọi giao tác TaoTaiKhoanBenhNhan) 
EXEC TaoTaiKhoanBenhNhan
    @HoTen = N'Bệnh nhân mới',
    @SDT = '0123456782',
    @GioiTinh = N'Nam',
    @NgaySinh = '1990-01-01',
    @DiaChi = N'Địa chỉ BN mới',
    @MatKhau = '12345678';
GO
--//-------------------
-- 0.2/Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap)
EXEC DangNhap @UserName = '0123456788', @Password = '12345678';
EXEC DangNhap @UserName = '0123456781', @Password = '12345678';
EXEC DangNhap @UserName = '0123456777', @Password = '12345678';
EXEC DangNhap @UserName = '0337432114', @Password = '12345678';
--//-------------------
-- //1.Bệnh nhân (đã có tài khoản) 
-- 1.1/Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) : WROTE
-- 1.2/Có quyền đặt lịch hẹn: 
-- Được quyền chọn ngày giờ khám (gọi giao tác ChonThoiGianKham). 
-- Được quyền chọn nha sĩ khám (gọi giao tác ChonNhaSiKham). 
GO
EXEC DatLichHen
    @Ngay = '2023-11-13',
    @SDT = '0123456780',
    @MaNhaSi = 100,
    @CaDangKy = N'Sáng';
EXEC DatLichHen
    @Ngay = '2023-11-13',
    @SDT = '0123456780',
    @MaNhaSi = 100,
    @CaDangKy = N'Chiều';
EXEC DatLichHen
    @Ngay = '2023-11-13',
    @SDT = '0123456787',
    @MaNhaSi = 100,
    @CaDangKy = N'Chiều';
GO
-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tính. 
EXEC XemThongTinCaNhan @SDT = '0123456782';

GO
-- Có quyền được xem thông tin của nha sĩ (gọi giao tác XemThongTinNhaSi). 
EXEC XemThongTinNhaSi @MaNhaSi = 100;

-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tinh. (NHÂN VIÊN)
EXEC XemThongTinCaNhanNhanVien @SDT = "0123456788";
GO