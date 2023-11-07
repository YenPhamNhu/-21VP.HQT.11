-- https://www.mssqltips.com/sqlservertip/7429/sql-triggers-for-inserts-updates-and-deletes-on-a-table/
CREATE TRIGGER trgQTVInsert
ON QTV
FOR INSERT
AS
   INSERT INTO QTVLog
    (MaNhanVien, HoTen, SDT, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
SELECT MaNhanVien, HoTen, SDT, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
FROM INSERTED
GO  