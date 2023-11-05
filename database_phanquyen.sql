create database QLPKNK

USE QLPKNK
GO

--drop database QLPKNK
--go

create table QTV(
	MaNhanVien int unique not null identity(1,1),
	HoTen nvarchar(50) not null,
	SDT varchar(10) unique not null,
	MatKhau varchar(8) not null,
	constraint PK_QTV primary key (MaNhanVien)
)

create table NHANVIEN(
	MaNhanVien int unique not null identity(1,1),
	Hoten nvarchar(50) not null,
	SDT varchar(10) unique not null,
	GioiTinh nvarchar(5) not null check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	DiaChi nvarchar(50) not null,
	TinhTrangHoatDong nvarchar(20) not null check (TinhTrangHoatDong = N'Còn làm' or TinhTrangHoatDong = N'Nghỉ làm'),
	ViTri nvarchar(50) not null,
	MatKhau varchar(8) not null,
	constraint PK_NHANVIEN primary key (MaNhanVien)
)

create table BENHNHAN(
	MaBenhNhan int unique not null identity(1,1),
	HoTen nvarchar(50) not null,
	SDT varchar(10) unique not null,
	GioiTinh nvarchar(5) not null check (GioiTinh = N'Nam' or GioiTinh = N'Nữ'),
	NgaySinh datetime not null,
	DiaChi nvarchar(50) not null,
	MatKhau varchar(8) not null,
	constraint PK_BENHNHAN primary key (MaBenhNhan)
)

create table NHASI(
	MaNhaSi int unique not null identity(1,1),
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

create table LICHLAMVIEC(
	STT int unique not null identity(1,1),
	Ngay datetime not null,
	MaNhaSi int not null,
	CaDangKy nvarchar(50) not null,
	constraint PK_LICHLAMVIEC primary key (STT)
)

create table LICHHEN(
	MaLichHen int unique not null identity(1,1),
	NgayGioKham datetime not null,
	MaBenhNhan int not null,
	MaNhaSi int not null,
	TrangThaiLichHen nvarchar(50) not null check (TrangThaiLichHen = N'Đã đặt' or TrangThaiLichHen = N'Đã hủy'),
	constraint PK_LICHHEN primary key (MaLichHen)
)

create table LICHSUKHAMBENH(
	STT int not null,
	MaBenhNhan int not null,
	MaNhaSiKham int not null,
	GhiChu nvarchar(50),
	NgayKham datetime not null,
	constraint PK_LICHSUKHAMBENH primary key (STT, MaBenhNhan)
)

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

create table DONTHUOC(
	MaDonThuoc int unique not null identity(1,1),
	MaThuoc int not null,
	MaBenhNhan int not null,
	NgaySuDung datetime not null,
	NgayHetHan datetime not null,
	LieuDung nvarchar(50) not null,
	STTLichSuKB int not null,
	SoLuong int not null,
	constraint PK_DONTHUOC primary key (MaDonThuoc, MaBenhNhan, STTLichSuKB)
)

create table DICHVU(
	MaDichVu int unique not null identity(1,1),
	TenDichVu nvarchar(50) not null,
	MoTa nvarchar(255) not null,
	DonGia int not null,
	constraint PK_DICHVU primary key (MaDichVu)
)

create table DICHVUSUDUNG(
	MaPhieuDVSD int unique not null identity(1,1),
	NgaySuDung datetime not null,
	STTLichSuKB int not null,
	MaBenhNhan int not null,
	MaDichVu int,
	SoLuong int default 0 ,
	constraint PK_DICHVUSUDUNG primary key (MaPhieuDVSD, MaBenhNhan, STTLichSuKB)
)

create table HOADON(
	MaHoaDon int unique not null identity(1,1),
	MaBenhNhan int not null,
	STTLichSuKB int not null,
	STTDichVuSD int,
	TongTien int,
	TinhTrangThanhToan nvarchar(50) check (TinhTrangThanhToan = N'Đã thanh toán' or TinhTrangThanhToan = N'Chưa thanh toán'),
	NgayThanhToan datetime,
	MaDonThuoc int,
	MaLichHen int,
	constraint PK_THANHTOAN primary key (MaHoaDon, MaBenhNhan, STTLichSuKB, STTDichVuSD )
)

alter table BENHNHAN
add
constraint FK_BENHNHAN_LICHSUKHAMBENH
foreign key (MaBenhNhan)
references LICHSUKHAMBENH

alter table DICHVU
