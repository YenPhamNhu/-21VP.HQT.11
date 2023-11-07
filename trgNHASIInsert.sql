-- https://www.mssqltips.com/sqlservertip/7429/sql-triggers-for-inserts-updates-and-deletes-on-a-table/
CREATE TRIGGER trgNHASIInsert
ON NHASI
FOR INSERT
AS
   INSERT INTO NHASILog
    (MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
SELECT MaNhaSi, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
FROM INSERTED
GO  