-- //0.Người dùng khách (người dùng chưa đăng nhập) 

-- 0.1/Có quyền đăng kí tài khoản (gọi giao tác TaoTaiKhoanBenhNhan) 
-- bằng cách cung cấp họ tên, ngày sinh, giới tính, số điện thoại
-- , địa chỉ, mật khẩu (mạnh). 
IF EXISTS (SELECT *
FROM sys.procedures
WHERE name = N'TaoTaiKhoanBenhNhan' AND type = 'P')
BEGIN
    DROP PROCEDURE TaoTaiKhoanBenhNhan;
    PRINT N'Đã hủy giao tác TaoTaiKhoanBenhNhan.';
END
ELSE
BEGIN
    PRINT N'Giao tác TaoTaiKhoanBenhNhan chưa được tạo.';
END
GO
CREATE PROCEDURE TaoTaiKhoanBenhNhan
    @HoTen NVARCHAR(50),
    @SDT VARCHAR(10),
    @GioiTinh NVARCHAR(5),
    @NgaySinh DATETIME,
    @DiaChi NVARCHAR(50),
    @MatKhau VARCHAR(8)
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM BENHNHAN
    WHERE SDT = @SDT)
    BEGIN
        INSERT INTO BENHNHAN
            (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau)
        VALUES
            (@HoTen, @SDT, @GioiTinh, @NgaySinh, @DiaChi, @MatKhau);
        PRINT N'Tạo tài khoản thành công';
    END
    ELSE
    BEGIN
        -- SDT đã tồn tại, In ra màn hình
        PRINT N'Số điện thoại đã tồn tại. Tạo tài khoản không thành công';
    END
END;
GO
--//-------------------
-- 0.2/Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap)
IF EXISTS (SELECT *
FROM sys.procedures
WHERE name = N'DangNhap' AND type = 'P')
BEGIN
    DROP PROCEDURE DangNhap;
    PRINT N'Đã hủy giao tác DangNhap.';
END
ELSE
BEGIN
    PRINT N'Giao tác DangNhap chưa được tạo.';
END
GO
CREATE PROCEDURE DangNhap
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    -- Kiểm tra User là Quan Tri Vien (QTV)
    IF EXISTS (SELECT 1
    FROM QTV
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Quan Tri Vien (QTV) login successful
        SELECT 'QTV' AS UserRole;
    END
    -- Kiểm tra User là Nhan Vien (NHANVIEN)
    ELSE IF EXISTS (SELECT 1
    FROM NHANVIEN
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Nhan Vien (NHANVIEN) login successful
        SELECT 'NHANVIEN' AS UserRole;
    END
    -- Kiểm tra User là Nha Si (NHASI)
    ELSE IF EXISTS (SELECT 1
    FROM NHASI
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Nha Si (NHASI) login successful
        SELECT 'NHASI' AS UserRole;
    END
    -- Kiểm tra User là Benh Nhan (BENHNHAN)
    ELSE IF EXISTS (SELECT 1
    FROM BENHNHAN
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Benh Nhan (BENHNHAN) login successful
        SELECT 'BENHNHAN' AS UserRole;
    END
    ELSE
    BEGIN
        -- Login failed
        SELECT 'INVALID' AS UserRole;
    END
END;
GO
--//-------------------
-- //1.Bệnh nhân (đã có tài khoản) 
-- 1.1/Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) : WROTE
-- 1.2/Có quyền đặt lịch hẹn: 
-- Được quyền chọn ngày giờ khám (gọi giao tác ChonThoiGianKham). 
-- Được quyền chọn nha sĩ khám (gọi giao tác ChonNhaSiKham). 
IF EXISTS (SELECT *
FROM sys.procedures
WHERE name = N'DatLichHen' AND type = 'P')
BEGIN
    DROP PROCEDURE DatLichHen;
    PRINT N'Đã hủy giao tác DatLichHen.';
END
ELSE
BEGIN
    PRINT N'Giao tác DatLichHen chưa được tạo.';
END
GO
CREATE PROCEDURE DatLichHen
    @Ngay DATETIME,
    @SDT varchar(10),
    @MaNhaSi INT,
    @CaDangKy NVARCHAR(50)
AS
BEGIN
    DECLARE @MaBenhNhan INT;

    -- Kiểm tra tài khoản hợp lệ dựa trên SDT
    SELECT @MaBenhNhan = MaBenhNhan
    FROM BENHNHAN BN
    WHERE BN.SDT = @SDT;

    IF @MaBenhNhan IS NOT NULL
BEGIN
        -- Kiểm tra nếu có Ca trống
        IF EXISTS (
        SELECT 1
        FROM LICHLAMVIEC
        WHERE Ngay = @Ngay
            AND MaNhaSi = @MaNhaSi
            AND CaDangKy = @CaDangKy
    )
    BEGIN
            -- Khung giờ trống -> Đặt hẹn
            INSERT INTO LICHHEN
                (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
            VALUES
                (@Ngay, @MaBenhNhan, @MaNhaSi, N'Đã đặt');

            PRINT N'Đã đặt hẹn thành công.';
        END
    ELSE
    BEGIN
            -- Khung giờ muốn đặt đã hết
            PRINT N'Vui lòng chọn khung giờ khác.';
        END
    END
ELSE
BEGIN
        PRINT N'Không tìm thấy bệnh nhân với số điện thoại đã nhập.';
    END

END;

GO

-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tính. 
IF EXISTS (SELECT *
FROM sys.procedures
WHERE name = N'XemThongTinCaNhan' AND type = 'P')
BEGIN
    DROP PROCEDURE XemThongTinCaNhan;
    PRINT N'Đã hủy giao tác XemThongTinCaNhan.';
END
ELSE
BEGIN
    PRINT N'Giao tác XemThongTinCaNhan chưa được tạo.';
END
GO
CREATE PROCEDURE XemThongTinCaNhan
    @SDT VARCHAR(10)
AS
BEGIN
    -- Kiểm tra xem bệnh nhân có tồn tại trong hệ thống hay không
    IF EXISTS (SELECT 1
    FROM BENHNHAN
    WHERE SDT = @SDT)
    BEGIN
        -- Lấy thông tin cá nhân của bệnh nhân
        SELECT
            HoTen,
            NgaySinh,
            DiaChi,
            SDT,
            GioiTinh
        FROM BENHNHAN
        WHERE SDT = @SDT;
    END
    ELSE
    BEGIN
        PRINT N'Bệnh nhân không tồn tại trong hệ thống.';
    END
END;
GO
-- Có quyền được xem thông tin của nha sĩ (gọi giao tác XemThongTinNhaSi). 
IF EXISTS (SELECT *
FROM sys.procedures
WHERE name = N'XemThongTinNhaSi' AND type = 'P')
BEGIN
    DROP PROCEDURE XemThongTinNhaSi;
    PRINT N'Đã hủy giao tác XemThongTinCaNhan.';
END
ELSE
BEGIN
    PRINT N'Giao tác XemThongTinNhaSi chưa được tạo.';
END
GO
CREATE PROCEDURE XemThongTinNhaSi
    @MaNhaSi INT
AS
BEGIN
    -- Kiểm tra xem MaNhaSi có tồn tại không
    IF EXISTS (
        SELECT 1
    FROM NHASI
    WHERE MaNhaSi = @MaNhaSi
    )
    BEGIN
        -- Lấy thông tin của NhaSi
        SELECT
            HoTen AS 'Họ Tên',

            SDT AS 'Số Điện Thoại',
            GioiTinh AS 'Giới Tính',
            NgaySinh AS 'Ngày Sinh',
            DiaChi AS 'Địa Chỉ',
            ChuyenMon AS 'Chuyên Khoa',
            BangCap AS 'Bằng'
        FROM NHASI
        WHERE MaNhaSi = @MaNhaSi;
    END
    ELSE
    BEGIN
        -- Nếu MaNhaSi không tồn tại
        PRINT 'Không tìm thấy thông tin cho MaNhaSi = ' + CAST(@MaNhaSi AS NVARCHAR(10));
    END
END;

GO
-- Có quyền được cập nhật thông tin cá nhân của bệnh nhân (gọi giao tác CapNhatThongTin) 

-- Có quyền được xem hồ sơ bệnh án (lịch sử khám chữa bệnh) được nha sĩ ghi nhận lại trong quá trình điều trị (gọi giao tác XemHoSoBenhAn) 

-- Có quyền xem thông tin hoá đơn (gọi giao tác XemThongTinHoaDon) 

-- Có quyền được xem trạng thái thanh toán (gọi giao tác XemTrangThaiThanhToan) 

-- Có quyền đăng xuất khỏi tài khoản (gọi giao tác DangXuat) 

-- //2.Nha sĩ (đã có tài khoản) 

-- Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) 

-- Có quyền thêm hồ sơ bệnh nhân gồm: họ tên, ngày sinh, địa chỉ, số điện thoại (gọi giao tác TaoTaiKhoanBenhNhan). 

-- Có quyền được cập nhật thông tin cá nhân của bệnh nhân (gọi giao tác CapNhatThongTin) 

-- Có quyền cập nhật lịch làm việc của mình (gọi giao tác CapNhatLichLamViec) 

-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tinh. 

-- Có quyền được xem thông tin của nha sĩ khác (gọi giao tác XemThongTinNhaSi) và nhân viên (gọi giao tác XemThongTinNhanVien) 

-- Có quyền được xem thông tin của bệnh nhân (gọi giao tác XemThongTinBenhNhan)  

-- Có quyền ghi nhận thông tin vào hồ sơ bệnh nhân gồm: ngày, tháng, người thực hiện khám, dịch vụ sử dụng, danh sách thuốc được kê cho mỗi lần khám (gọi giao tác GhiNhanHoSoBenhAn). 

-- Có quyền xem danh mục thuốc (gọi giao tác XemDanhMucThuoc) 

-- Có quyền được xem danh sách lịch hẹn  (gọi giao tác XemDanhSachLichHen) 

-- Có quyền cập nhật lịch cá nhân của mình (gọi giao tác CapNhatLichCaNhan) 

-- Có quyền đăng xuất khỏi tài khoản (gọi giao tác DangXuat) 

-- //3.Nhân viên (đã có tài khoản) 

-- Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) 

-- Có quyền thêm hồ sơ bệnh nhân gồm: họ tên, ngày sinh, địa chỉ, số điện thoại (gọi giao tác TaoTaiKhoanBenhNhan). 

-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tinh. 

-- Có quyền được cập nhật thông tin cá nhân của bệnh nhân (gọi giao tác CapNhatThongTin) 

-- Có quyền được xem thông tin của nha sĩ (gọi giao tác XemThongTinNhaSi) và bệnh nhân (gọi giao tác XemThongTinBenhNhan) 

-- Có quyền ghi nhận vào hệ thống thông tin đặt khám hoặc đăng kí cho khách hàng (gọi giao tiếp GhiNhanDatKhamBenh) 

-- Có quyền thông báo (in) cho khách hàng lịch đăng kí (gọi giao tác ThongBaoLichKham) 

-- Có quyền xem danh mục thuốc (gọi giao tác XemDanhMucThuoc) gồm mã thuốc, tên thuốc, đơn vị tính, chỉ định, số lượng tồn trong kho và ngày hết hạn của thuốc. 

-- Có quyền tìm kiếm hồ sơ khám bệnh của bệnh nhân (gọi giao tác TimKiemHoSoBenhNhan) 
-- để lấy thông tin khám gồm dịch vụ, phí khám, đơn thuốc để lập hóa đơn thanh toán (gọi giao tác LapHoaDonThanhToan) 
IF EXISTS (SELECT *
FROM sys.procedures
WHERE name = N'TimKiemHoSoBenhNhan' AND type = 'P')
BEGIN
    DROP PROCEDURE TimKiemHoSoBenhNhan;
    PRINT N'Đã hủy giao tác TimKiemHoSoBenhNhan.';
END
ELSE
BEGIN
    PRINT N'Giao tác TimKiemHoSoBenhNhan chưa được tạo.';
END
GO
CREATE PROCEDURE TimKiemHoSoBenhNhan
    @TenBenhNhan NVARCHAR(50)
AS
BEGIN
    SELECT
        MaBenhNhan,
        HoTen,
        SDT,
        GioiTinh,
        NgaySinh,
        DiaChi
    FROM
        BENHNHAN
    WHERE
        HoTen LIKE '%' + @TenBenhNhan + '%';
END;
GO
EXEC TimKiemHoSoBenhNhan @TenBenhNhan = 'Benh Nhan';
GO
-- Có quyền thanh đổi trạng thái thanh toán của hóa đơn (gọi giao tác ThayDoiTrangThaiThanhToan). 

-- Có quyền đăng xuất khỏi tài khoản (gọi giao tác DangXuat) 

-- //4.Quản trị viên (đã có tài khoản) 

-- Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) 

-- Có quyền được xem thông tin của nha sĩ (gọi giao tác XemThongTinNhaSi), nhân viên (gọi giao tác XemThongTinNhanVien) và bệnh nhân (gọi giao tác XemThongTinBenhNhan) 

-- Có quyền được xem hồ sơ bệnh án (lịch sử khám chữa bệnh) được nha sĩ ghi nhận lại trong quá trình điều trị (gọi giao tác XemHoSoBenhAn) 

-- Có quyền xem thông tin hoá đơn (gọi giao tác XemThongTinHoaDon) 

-- Có quyền được xem trạng thái thanh toán (gọi giao tác XemTrangThaiThanhToan) 
CREATE PROCEDURE XemTrangThaiThanhToan
    @MaBenhNhan INT,
    @MaLichHen INT
AS
BEGIN
    DECLARE @TrangThaiLichHen NVARCHAR(50);
    DECLARE @TongTien INT;
    DECLARE @TinhTrangThanhToan NVARCHAR(50);

    -- Get information about the appointment and the associated invoice
    SELECT
        LH.MaLichHen,
        LH.NgayGioKham,
        LH.TrangThaiLichHen,
        HD.TongTien,
        HD.TinhTrangThanhToan
    FROM
        LICHHEN LH
        LEFT JOIN
        HOADON HD ON LH.MaLichHen = HD.MaLichHen
    WHERE
        LH.MaBenhNhan = @MaBenhNhan
        AND LH.MaLichHen = @MaLichHen;

    -- Check the payment status
    SET @TrangThaiLichHen = (SELECT TrangThaiLichHen
    FROM LICHHEN
    WHERE MaLichHen = @MaLichHen);
    SET @TongTien = (SELECT TongTien
    FROM HOADON
    WHERE MaLichHen = @MaLichHen);
    SET @TinhTrangThanhToan = (SELECT TinhTrangThanhToan
    FROM HOADON
    WHERE MaLichHen = @MaLichHen);

    -- Display the payment status
    PRINT 'Appointment ID: ' + CAST(@MaLichHen AS NVARCHAR(10));
    PRINT 'Appointment Date: ' + CAST((SELECT NgayGioKham FROM LICHHEN WHERE MaLichHen = @MaLichHen) AS NVARCHAR(30));
    PRINT 'Appointment Status: ' + @TrangThaiLichHen;

    IF @TinhTrangThanhToan IS NOT NULL
    BEGIN
        PRINT 'Total Amount: ' + CAST(@TongTien AS NVARCHAR(10)) + ' VND';
        PRINT 'Payment Status: ' + @TinhTrangThanhToan;
    END
    ELSE
    BEGIN
        PRINT 'No invoice created for this appointment.';
    END
END;
GO
-- Execute the stored procedure with sample values
EXEC XemTrangThaiThanhToan
    @MaBenhNhan = 1001,
    @MaLichHen = 1;
GO
-- Có quyền truy cập kho thuốc (gọi giao tác TruyCapKhoThuoc) 

-- Có quyền được xem danh sách lịch hẹn (gọi giao tác XemDanhSachLichHen) 

-- Có quyền tìm kiếm nha sĩ, nhân viên, bệnh nhân theo SDT hoặc mã số (gọi giao tác TimKiemNguoiDung) 

-- Có quyền chỉnh thêm, xóa, sửa tài khoản của nhân viên, nha sĩ, bệnh nhận (gọi giao tác QuanLyTaiKhoan) 

-- Có quyền thêm, xóa, sửa thông tin thuốc trong kho thuốc (gọi giao tác QuanLyKhoThuoc)  
CREATE PROCEDURE QuanLyKhoThuoc
    @MaThuoc INT = NULL,
    @NgayHetHan DATETIME = NULL,
    @TenThuoc NVARCHAR(50) = NULL,
    @DonViTinh NVARCHAR(50) = NULL,
    @DonGia INT = NULL,
    @ChiDinh NVARCHAR(50) = NULL,
    @SoLuongTonKho INT = NULL,
    @ThaoTac NVARCHAR(50)
AS
BEGIN
    IF @ThaoTac = 'ThemMoi'
    BEGIN
        -- Add a new drug to the inventory
        INSERT INTO THUOC
            (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
        VALUES
            (@MaThuoc, @NgayHetHan, @TenThuoc, @DonViTinh, @DonGia, @ChiDinh, @SoLuongTonKho);
        PRINT 'Drug added to inventory successfully.';
    END
    ELSE IF @ThaoTac = 'CapNhat'
    BEGIN
        -- Update drug information in the inventory
        UPDATE THUOC
        SET
            NgayHetHan = @NgayHetHan,
            TenThuoc = @TenThuoc,
            DonViTinh = @DonViTinh,
            DonGia = @DonGia,
            ChiDinh = @ChiDinh,
            SoLuongTonKho = @SoLuongTonKho
        WHERE MaThuoc = @MaThuoc AND NgayHetHan = @NgayHetHan;
        PRINT 'Drug information updated successfully.';
    END
    ELSE IF @ThaoTac = 'XemTonKho'
    BEGIN
        -- View current inventory status
        SELECT *
        FROM THUOC;
    END
    ELSE
    BEGIN
        -- Invalid operation
        PRINT 'Invalid operation.';
    END
END;
GO
-- Execute the stored procedure to add a new drug to the inventory
EXEC QuanLyKhoThuoc
    @MaThuoc = 101,
    @NgayHetHan = '2023-12-31',
    @TenThuoc = 'Paracetamol',
    @DonViTinh = 'Tablet',
    @DonGia = 10,
    @ChiDinh = 'Pain relief',
    @SoLuongTonKho = 100,
    @ThaoTac = 'ThemMoi';

-- Execute the stored procedure to update drug information in the inventory
EXEC QuanLyKhoThuoc
    @MaThuoc = 101,
    @NgayHetHan = '2023-12-31',
    @TenThuoc = 'Paracetamol',
    @DonViTinh = 'Tablet',
    @DonGia = 12,
    @ChiDinh = 'Pain relief',
    @SoLuongTonKho = 150,
    @ThaoTac = 'CapNhat';

-- Execute the stored procedure to view current inventory status
EXEC QuanLyKhoThuoc @ThaoTac = 'XemTonKho';
GO
-- Có quyền khóa tài khoản đang có trong hệ thống (gọi giao tác KhoaTaiKhoan) 

-- Có quyền đăng xuất khỏi tài khoản (gọi giao tác DangXuat) 