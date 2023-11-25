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
  (N'Nhân viên 2', '0123456788', N'Nữ', N'Địa chỉ NV2', N'Còn làm', N'Vị trí NV2', '12345678'),
  (N'Nhân viên 3', '0123456798', N'Nữ', N'Địa chỉ NV3', N'Còn làm', N'Vị trí NV3', '12345678')

-- 3/NHASI
INSERT INTO NHASI
  (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau)
VALUES
  (N'Nha sĩ 1', '0123456777', N'Nam', '1980-01-01', N'Địa chỉ BS1', N'Chuyên môn 1', N'TS', '12345678'),
  (N'Nha sĩ 2', '0123456778', N'Nữ', '1985-02-02', N'Địa chỉ BS2', N'Chuyên môn 2', N'TS', '12345678')
-- SELECT *
-- FROM NHASI
-- 4/BENHNHAN
INSERT INTO BENHNHAN
  (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau)
VALUES
  (N'Bệnh nhân 1', '0123456780', N'Nam', '1990-03-15', N'Địa chỉ BN1', '12345678'),
  (N'Bệnh nhân 2', '0123456781', N'Nữ', '1988-07-20', N'Địa chỉ BN2', '12345678')
SELECT *
FROM LICHLAMVIEC
-- 5/LICHLAMVIEC
INSERT INTO LICHLAMVIEC
  (Ngay, MaNhaSi, CaDangKy)
VALUES
  ('2023-11-15', 100, N'Sáng'),
  ('2023-11-14', 101, N'Chiều')

-- 6/LICHHEN
INSERT INTO LICHHEN
  (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
VALUES
  ('2023-11-15 09:30:00', 1001, 100, N'Đã đặt'),
  ('2023-11-14 14:00:00', 1000, 101, N'Đã hủy'),
  ('2023-11-19 09:30:00', 1001, 100, N'Đã đặt'),
  ('2023-11-21 14:00:00', 1000, 101, N'Đã đặt'),
  ('2023-11-21 09:30:00', 1000, 100, N'Đã đặt'),
  ('2023-11-30 14:00:00', 1000, 101, N'Đã đặt')

-- 7/LICHSUKHAMBENH
INSERT INTO LICHSUKHAMBENH
  (MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham)
VALUES
  (1001, 100, N'Ghi chú 1', '2023-11-15 10:30:00'),
  (1000, 101, N'Ghi chú 2', '2023-11-16 15:30:00')

-- 8/THUOC
INSERT INTO THUOC
  (MaThuoc, NgayHetHan, TenThuoc, DonViTinh, DonGia, ChiDinh, SoLuongTonKho)
VALUES
  (1, '2025-01-01', N'Paracetamol', N'Viên', 5000, N'Giảm đau', 100),
  (2, '2024-02-01', N'Amoxicillin', N'Viên', 8000, N'Kháng sinh', 150),
  (3, '2026-03-01', N'Aspirin', N'Viên', 6000, N'Giảm đau', 120),
  (4, '2025-04-01', N'Ibuprofen', N'Viên', 7000, N'Giảm đau', 80),
  (5, '2025-05-01', N'Cetirizine', N'Viên', 9000, N'Chống dị ứng', 200);
-- SELECT * FROM THUOC
-- 9/DICHVU
INSERT INTO DICHVU
  (TenDichVu, MoTa, DonGia)
VALUES
  (N'Khám bệnh', N'Khám và chẩn đoán tình trạng sức khỏe', 50000),
  (N'Răng sứ', N'Chăm sóc và phục hồi răng bị hỏng', 1500000),
  (N'Xử lý răng sâu', N'Xử lý răng sâu', 200000),
  (N'Xử lý tủy răng', N'Xử lý tủy răng', 800000),
  (N'Niềng răng thưa', N'Niềng răng thưa', 3000000);

-- 10/DONTHUOC
INSERT INTO DONTHUOC
  (MaThuoc, MaBenhNhan, NgaySuDung, NgayHetHan, LieuDung, STTLichSuKB, SoLuong)
VALUES
  (1, 1000, '2023-11-15 10:45:00', '2025-01-01', N'1 viên/ngày', 2, 30),
  (2, 1001, '2023-11-16 15:45:00', '2024-02-01', N'2 viên/ngày', 1, 20)

-- 11/DICHVUSUDUNG
INSERT INTO DICHVUSUDUNG
  (NgaySuDung, STTLichSuKB, MaBenhNhan, MaDichVu, SoLuong)
VALUES
  ('2023-11-16 15:30:00', 2, 1000, 5, 2),
  ('2023-11-15 10:30:00', 1, 1001, 3, 1)

-- 12/HOADON
-- 12/HOADON

INSERT INTO HOADON
  (MaBenhNhan, STTLichSuKB, MaPhieuDVSD, TongTien, TinhTrangThanhToan, NgayThanhToan, MaDonThuoc)
VALUES
  (1001, 1, 2,
    (SELECT SUM(DVSD.SoLuong * DV.DonGia)
    FROM DICHVUSUDUNG DVSD
      INNER JOIN DICHVU DV ON DV.MaDichVu = DVSD.MaDichvu
    WHERE DVSD.MaPhieuDVSD = 2) + 
        (SELECT SUM(dt.SoLuong * T.DonGia)
    FROM DONTHUOC DT
      INNER JOIN THUOC T ON DT.MaThuoc = T.MaThuoc
    WHERE DT.MaDonThuoc = 2) 
        ,
    N'Chưa thanh toán', '2023-11-17 10:00:00', 2
    ),
  (1000, 2, 1,
    (SELECT SUM(DVSD.SoLuong * DV.DonGia)
    FROM DICHVUSUDUNG DVSD
      INNER JOIN DICHVU DV ON DV.MaDichVu = DVSD.MaDichvu
    WHERE DVSD.MaPhieuDVSD = 1) + 
        (SELECT SUM(dt.SoLuong * T.DonGia)
    FROM DONTHUOC DT
      INNER JOIN THUOC T ON DT.MaThuoc = T.MaThuoc
    WHERE DT.MaDonThuoc = 1)
    , N'Đã thanh toán', '2023-11-17 10:00:00', 1);


SELECT *
FROM QTV
SELECT *
FROM NHANVIEN
SELECT *
FROM NHASI
SELECT *
FROM BENHNHAN
SELECT *
FROM LICHLAMVIEC
SELECT *
FROM LICHHEN
SELECT *
FROM LICHSUKHAMBENH
SELECT *
FROM THUOC
SELECT *
FROM DONTHUOC
-- SELECT *
-- FROM DICHVU

-- SELECT *
-- FROM DICHVUSUDUNG
SELECT *
FROM HOADON
