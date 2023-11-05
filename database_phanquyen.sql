USE MASTER
GO
IF DB_ID('QLPKNK') IS NOT NULL
BEGIN
    DROP DATABASE QLPKNK
END
create database QLPKNK
GO
USE QLPKNK
GO
--1/Tạo bảng quản trị viên: 
--By default, the starting value = 1, and increment by 1 for each new record.
IF OBJECT_ID('dbo.QTV', 'U') IS NOT NULL 
  DROP TABLE dbo.QTV;
create table QTV(
	MaNhanVien int unique not null identity(1,1),
	HoTen nvarchar(50) not null,
	SDT varchar(10) unique not null,
	MatKhau varchar(8) not null,
	constraint PK_QTV primary key (MaNhanVien)
)
--2/Tạo bảng nhân viên:
--By default, the starting value = 10, and increment by 1 for each new record.
IF OBJECT_ID('dbo.NHANVIEN', 'U') IS NOT NULL 
  DROP TABLE dbo.NHANVIEN;
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
IF OBJECT_ID('dbo.NHASI', 'U') IS NOT NULL 
  DROP TABLE dbo.NHASI;
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
IF OBJECT_ID('dbo.BENHNHAN', 'U') IS NOT NULL 
  DROP TABLE dbo.BENHNHAN;
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
IF OBJECT_ID('dbo.LICHLAMVIEC', 'U') IS NOT NULL 
  DROP TABLE dbo.LICHLAMVIEC;
create table LICHLAMVIEC(
	STT int unique not null identity(1,1),
	Ngay datetime not null,
	MaNhaSi int not null,
	CaDangKy nvarchar(50) not null,
	constraint PK_LICHLAMVIEC primary key (STT)
)
--6/Tạo bảng Lịch hẹn:
IF OBJECT_ID('dbo.LICHHEN', 'U') IS NOT NULL 
  DROP TABLE dbo.LICHHEN;
create table LICHHEN(
	MaLichHen int unique not null identity(1,1),
	NgayGioKham datetime not null,
	MaBenhNhan int not null,
	MaNhaSi int not null,
	TrangThaiLichHen nvarchar(50) not null check (TrangThaiLichHen = N'Đã đặt' or TrangThaiLichHen = N'Đã hủy'),
	constraint PK_LICHHEN primary key (MaLichHen)
)
--7/Tạo bảng Hồ sơ Lịch sử khám bệnh:
IF OBJECT_ID('dbo.LICHSUKHAMBENH', 'U') IS NOT NULL 
  DROP TABLE dbo.LICHSUKHAMBENH;
create table LICHSUKHAMBENH(
	STT int not null,
	MaBenhNhan int not null,
	MaNhaSiKham int not null,
	GhiChu nvarchar(50),
	NgayKham datetime not null,
	constraint PK_LICHSUKHAMBENH primary key (STT, MaBenhNhan)
)
--8/Tạo bảng danh sách thuốc:
IF OBJECT_ID('dbo.THUOC', 'U') IS NOT NULL 
  DROP TABLE dbo.THUOC;
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
IF OBJECT_ID('dbo.DONTHUOC', 'U') IS NOT NULL 
  DROP TABLE dbo.DONTHUOC;
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
--10/Tạo bảng danh mục dịch vụ
IF OBJECT_ID('dbo.DICHVU', 'U') IS NOT NULL 
  DROP TABLE dbo.DICHVU;
create table DICHVU(
	MaDichVu int unique not null identity(1,1),
	TenDichVu nvarchar(50) not null,
	MoTa nvarchar(255) not null,
	DonGia int not null,
	constraint PK_DICHVU primary key (MaDichVu)
)
--11/Tạo bảng danh sách dịch vụ sử dụng của bệnh nhân
IF OBJECT_ID('dbo.DICHVUSUDUNG', 'U') IS NOT NULL 
  DROP TABLE dbo.DICHVUSUDUNG;
create table DICHVUSUDUNG(
	MaPhieuDVSD int unique not null identity(1,1),
	NgaySuDung datetime not null,
	STTLichSuKB int not null,
	MaBenhNhan int not null,
	MaDichVu int,
	SoLuong int default 0 ,
	constraint PK_DICHVUSUDUNG primary key (MaPhieuDVSD, MaBenhNhan, STTLichSuKB)
)
--12/Tạo bảng hóa đơn
IF OBJECT_ID('dbo.HOADON', 'U') IS NOT NULL 
  DROP TABLE dbo.HOADON; 
create table HOADON(
	MaHoaDon int unique not null identity(1,1),
	MaBenhNhan int not null,
	STTLichSuKB int not null,
	--STTDichVuSD int,
	TongTien int,
	TinhTrangThanhToan nvarchar(50) check (TinhTrangThanhToan = N'Đã thanh toán' or TinhTrangThanhToan = N'Chưa thanh toán'),
	NgayThanhToan datetime,
	MaDonThuoc int,
	MaPhieuDVSD int,
	--MaLichHen int,
	constraint PK_THANHTOAN primary key (MaHoaDon, MaBenhNhan, STTLichSuKB, MaPhieuDVSD , MaDonThuoc)
)
--Khóa ngoại:
--1/FK_BENHNHAN(MaBenhNhan)_LICHSUKHAMBENH(MaBenhNhan)
USE QLPKNK
ALTER TABLE LICHSUKHAMBENH
ADD CONSTRAINT FK_BENHNHAN_LICHSUKHAMBENH
FOREIGN KEY (MaBenhNhan) REFERENCES BENHNHAN(MaBenhNhan);
--2/FK_DICHVU(MaDichVu)_DICHVUSUDUNG(MaDichVu)
ALTER TABLE DICHVUSUDUNG
ADD CONSTRAINT FK_DICHVU_DICHVUSUDUNG
FOREIGN KEY (MaDichVu) REFERENCES DICHVU(MaDichVu);
--3/FK_THUOC(MaThuoc)_DONTHUOC(MaThuoc)
ALTER TABLE DONTHUOC
ADD CONSTRAINT FK_THUOC_DONTHUOC
FOREIGN KEY (MaThuoc) REFERENCES THUOC(MaThuoc);
--4/FK_DICHVUSUDUNG(STTLichSuKB,MaBenhNhan) _LICHSUKHAMBENH(STT,MaBenhNhan)
ALTER TABLE DICHVUSUDUNG
ADD CONSTRAINT FK_DICHVUSUDUNG_LICHSUKHAMBENH
FOREIGN KEY (STTLichSuKB,MaBenhNhan) 
REFERENCES LICHSUKHAMBENH(STT,MaBenhNhan);
--5/FK_DONTHUOC(STTLichSuKB,MaBenhNhan) _LICHSUKHAMBENH(STT,MaBenhNhan)
ALTER TABLE DONTHUOC
ADD CONSTRAINT FK_DONTHUOC_LICHSUKHAMBENH
FOREIGN KEY (STTLichSuKB,MaBenhNhan) 
REFERENCES LICHSUKHAMBENH(STT,MaBenhNhan);

--6/FK_HOADON(MaDonThuoc)_DONTHUOC(MaDonThuoc)
ALTER TABLE HOADON
ADD CONSTRAINT FK_HOADON_DONTHUOC
FOREIGN KEY (MaDonThuoc) REFERENCES DONTHUOC(MaDonThuoc)
--7/FK_HOADON(MaPhieuDVSD)_DICHVUSUDUNG(MaPhieuDVSD)
ALTER TABLE HOADON
ADD CONSTRAINT FK_HOADON_DICHVUSUDUNG
FOREIGN KEY (MaPhieuDVSD) REFERENCES DICHVUSUDUNG(MaPhieuDVSD)