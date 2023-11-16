USE QLPKNK
-- 1/QTV
INSERT INTO QTV
  (HoTen, SDT, Email, MatKhau)
VALUES
  (N'Trần Minh Châu', '0522902513', 'tmchau21@vp.fitus.edu.vn', '12345678'),
  (N'Tôn Đức Quý', '0798765432', 'tdquy21@vp.fitus.edu.vn', '12345678'),
  (N'Nguyễn Ngọc Hân', '0123456782', 'pehan49nc@gmail.com ', '12345678'),
  (N'Phạm Thị Như Yến', '0337432114', 'ptnyen21@vp.fitus.edu.vn', '12345678')

-- 2/NHANVIEN
INSERT INTO NHANVIEN
  (Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau)
VALUES
  (N'Nhân viên 1', '0123456789', N'Nam', N'Địa chỉ NV1', N'Còn làm', N'Vị trí NV1', '12345678'),
  (N'Nhân viên 2', '0123456788', N'Nữ', N'Địa chỉ NV2', N'Còn làm', N'Vị trí NV2', '12345678')

-- 3/NHASI
INSERT INTO NHASI
  (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau)
VALUES
  (N'Bác sĩ 1', '0123456777', N'Nam', '1980-01-01', N'Địa chỉ BS1', N'Chuyên môn 1', N'TS', '12345678'),
  (N'Bác sĩ 2', '0123456778', N'Nữ', '1985-02-02', N'Địa chỉ BS2', N'Chuyên môn 2', N'TS', '12345678')

-- 4/BENHNHAN
INSERT INTO BENHNHAN
  (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau)
VALUES
  (N'Bệnh nhân 1', '0123456780', N'Nam', '1990-03-15', N'Địa chỉ BN1', '12345678'),
  (N'Bệnh nhân 2', '0123456781', N'Nữ', '1988-07-20', N'Địa chỉ BN2', '12345678')
-- SELECT *
-- FROM BENHNHAN
-- 5/LICHLAMVIEC
INSERT INTO LICHLAMVIEC
  (Ngay, MaNhaSi, CaDangKy)
VALUES
  ('2023-11-13', 100, N'Sáng'),
  ('2023-11-14', 101, N'Chiều')

-- 6/LICHHEN
INSERT INTO LICHHEN
  (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
VALUES
  ('2023-11-15 09:30:00', 1001, 100, N'Đã đặt'),
  ('2023-11-16 14:00:00', 1000, 101, N'Đã hủy')

-- 7/LICHSUKHAMBENH
INSERT INTO LICHSUKHAMBENH
  (STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham)
VALUES
  (1, 1001, 100, N'Ghi chú 1', '2023-11-15 10:30:00'),
  (2, 1000, 101, N'Ghi chú 2', '2023-11-16 15:30:00')

-- 8/THUOC
set identity_insert THUOC on;
INSERT INTO THUOC
  (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
VALUES
  (1, '2023-01-01', N'Paracetamol', N'Viên', 5000, N'Giảm đau', 100),
  (2, '2023-02-01', N'Amoxicillin', N'Viên', 8000, N'Kháng sinh', 150),
  (3, '2023-03-01', N'Aspirin', N'Viên', 6000, N'Giảm đau', 120),
  (4, '2023-04-01', N'Ibuprofen', N'Viên', 7000, N'Giảm đau', 80),
  (5, '2023-05-01', N'Cetirizine', N'Viên', 9000, N'Chống dị ứng', 200);
-- SELECT * FROM THUOCLog
-- 9/DICHVU
INSERT INTO DICHVU
  (TenDichVu, MoTa, DonGia)
VALUES
  (N'Khám bệnh', N'Khám và chẩn đoán tình trạng sức khỏe', 50000),
  (N'Răng sứ', N'Chăm sóc và phục hồi răng bị hỏng', 1500000),
  (N'Tư vấn dinh dưỡng', N'Tư vấn chế độ dinh dưỡng phù hợp', 200000),
  (N'Siêu âm tim', N'Kiểm tra sức khỏe tim mạch', 800000),
  (N'Phục hồi chức năng cơ bản', N'Bài tập và liệu pháp phục hồi cơ bản', 300000);

-- 10/DONTHUOC
INSERT INTO DONTHUOC
  (MaThuoc, MaBenhNhan, NgaySuDung, NgayHetHan, LieuDung, STTLichSuKB, SoLuong)
VALUES
  (1, 1000, '2023-11-15 10:45:00', '2023-12-15', N'1 viên/ngày', 1, 30),
  (2, 1001, '2023-11-16 15:45:00', '2023-12-16', N'2 viên/ngày', 2, 20)

-- 11/DICHVUSUDUNG
INSERT INTO DICHVUSUDUNG
  (NgaySuDung, STTLichSuKB, MaBenhNhan, MaDichVu, SoLuong)
VALUES
  ('2023-11-15 11:00:00', 1, 1001, 1, 2),
  ('2023-11-16 16:00:00', 2, 1000, 2, 1)

-- 12/HOADON
INSERT INTO HOADON
  (MaBenhNhan, STTLichSuKB, MaPhieuDVSD, TongTien, TinhTrangThanhToan, NgayThanhToan, MaDonThuoc)
VALUES
  (1001, 1, 1000, 500000, N'Chưa thanh toán', NULL, 1),
  (1002, 2, 1001, 300000, N'Đã thanh toán', '2023-11-17 10:00:00', 2)
SELECT *
FROM QTVLog
SELECT *
FROM NHANVIENLog
SELECT *
FROM NHASILog
SELECT *
FROM BENHNHANLog
SELECT *
FROM LICHLAMVIECLog
SELECT *
FROM LICHHENLog
SELECT *
FROM LICHSUKHAMBENHLog
SELECT *
FROM THUOCLog

SELECT *
FROM DICHVULog
SELECT *
FROM DONTHUOCLog
SELECT *
FROM DICHVUSUDUNGLog
SELECT *
FROM HOADONLog
