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

CREATE TRIGGER trgEmployeeAudit ON dbo.Employee
FOR INSERT, UPDATE, DELETE
AS
IF EXISTS ( SELECT 0
FROM Deleted )
BEGIN
    IF EXISTS ( SELECT 0
    FROM Inserted )
   BEGIN
        INSERT  INTO dbo.EmpLog
            ( EmployeeID,
            FirstName,
            LastName,
            HireDate,
            Operation,
            UpdatedOn,
            UpdatedBy
            )
        SELECT u.EmployeeID ,
            u.FirstName,
            u.LastName ,
            u.HireDate ,
            'Updated',
            GETDATE() ,
            SUSER_NAME()
        FROM deleted as u
    END
ELSE
   BEGIN
        INSERT  INTO dbo.EmpLog
            ( EmployeeID ,
            FirstName,
            LastName,
            HireDate,
            Operation,
            UpdatedOn,
            UpdatedBy
            )
        SELECT d.EmployeeID ,
            d.FirstName ,
            d.LastName ,
            d.HireDate ,
            'Deleted',
            GETDATE() ,
            SUSER_NAME()
        FROM deleted as d
    END
END
ELSE
   BEGIN
    INSERT  INTO dbo.EmpLog
        ( EmployeeID ,
        FirstName,
        LastName,
        HireDate,
        Operation,
        UpdatedOn,
        UpdatedBy
        )
    SELECT i.EmployeeID ,
        i.FirstName ,
        i.LastName ,
        i.HireDate ,
        'Inserted',
        GETDATE() ,
        SUSER_NAME()
    FROM inserted as i
END   
GO