-- //0.Người dùng khách (người dùng chưa đăng nhập) 

-- Có quyền đăng kí tài khoản (gọi giao tác TaoTaiKhoanBenhNhan) bằng cách cung cấp họ tên, ngày sinh, giới tính, số điện thoại, địa chỉ, mật khẩu (mạnh). 
CREATE PROCEDURE TaoTaiKhoanBenhNhan
    @HoTen NVARCHAR(50),
    @SDT VARCHAR(10),
    @GioiTinh NVARCHAR(5),
    @NgaySinh DATETIME,
    @DiaChi NVARCHAR(50),
    @MatKhau VARCHAR(8)
AS
BEGIN

    INSERT INTO BENHNHAN
        (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau)
    VALUES
        (@HoTen, @SDT, @GioiTinh, @NgaySinh, @DiaChi, @MatKhau);

END;
GO
EXEC TaoTaiKhoanBenhNhan
    @HoTen = 'New Patient',
    @SDT = '1234567890',
    @GioiTinh = 'Nam',
    @NgaySinh = '1990-01-01',
    @DiaChi = 'Address',
    @MatKhau = 'password';
GO
-- Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) 
CREATE PROCEDURE DangNhap
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    -- Check if the user is a Quan Tri Vien (QTV)
    IF EXISTS (SELECT 1
    FROM QTV
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Quan Tri Vien (QTV) login successful
        SELECT 'QTV' AS UserRole;
    END
    -- Check if the user is a Nhan Vien (NHANVIEN)
    ELSE IF EXISTS (SELECT 1
    FROM NHANVIEN
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Nhan Vien (NHANVIEN) login successful
        SELECT 'NHANVIEN' AS UserRole;
    END
    -- Check if the user is a Nha Si (NHASI)
    ELSE IF EXISTS (SELECT 1
    FROM NHASI
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        -- Nha Si (NHASI) login successful
        SELECT 'NHASI' AS UserRole;
    END
    -- Check if the user is a Benh Nhan (BENHNHAN)
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
EXEC DangNhap @UserName = 'userNHANVIEN', @Password = 'password';
GO
-- //1.Bệnh nhân (đã có tài khoản) 

-- Có quyền đăng nhập vào tài khoản (gọi giao tác DangNhap) 
CREATE PROCEDURE DangNhap
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50),
    @UserRole NVARCHAR(50) OUTPUT
AS
BEGIN
    SET @UserRole = 'INVALID';
    -- Default value

    -- Check if the user is a Quan Tri Vien (QTV)
    IF EXISTS (SELECT 1
    FROM QTV
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        SET @UserRole = 'QTV';
    END
    -- Check if the user is a Nhan Vien (NHANVIEN)
    ELSE IF EXISTS (SELECT 1
    FROM NHANVIEN
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        SET @UserRole = 'NHANVIEN';
    END
    -- Check if the user is a Nha Si (NHASI)
    ELSE IF EXISTS (SELECT 1
    FROM NHASI
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        SET @UserRole = 'NHASI';
    END
    -- Check if the user is a Benh Nhan (BENHNHAN)
    ELSE IF EXISTS (SELECT 1
    FROM BENHNHAN
    WHERE SDT = @UserName AND MatKhau = @Password)
    BEGIN
        SET @UserRole = 'BENHNHAN';
    END
END;
GO
DECLARE @UserRole NVARCHAR(50);

EXEC DangNhap
    @UserName = 'userNHANVIEN',
    @Password = 'password',
    @UserRole = @UserRole OUTPUT;

PRINT 'User Role: ' + @UserRole;
GO
-- Có quyền đặt lịch hẹn: 
CREATE PROCEDURE DatLichHen
    @Ngay DATETIME,
    @MaNhaSi INT,
    @CaDangKy NVARCHAR(50)
AS
BEGIN
    -- Check if the selected time slot is available
    IF NOT EXISTS (
        SELECT 1
    FROM LICHLAMVIEC
    WHERE Ngay = @Ngay
        AND MaNhaSi = @MaNhaSi
        AND CaDangKy = @CaDangKy
    )
    BEGIN
        -- Time slot is available, schedule the appointment
        INSERT INTO LICHHEN
            (NgayGioKham, MaNhaSi, TrangThaiLichHen)
        VALUES
            (@Ngay, @MaNhaSi, N'Đã đặt');

        PRINT 'Đã đặt hẹn thành công.';
    END
    ELSE
    BEGIN
        -- Time slot is already booked
        PRINT 'Vui lòng chọn khung giờ khác.';
    END
END;
GO
-- Execute the stored procedure with sample values
EXEC DatLichHen
    @Ngay = '2023-01-01 10:00:00',
    @MaNhaSi = 100,
    @CaDangKy = 'Morning';
GO
-- Được quyền chọn ngày giờ khám (gọi giao tác ChonThoiGianKham). 
CREATE PROCEDURE ChonThoiGianKham
    @Ngay DATETIME,
    @MaNhaSi INT,
    @MaBenhNhan INT
AS
BEGIN
    -- Check for available time slots on the specified date and for the specific dentist
    IF EXISTS (
        SELECT 1
    FROM LICHLAMVIEC
    WHERE Ngay = @Ngay
        AND MaNhaSi = @MaNhaSi
    )
    BEGIN
        -- Display available time slots for the patient to choose
        SELECT
            STT,
            Ngay,
            CaDangKy
        FROM LICHLAMVIEC
        WHERE Ngay = @Ngay
            AND MaNhaSi = @MaNhaSi;

        -- Prompt the patient to choose a time slot
        DECLARE @STT INT;
        DECLARE @ChonCaDangKy NVARCHAR(50);

        SET @STT = NULL;
        SET @ChonCaDangKy = NULL;

        WHILE @STT IS NULL OR @ChonCaDangKy IS NULL
        BEGIN
            PRINT 'Enter the STT (Time Slot ID) you want to choose:';
            SET @STT = CAST(CONVERT(NVARCHAR(10),
            READTEXT
            ('STT')) AS INT);

            PRINT 'Enter the chosen CaDangKy (Time Slot):';
            SET @ChonCaDangKy = CONVERT(NVARCHAR(50),
            READTEXT
            ('ChonCaDangKy'));
        END;

        -- Insert the chosen time slot into LICHHEN
        INSERT INTO LICHHEN
            (NgayGioKham, MaNhaSi, MaBenhNhan, TrangThaiLichHen)
        VALUES
            (@Ngay, @MaNhaSi, @MaBenhNhan, N'Đã đặt');

        PRINT 'Appointment scheduled successfully.';
    END
    ELSE
    BEGIN
        -- No available time slots on the specified date and for the specific dentist
        PRINT 'No available time slots for the specified date and dentist.';
    END
END;
GO
EXEC ChonThoiGianKham
    @Ngay = '2023-01-01',
    @MaNhaSi = 100,
    @MaBenhNhan = 1001;
GO
-- Được quyền chọn nha sĩ khám (gọi giao tác ChonNhaSiKham). 

-- Có quyền được xem thông tin cá nhân (gọi giao tác XemThongTinCaNhan) bao gồm họ tên, ngày sinh, địa chỉ, số điện thoại, giới tính. 

-- Có quyền được xem thông tin của nha sĩ (gọi giao tác XemThongTinNhaSi). 

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

-- Có quyền tìm kiếm hồ sơ khám bệnh của bệnh nhân (gọi giao tác TimKiemHoSoBenhNhan) để lấy thông tin khám gồm dịch vụ, phí khám, đơn thuốc để lập hóa đơn thanh toán (gọi giao tác LapHoaDonThanhToan) 
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