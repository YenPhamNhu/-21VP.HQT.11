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
    ALTER ROLE [QTV] ADD MEMBER [userQTV]
END
ELSE IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'QTV'
    and type = 'R'
        )
BEGIN
    --Quan Tri Vien (create db, create table, create proc, …)
    -- GRANT ALTER ANY SCHEMA to userQTV
    -- GRANT EXECUTE to userQTV
    -- GRANT CONTROL to userQTV
    -- GRANT SELECT , UPDATE, DELETE, INSERT TO userQTV;
    -- GRANT CONTROL ON DATABASE::QLPKNK TO userQTV;
    -- ALTER ROLE [QTV] ADD MEMBER [userQTV]
    -- GRANT INSERT ON SCHEMA :: NHASI TO userQTV WITH GRANT OPTION;
    GRANT INSERT ON SCHEMA :: NHASI TO guest;
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
    ALTER ROLE [NHASI] ADD MEMBER [userNHASI]
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
    ALTER ROLE [NHANVIEN] ADD MEMBER [userNHANVIEN]
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
--PHÂN QUYỀN: BENHNHAN
IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'BENHNHAN'
    and type = 'R'
        )
BEGIN
    ALTER ROLE [BENHNHAN] ADD MEMBER [userBENHNHAN]
END
ELSE IF EXISTS (
    SELECT *
FROM sys.database_principals
WHERE name = 'BENHNHAN'
    and type = 'R'
        )
BEGIN
    --Users (select)
    GRANT SELECT TO [BENHNHAN]
    ALTER ROLE [BENHNHAN] ADD MEMBER [userBENHNHAN]
END
GO

-- -- To retrieve all Users
-- SELECT *
-- FROM QLPKNK.sys.database_principals
-- WHERE name LIKE 'u%';

-- SELECT *
-- FROM QLPKNK.sys.sql_logins
-- WHERE name LIKE 'Login%';




