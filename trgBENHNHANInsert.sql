-- https://www.mssqltips.com/sqlservertip/7429/sql-triggers-for-inserts-updates-and-deletes-on-a-table/
CREATE TRIGGER trgBENHNHANInsert
ON BENHNHAN
FOR INSERT
AS
   INSERT INTO BENHNHANLog
    (MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
SELECT MaBenhNhan, HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
FROM INSERTED
GO  