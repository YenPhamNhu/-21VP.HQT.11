-- https://www.sqlshack.com/move-or-copy-sql-logins-with-assigning-roles-and-permissions/
-- the script for Windows logins and SQL Logins for SQL Server migrate logins
-- SELECT 'IF (SUSER_ID('+QUOTENAME(SP.name,'''')+') IS NULL) BEGIN CREATE LOGIN ' +QUOTENAME(SP.name)+
--                CASE 
--                     WHEN SP.type_desc = 'SQL_LOGIN' THEN ' WITH PASSWORD = ' +CONVERT(NVARCHAR(MAX),SL.password_hash,1)+ ' HASHED, CHECK_EXPIRATION = ' 
--                         + CASE WHEN SL.is_expiration_checked = 1 THEN 'ON' ELSE 'OFF' END +', CHECK_POLICY = ' +CASE WHEN SL.is_policy_checked = 1 THEN 'ON,' ELSE 'OFF,' END
--                     ELSE ' FROM WINDOWS WITH'
--                 END 
--        +' DEFAULT_DATABASE=[' +SP.default_database_name+ '], DEFAULT_LANGUAGE=[' +SP.default_language_name+ '] END;' COLLATE SQL_Latin1_General_CP1_CI_AS AS [-- Logins To Be Created --]
-- FROM sys.server_principals AS SP
--     LEFT JOIN sys.sql_logins AS SL ON SP.principal_id = SL.principal_id
-- WHERE SP.type IN ('S','G','U')
--     AND SP.name NOT LIKE '##%##'
--     AND SP.name NOT LIKE 'NT AUTHORITY%'
--     AND SP.name NOT LIKE 'NT SERVICE%'
--     AND SP.name <> ('sa')
--     AND SP.name <> 'distributor_admin'

-- GO
-- SELECT 'USE '+ DB_NAME()+'; CREATE USER ['+dp.name+'] FOR LOGIN ['+dp.name+'];'+ 
--         'ALTER USER ['+dp.name+'] WITH DEFAULT_SCHEMA=['+dp.default_schema_name+'];' AS [-- Logins To Be Created --]
-- FROM sys.database_principals AS dp
--     INNER JOIN sys.server_principals sp ON dp.sid = sp.sid
-- WHERE (dp.type in ('S','G','U'))
--     AND dp.name NOT LIKE '##%##'
--     AND dp.name NOT LIKE 'NT AUTHORITY%'
--     AND dp.name NOT LIKE 'NT SERVICE%'
--     AND dp.name <> ('sa')
--     AND dp.default_schema_name IS NOT NULL
--     AND dp.name <> 'distributor_admin'
--     AND dp.principal_id > 4
--Bước 1: Tạo 4 login: 'LoginQTV','LoginNHANVIEN','LoginNHASI','LoginBENHNHAN'
USE [QLPKNK]
IF NOT EXISTS 
    (SELECT name
FROM QLPKNK.sys.server_principals
WHERE name in ('LoginQTV','LoginNHANVIEN','LoginNHASI','LoginBENHNHAN'))
BEGIN
    --Tạo 4 login: 'LoginQTV','LoginNHANVIEN','LoginNHASI','LoginBENHNHAN'
    CREATE LOGIN [LoginQTV] WITH PASSWORD = '12345678'
	,DEFAULT_DATABASE=[QLPKNK], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
    CREATE LOGIN [LoginNHANVIEN] WITH PASSWORD = '12345678'
	,DEFAULT_DATABASE=[QLPKNK], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
    CREATE LOGIN [LoginNHASI] WITH PASSWORD = '12345678'
	,DEFAULT_DATABASE=[QLPKNK], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
    CREATE LOGIN [LoginBENHNHAN] WITH PASSWORD = '12345678'
	,DEFAULT_DATABASE=[QLPKNK], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
END
GO
USE [QLPKNK]
GO
--Tạo user cho 5 login trên csdl QLPKNK:
IF NOT EXISTS (SELECT [name]
FROM [sys].[database_principals]
WHERE [name] in ('userQTV','userNHANVIEN','userNHASI','userBENHNHAN'))
Begin
    CREATE USER [userQTV] 
    FOR LOGIN [LoginQTV] WITH DEFAULT_SCHEMA=[dbo];
    CREATE USER [userNHANVIEN] 
    FOR LOGIN [LoginNHANVIEN] WITH DEFAULT_SCHEMA=[dbo];
    CREATE USER [userNHASI] 
    FOR LOGIN [LoginNHASI] WITH DEFAULT_SCHEMA=[dbo];
    CREATE USER [userBENHNHAN] 
    FOR LOGIN [LoginBENHNHAN] WITH DEFAULT_SCHEMA=[dbo];
end
GO
--PHÂN QUYỀN: Quan Tri Vien
IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'QTV'
    and type = 'R'
        )
BEGIN
    ALTER ROLE [Lead] ADD MEMBER [userC]
END
ELSE IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'QTV'
    and type = 'R'
        )
BEGIN
    --Quan Tri Vien (create db, create table, create proc, …)
    GRANT CREATE TABLE TO [QTV]
    GRANT CREATE PROC TO [QTV]
    GRANT CREATE DATABASE TO [QTV]
    GRANT INSERT TO [QTV]
    GRANT ALTER TO [QTV]
    GRANT SELECT TO [QTV]
    GRANT UPDATE TO [QTV]
    GRANT DELETE TO [QTV]
    ALTER ROLE [QTV] ADD MEMBER [userQTV]
END
GO
--PHÂN QUYỀN: NHASI
IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'NHASI'
    and type = 'R'
        )
BEGIN
    ALTER ROLE [Lead] ADD MEMBER [userD]
END
ELSE IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'NHASI'
    and type = 'R'
        )
BEGIN
    --Users (select)
    GRANT SELECT TO [NHASI]
    ALTER ROLE [NHASI] ADD MEMBER [userNHASI]
END
GO
--PHÂN QUYỀN: NHANVIEN
IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'NHANVIEN'
    and type = 'R'
        )
BEGIN
    ALTER ROLE [Lead] ADD MEMBER [userD]
END
ELSE IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'NHANVIEN'
    and type = 'R'
        )
BEGIN
    --Users (select)
    GRANT SELECT TO [NHANVIEN]
    ALTER ROLE [NHANVIEN] ADD MEMBER [userNHANVIEN]
END
GO
--CẤP QUYỀN CHO USER Nhân viên (đã có tài khoản) :
USE QLPKNK;
-- Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) 

-- Có quyền thêm hồ sơ bệnh nhân gồm: họ tên, ngày sinh, địa chỉ, số điện thoại (gọi giao tác TaoTaiKhoanBenhNhan). 
GRANT INSERT ON dbo.BENHNHAN(HoTen, SDT, GioiTinh, NgaySinh, DiaChi) TO [userNHANVIEN]
-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tinh. 
GRANT SELECT ON dbo.NHASI(HoTen, SDT, GioiTinh, NgaySinh, DiaChi) TO [userNHANVIEN]
-- Có quyền được cập nhật thông tin cá nhân của bệnh nhân (gọi giao tác CapNhatThongTin) 
GRANT UPDATE ON dbo.BENHNHAN(HoTen, SDT, GioiTinh, NgaySinh, DiaChi) TO [userNHANVIEN]
-- Có quyền được xem thông tin của nha sĩ (gọi giao tác XemThongTinNhaSi) và bệnh nhân (gọi giao tác XemThongTinBenhNhan) 
GRANT SELECT ON dbo.NHASI TO [userNHANVIEN]
GRANT SELECT ON dbo.BENHNHAN TO [userNHANVIEN]
-- Có quyền ghi nhận vào hệ thống thông tin đặt khám hoặc đăng kí cho khách hàng (gọi giao tác GhiNhanDatKhamBenh) 
GRANT INSERT ON dbo.LICHHEN TO [userNHANVIEN]
-- Có quyền thông báo (in) cho khách hàng lịch đăng kí (gọi giao tác ThongBaoLichKham) 

-- Có quyền xem danh mục thuốc (gọi giao tác XemDanhMucThuoc) gồm mã thuốc, tên thuốc, đơn vị tính, chỉ định, số lượng tồn trong kho và ngày hết hạn của thuốc. 
GRANT SELECT ON dbo.THUOC TO [userNHANVIEN]
-- Có quyền tìm kiếm hồ sơ khám bệnh của bệnh nhân (gọi giao tác TimKiemHoSoBenhNhan) để lấy thông tin khám gồm dịch vụ, phí khám, đơn thuốc để lập hóa đơn thanh toán (gọi giao tác LapHoaDonThanhToan) 

-- Có quyền thanh đổi trạng thái thanh toán của hóa đơn (gọi giao tác ThayDoiTrangThaiThanhToan). 

-- Có quyền đăng xuất khỏi tài khoản (gọi giao tác DangXuat) 
GO
--userD: có thể cấp những quyền đang có (select) cho 1 userE.
GRANT CONTROL ON USER::userE TO userD;  