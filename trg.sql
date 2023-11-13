-- https://www.mssqltips.com/sqlservertip/5909/sql-server-trigger-example/
USE QLPKNK;
GO
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
--/CREATE INSERT, UPDATE, DELETE TRIGGER  NHANVIEN
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

--/CREATE INSERT, UPDATE, DELETE TRIGGER  NHASI
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

--/CREATE INSERT, UPDATE, DELETE TRIGGER  NHASI
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