-- https://www.mssqltips.com/sqlservertip/5909/sql-server-trigger-example/
USE QLPKNK;
GO
--2/CREATE INSERT, UPDATE, DELETE TRIGGER  BENHNHAN
DROP TRIGGER IF EXISTS trgBENHNHAN
GO
CREATE TRIGGER trgBENHNHAN ON dbo.BENHNHAN
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.BENHNHANLog
            (MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.BENHNHANLog
            (MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.BENHNHANLog
        (MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
    SELECT MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END   
GO
--2/CREATE INSERT, UPDATE, DELETE TRIGGER  NHANVIEN
DROP TRIGGER IF EXISTS trgNHANVIEN
GO
CREATE TRIGGER trgNHANVIEN ON dbo.NHANVIEN
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.NHANVIENLog
            (MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.NHANVIENLog
            (MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.NHANVIENLog
        (MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
    SELECT MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END   
GO

--3/CREATE INSERT, UPDATE, DELETE TRIGGER  NHASI
DROP TRIGGER IF EXISTS trgNHASI
GO
CREATE TRIGGER trgNHASI ON dbo.NHASI
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.NHASILog
            (MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.NHASILog
            (MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.NHASILog
        (MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
    SELECT MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END   
GO

--4/CREATE INSERT, UPDATE, DELETE TRIGGER QTV
DROP TRIGGER IF EXISTS trgQTV
GO
CREATE TRIGGER trgQTV ON dbo.QTV
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.QTVLog
            (MaNhanVien, HoTen, SDT, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaNhanVien, HoTen, SDT, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.QTVLog
            (MaNhanVien, HoTen, SDT, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT MaNhanVien, HoTen, SDT, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.QTVLog
        (MaNhanVien, HoTen, SDT, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
    SELECT MaNhanVien, HoTen, SDT, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END
GO

--5/CREATE INSERT, UPDATE, DELETE TRIGGER QTV
DROP TRIGGER IF EXISTS trgLICHLAMVIEC
GO
CREATE TRIGGER trgLICHLAMVIEC ON dbo.LICHLAMVIEC
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.LICHLAMVIECLog
            (Ngay, MaNhaSi, CaDangKy)
        SELECT Ngay, MaNhaSi, CaDangKy, 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.LICHLAMVIECLog
            (Ngay, MaNhaSi, CaDangKy,ThaoTac,CapNhatVao,CapNhatBoi)
        SELECT Ngay, MaNhaSi, CaDangKy, 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.LICHLAMVIECLog
        (Ngay, MaNhaSi, CaDangKy,ThaoTac,CapNhatVao,CapNhatBoi)
    SELECT Ngay, MaNhaSi, CaDangKy, 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END
GO

--6/CREATE INSERT, UPDATE, DELETE TRIGGER LICHHEN
DROP TRIGGER IF EXISTS trgLICHHEN
GO
CREATE TRIGGER trgLICHHEN ON dbo.LICHHEN
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.LICHHENLog
            (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
        SELECT NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen, 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.LICHHENLog
            (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
        SELECT NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen, 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.LICHHENLog
        (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
    SELECT NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen, 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END
GO

--7/CREATE INSERT, UPDATE, DELETE TRIGGER LICHSUKHAMBENH
DROP TRIGGER IF EXISTS trgLICHSUKHAMBENH
GO
CREATE TRIGGER trgLICHSUKHAMBENH ON dbo.LICHSUKHAMBENH
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.LICHSUKHAMBENHLog
            (STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham)
        SELECT STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham, 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.LICHSUKHAMBENHLog
            (STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham)
        SELECT STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham, 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.LICHSUKHAMBENHLog
        (STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham)
    SELECT STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham, 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END
GO

--8/CREATE INSERT, UPDATE, DELETE TRIGGER THUOC
DROP TRIGGER IF EXISTS trgTHUOC
GO
CREATE TRIGGER trgTHUOC ON dbo.THUOC
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.THUOCLog
            (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
        SELECT MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho, 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.THUOCLog
            (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
        SELECT MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho, 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.THUOCLog
        (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
    SELECT MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho, 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END
GO

--9/CREATE INSERT, UPDATE, DELETE TRIGGER THUOC
DROP TRIGGER IF EXISTS trgDICHVU
GO
CREATE TRIGGER trgDICHVU ON dbo.DICHVU
FOR INSERT, UPDATE, DELETE
AS
DECLARE @login_name VARCHAR(128)
 
    SELECT @login_name = login_name
FROM sys.dm_exec_sessions
WHERE   session_id = @@SPID
    
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.DICHVULog
            (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
        SELECT MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho, 'UPDATE', GETDATE(), SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.DICHVULog
            (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
        SELECT MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho, 'DELETE', GETDATE(), SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.THUOCLog
        (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
    SELECT MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho, 'INSERT', GETDATE(), SUSER_NAME()
    FROM inserted as i
END
GO