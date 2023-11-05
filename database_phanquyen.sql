create database QLPKNK
drop database QLPKNK
go
USE QLPKNK
GO
--1/Tạo bảng quản trị viên: 
--By default, the starting value = 1, and increment by 1 for each new record.
create table QTV(
	MaNhanVien int unique not null identity(1,1),
	HoTen nvarchar(50) not null,
	SDT varchar(10) unique not null,
	MatKhau varchar(8) not null,
	constraint PK_QTV primary key (MaNhanVien)
)
--2/Tạo bảng nhân viên:
--By default, the starting value = 10, and increment by 1 for each new record.
create table NHANVIEN(
	MaNhanVien int unique not null identity(10,1),
	Hoten nvarchar(50) not null,
	SDT varchar(10) unique not null,
	GioiTinh nvarchar(5) not null check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	DiaChi nvarchar(50) not null,
	TinhTrangHoatDong nvarchar(20) not null check (TinhTrangHoatDong = N'Còn làm' or TinhTrangHoatDong = N'Nghỉ làm'),
	ViTri nvarchar(50) not null,
	MatKhau varchar(8) not null,
	constraint PK_NHANVIEN primary key (MaNhanVien)
)
--3/Tạo bảng nha sĩ:
--By default, the starting value = 100, and increment by 1 for each new record.
create table NHASI(
	MaNhaSi int unique not null identity(100,1),
	HoTen nvarchar(50) not null,
	SDT varchar(10) unique not null,
	GioiTinh nvarchar(5) not null check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	NgaySinh datetime not null,
	DiaChi nvarchar(50) not null,
	ChuyenMon nvarchar(50) not null,
	BangCap nvarchar(50) not null,
	MatKhau varchar(8) not null,
	constraint PK_NHASI primary key (MaNhaSi)
)
--4/Tạo bảng bệnh nhân:
--By default, the starting value = 1000, and increment by 1 for each new record.
create table BENHNHAN(
	MaBenhNhan int unique not null identity(1000,1),
	HoTen nvarchar(50) not null,
	SDT varchar(10) unique not null,
	GioiTinh nvarchar(5) not null check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	NgaySinh datetime not null,
	DiaChi nvarchar(50) not null,
	MatKhau varchar(8) not null,
	constraint PK_BENHNHAN primary key (MaBenhNhan)
)
--5/Tạo bảng Nha sĩ đăng ký lịch làm việc:
create table LICHLAMVIEC(
	STT int unique not null identity(1,1),
	Ngay datetime not null,
	MaNhaSi int not null,
	CaDangKy nvarchar(50) not null,
	constraint PK_LICHLAMVIEC primary key (STT)
)
--6/Tạo bảng Lịch hẹn:
create table LICHHEN(
	MaLichHen int unique not null identity(1,1),
	NgayGioKham datetime not null,
	MaBenhNhan int not null,
	MaNhaSi int not null,
	TrangThaiLichHen nvarchar(50) not null check (TrangThaiLichHen = N'Đã đặt' or TrangThaiLichHen = N'Đã hủy'),
	constraint PK_LICHHEN primary key (MaLichHen)
)
--7/Tạo bảng Hồ sơ Lịch sử khám bệnh:
create table LICHSUKHAMBENH(
	STT int not null,
	MaBenhNhan int not null,
	MaNhaSiKham int not null,
	GhiChu nvarchar(50),
	NgayKham datetime not null,
	constraint PK_LICHSUKHAMBENH primary key (STT, MaBenhNhan)
)
--8/Tạo bảng danh sách thuốc:
create table THUOC(
	MaThuoc int unique not null identity(1,1),
	NgayHetHan datetime not null,
	TenThuoc nvarchar(50) not null,
	DonViTinh nvarchar(50) not null,
	DonGia int not null,
	ChiDinh nvarchar(50),
	SoLuongTonKho int not null,
	constraint PK_THUOC primary key (MaThuoc, NgayHetHan)
)
--9/Tạo bảng đơn thuốc của bệnh nhân 
create table DONTHUOC(
	MaDonThuoc int unique not null identity(1,1),
	MaThuoc int not null,
	MaBenhNhan int not null,
	NgaySuDung datetime not null,
	NgayHetHan datetime not null,
	LieuDung nvarchar(50) not null,
	STTLichSuKB int not null,
	SoLuong int not null,
	constraint PK_DONTHUOC primary key (MaDonThuoc)
)
--10/Tạo bảng danh mục dịch vụ
create table DICHVU(
	MaDichVu int unique not null identity(1,1),
	TenDichVu nvarchar(50) not null,
	MoTa nvarchar(255) not null,
	DonGia int not null,
	constraint PK_DICHVU primary key (MaDichVu)
)
--11/Tạo bảng danh sách dịch vụ sử dụng của bệnh nhân
create table DICHVUSUDUNG(
	MaPhieuDVSD int unique not null identity(1,1),
	NgaySuDung datetime not null,
	STTLichSuKB int not null,
	MaBenhNhan int not null,
	MaDichVu int,
	SoLuong int default 0 ,
	constraint PK_DICHVUSUDUNG primary key (MaPhieuDVSD)
)
--12/Tạo bảng hóa đơn
create table HOADON(
	MaHoaDon int unique not null identity(1,1),
	MaBenhNhan int not null,
	STTLichSuKB int not null,
	MaPhieuDVSD int,
	TongTien int,
	TinhTrangThanhToan nvarchar(50) check (TinhTrangThanhToan = N'Đã thanh toán' or TinhTrangThanhToan = N'Chưa thanh toán'),
	NgayThanhToan datetime,
	MaDonThuoc int,
	MaLichHen int,
	constraint PK_THANHTOAN primary key (MaHoaDon, MaBenhNhan, STTLichSuKB, MaPhieuDVSD )
)
-- Tạo khóa ngoại
alter table LICHLAMVIEC
add
constraint FK_LICHLAMVIEC_NHASI
foreign key (MaNhaSi)
references NHASI

alter table LICHHEN
add
constraint FK_LICHHEN_NHASI
foreign key (MaNhaSi)
references NHASI,
constraint FK_LICHHEN_BENHNHAN
foreign key (MaBenhNhan)
references BENHNHAN

alter table LICHSUKHAMBENH
add
constraint FK_LICHSUKHAMBENH_NHASI
foreign key (MaNhaSiKham)
references NHASI,
constraint FK_LICHSUKHAMBENH_BENHNHAN
foreign key (MaBenhNhan)
references BENHNHAN

alter table DONTHUOC
add
constraint FK_DONTHUOC_THUOC
foreign key (MaThuoc, NgayHetHan)
references THUOC,
constraint FK_DONTHUOC_LICHSUKHAMBENH
foreign key (STTLichSuKB, MaBenhNhan)
references LICHSUKHAMBENH

alter table DICHVUSUDUNG
add
constraint FK_DICHVUSUDUNG_DICHVU
foreign key (MaDichVu)
references DICHVU,
constraint FK_DICHVUSUDUNG_LICHSUKHAMBENH
foreign key (STTLichSuKB, MaBenhNhan)
references LICHSUKHAMBENH

alter table HOADON
add
constraint FK_HOADON_DICHVUSUDUNG
foreign key (MaPhieuDVSD)
references DICHVUSUDUNG,
constraint FK_HOADON_LICHSUKHAMBENH
foreign key (STTLichSuKB, MaBenhNhan)
references LICHSUKHAMBENH,
constraint FK_HOADON_DONTHUOC
foreign key (MaDonThuoc)
references DONTHUOC,
constraint FK_HOADON_LICHHEN
foreign key (MaLichHen)
references LICHHEN
