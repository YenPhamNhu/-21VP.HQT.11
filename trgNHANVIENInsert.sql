-- https://www.mssqltips.com/sqlservertip/7429/sql-triggers-for-inserts-updates-and-deletes-on-a-table/
CREATE TRIGGER trgNHANVIENInsert
ON NHANVIEN
FOR INSERT
AS
   INSERT INTO NHANVIENLog
    (MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau,EncryptedMatKhau,ThaoTac,CapNhatVao,CapNhatBoi)
SELECT MaNhanVien, Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau, EncryptByPassPhrase('MAK', MatKhau ), 'INSERT', GETDATE(), SUSER_NAME()
FROM INSERTED
GO  