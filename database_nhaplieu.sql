
USE QLPKNK
GO
-- 1/Chèn dữ liệu vào bảng QTV
INSERT INTO QTV
	(HoTen, SDT, MatKhau)
VALUES
	(N'Phạm Thị Như Yến', '0337432114', '12345678');
GO
SELECT *
FROM QTV
SELECT *
FROM QTVLog
-- 2/Chèn dữ liệu vào bảng NHANVIEN
INSERT INTO NHANVIEN
	(Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau)
VALUES
	(N'Nguyễn Văn A', '0123456789', N'Nam', N'Đà Nẵng', N'Còn làm', N'Quản lý', '12345678'),
	(N'Trần Thị B', '0987654321', N'Nữ', N'Hồ Chí Minh', N'Còn làm', N'Nhân viên', 'abcdefgh'),
	(N'Lê Văn C', '9876543210', N'Nam', N'Hà Nội', N'Còn làm', N'Nhân viên', 'qwertyui'),
	(N'Phạm Thị D', '0123456780', N'Nữ', N'Đà Nẵng', N'Còn làm', N'Nhân viên', 'zxcvbnm'),
	(N'Võ Văn E', '0987654320', N'Nam', N'Hồ Chí Minh', N'Nghỉ làm', N'Quản lý', 'poiuyt'),
	(N'Hoàng Văn F', '9876543201', N'Nam', N'Hà Nội', N'Còn làm', N'Nhân viên', 'lkjhgf');
SELECT *
FROM NHANVIEN

SELECT *
FROM NHANVIENLog

-- 3/Chèn dữ liệu vào bảng NHASI
-- DELETE NHASI
INSERT INTO NHASI
	(HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau)
VALUES
	(N'Nguyễn Văn A', '0123456789', N'Nam', '1990-01-01', N'Đà Nẵng', N'Phẫu thuật', N'Tiến sĩ', '12345678'),
	(N'Trần Thị B', '0987654321', N'Nữ', '1992-05-10', N'Hồ Chí Minh', N'Nha khoa', N'Bác sĩ', 'abcdefgh'),
	(N'Lê Văn C', '9876543210', N'Nam', '1985-12-15', N'Hà Nội', N'Chăm sóc răng', N'Tiến sĩ', 'qwertyui'),
	(N'Phạm Thị D', '0123456780', N'Nữ', '1988-09-20', N'Đà Nẵng', N'Nha khoa', N'Tiến sĩ', 'zxcvbnm'),
	(N'Võ Văn E', '0987654320', N'Nam', '1991-03-25', N'Hồ Chí Minh', N'Phẫu thuật', N'Bác sĩ', 'poiuyt');
SELECT *
FROM NHASI
SELECT *
FROM NHASILog
-- 4/Chèn dữ liệu vào bảng BENHNHAN
-- delete BENHNHANLog
INSERT INTO BENHNHAN
	(HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau)
VALUES
	(N'Trần Thị G', '0987654392', N'Nữ', '1996-07-25', N'Hồ Chí Minh', 'ytrewqba'),
	(N'Lê Văn H', '9876543283', N'Nam', '1989-11-08', N'Hà Nội', 'lkjhgfds'),
	(N'Phạm Thị I', '0123456074', N'Nữ', '1993-04-17', N'Đà Nẵng', 'poiuytre'),
	(N'Võ Văn J', '0987654565', N'Nam', '1995-09-02', N'Hồ Chí Minh', 'qwertyui'),
	(N'Nguyễn Thị K', '0123456456', N'Nữ', '1992-03-16', N'Hà Nội', 'zxcvbnm'),
	(N'Trần Văn L', '0987654347', N'Nam', '1988-08-21', N'Đà Nẵng', 'asdfghjk'),
	(N'Lê Thị M', '9876543238', N'Nữ', '1994-01-04', N'Hồ Chí Minh', 'poiuytre'),
	(N'Phạm Văn N', '0123456129', N'Nam', '1991-06-27', N'Hà Nội', 'lkjhgfds'),
	(N'Võ Thị O', '0987654910', N'Nữ', '1997-10-09', N'Đà Nẵng', 'mnbvcxz'),
	(N'Nguyễn Văn P', '0123456801', N'Nam', '1993-12-12', N'Hồ Chí Minh', 'poiuytre'),
	(N'Trần Thị Q', '0987654592', N'Nữ', '1990-05-25', N'Hà Nội', 'zxcvbnml'),
	(N'Lê Văn R', '9876544383', N'Nam', '1987-10-08', N'Đà Nẵng', 'lkjhgfds'),
	(N'Phạm Thị S', '0123456274', N'Nữ', '1992-04-17', N'Hồ Chí Minh', 'qwertyui');
SELECT *
FROM BENHNHAN
SELECT *
FROM BENHNHANLog
-- DELETE BENHNHANLog