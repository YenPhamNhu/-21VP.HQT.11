create database QLPKNK

USE QLPKNK
GO

--drop database QLPKNK
--go

create table QTV(
	MaNhanVien int unique identity(1,1),
	HoTen nvarchar(50),
	SDT varchar(10) unique,
	MatKhau varchar(8),
	constraint PK_QTV primary key (MaNhanVien)
)

create table NHANVIEN(
	MaNhanVien int unique identity(1,1),
	Hoten nvarchar(50),
	SDT varchar(10) unique,
	GioiTinh nvarchar(5) check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	DiaChi nvarchar(50),
	TinhTrangHoatDong nvarchar(20) check (TinhTrangHoatDong = N'Còn làm' or TinhTrangHoatDong = N'Nghỉ làm'),
	ViTri nvarchar(50),
	MatKhau varchar(8),
	constraint PK_NHANVIEN primary key (MaNhanVien)
)

create table BENHNHAN(
	MaBenhNhan int unique identity(1,1),
	HoTen nvarchar(50),
	SDT varchar(10) unique,
	GioiTinh nvarchar(5) check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	NgaySinh datetime,
	DiaChi nvarchar(50),
	MatKhau varchar(8),
	constraint PK_BENHNHAN primary key (MaBenhNhan)
)

create table NHASI(
	MaNhaSi int unique identity(1,1),
	HoTen nvarchar(50),
	SDT varchar(10) unique,
	GioiTinh nvarchar(5) check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	NgaySinh datetime,
	DiaChi nvarchar(50),
	ChuyenMon nvarchar(50),
	BangCap nvarchar(50),
	MatKhau varchar(8),
	constraint PK_NHASI primary key (MaNhaSi)
)

create table LICHLAMVIEC(
	Ngay datetime,
	MaNhaSi int,
	STT int unique identity(1,1),
	CaDangKy nvarchar(50),
	constraint PK_LICHLAMVIEC primary key (STT)
)

create table LICHHEN(
	MaLichHen int unique identity(1,1),
	NgayGioKham datetime,
	MaBenhNhan varchar(6),
	MaNhaSi varchar(6),
	TrangThaiLichHen varchar(50),
	constraint PK_LICHHEN primary key (MaLichHen)
)

create table LICHSUKHAMBENH(
	STT int unique identity(1,1),
	MaBenhNhan int,
	NhaSiKham int,
	GhiChu nvarchar(50),
	NgayKham datetime,
	constraint PK_LICHSUKHAMBENH primary key (STT)
)

create table DONTHUOC(
	MaDonThuoc varchar(6) unique not null,
	LieuDung nvarchar(50),
	SoLuong nvarchar(50),
	constraint PK_DONTHUOC primary key (MaDonThuoc)
)

create table THUOC(
	MaThuoc varchar(6) unique not null,
	NgayHetHan datetime,
	TenThuoc nvarchar(50),
	DonViTinh nvarchar(50),
	DonGia int,
	ChiDinh nvarchar(50),
	SoLuongTonKho int,
	constraint PK_THUOC primary key (MaThuoc, NgayHetHan)
)

create table DICHVU(
	MaDichVu varchar(6) unique not null,
	TenDichVu nvarchar(50),
	MoTa nvarchar(255),
	DonGia int,
	constraint PK_DICHVU primary key (MaDichVu)
)

create table DICHVUSUDUNG(
	STT varchar(6),
	MaHoaDon varchar(6),
	MaDichVu varchar(6),
)

create table HOADON(
	MaHoaDon varchar(6) unique,
	MaBenhNhan varchar(6),
	TenThuoc nvarchar(255),
	TongTien int,
	TinhTrangThanhToan nvarchar(50) check (TinhTrangThanhToan = N'Đã thanh toán' or TinhTrangThanhToan = N'Chưa thanh toán'),
	NhaSiKham nvarchar(50),
	NgayThanhToan datetime,
	constraint PK_THANHTOAN primary key (MaHoaDon, MaBenhNhan)
)


alter table BENHNHAN
add
constraint FK_BENHNHAN_LICHSUKHAMBENH
foreign key (MaBenhNhan)
references LICHSUKHAMBENH

alter table DICHVU
