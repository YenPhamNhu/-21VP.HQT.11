USE QLPKNK
-- Chèn dữ liệu cho bảng QTV
INSERT INTO QTV (HoTen, SDT, MatKhau)
VALUES
  (N'Người quản trị 1', '0123456780', 'Mk123456'), -- Chuỗi có độ dài hợp lệ (8 ký tự)
  (N'Người quản trị 2', '0123456781', 'Pwd789'),    -- Chuỗi có độ dài hợp lệ (6 ký tự)
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng NHANVIEN
INSERT INTO NHANVIEN (Hoten, SDT, GioiTinh, DiaChi, TinhTrangHoatDong, ViTri, MatKhau)
VALUES
  (N'Nhân viên 1', '0123456789', N'Nam', N'Địa chỉ NV1', N'Còn làm', N'Vị trí NV1', 'Pass1234'),  -- Chuỗi có độ dài hợp lệ (8 ký tự)
  (N'Nhân viên 2', '0123456788', N'Nữ', N'Địa chỉ NV2', N'Còn làm', N'Vị trí NV2', 'Mk567890'), -- Chuỗi có độ dài hợp lệ (8 ký tự)
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng NHASI
INSERT INTO NHASI (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, ChuyenMon, BangCap, MatKhau)
VALUES
  (N'Bác sĩ 1', '0123456777', N'Nam', '1980-01-01', N'Địa chỉ BS1', N'Chuyên môn 1', N'TS', 'BacSi11'),  -- Chuỗi có độ dài hợp lệ (8 ký tự)
  (N'Bác sĩ 2', '0123456778', N'Nữ', '1985-02-02', N'Địa chỉ BS2', N'Chuyên môn 2', N'TS', 'MBS12345'), -- Chuỗi có độ dài hợp lệ (8 ký tự)
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng BENHNHAN
INSERT INTO BENHNHAN (HoTen, SDT, GioiTinh, NgaySinh, DiaChi, MatKhau)
VALUES
  (N'Bệnh nhân 1', '0123456780', N'Nam', '1990-03-15', N'Địa chỉ BN1', 'Pwd12345'),  -- Chuỗi có độ dài hợp lệ (8 ký tự)
  (N'Bệnh nhân 2', '0123456781', N'Nữ', '1988-07-20', N'Địa chỉ BN2', 'User6789'), -- Chuỗi có độ dài hợp lệ (8 ký tự)
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng LICHLAMVIEC
INSERT INTO LICHLAMVIEC (Ngay, MaNhaSi, CaDangKy)
VALUES
  ('2023-11-13', 101, N'Sáng'), -- Đổi MaNhaSi và CaDangKy tương ứng
  ('2023-11-14', 102, N'Chiều'), -- Đổi MaNhaSi và CaDangKy tương ứng
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng LICHHEN
INSERT INTO LICHHEN (NgayGioKham, MaBenhNhan, MaNhaSi, TrangThaiLichHen)
VALUES
  ('2023-11-15 09:30:00', 1001, 101, N'Đã đặt'), -- Đổi MaBenhNhan và MaNhaSi tương ứng
  ('2023-11-16 14:00:00', 1002, 102, N'Chưa đặt'), -- Đổi MaBenhNhan và MaNhaSi tương ứng
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng LICHSUKHAMBENH
INSERT INTO LICHSUKHAMBENH (STT, MaBenhNhan, MaNhaSiKham, GhiChu, NgayKham)
VALUES
  (1, 1001, 101, N'Ghi chú 1', '2023-11-15 10:30:00'), -- Đổi MaBenhNhan và MaNhaSiKham tương ứng
  (2, 1002, 102, N'Ghi chú 2', '2023-11-16 15:30:00'), -- Đổi MaBenhNhan và MaNhaSiKham tương ứng
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng DONTHUOC
INSERT INTO DONTHUOC (MaThuoc, MaBenhNhan, NgaySuDung, NgayHetHan, LieuDung, STTLichSuKB, SoLuong)
VALUES
  (1, 1001, '2023-11-15 10:45:00', '2023-12-15', N'1 viên/ngày', 1, 30), -- Đổi MaThuoc, MaBenhNhan và STTLichSuKB tương ứng
  (2, 1002, '2023-11-16 15:45:00', '2023-12-16', N'2 viên/ngày', 2, 20), -- Đổi MaThuoc, MaBenhNhan và STTLichSuKB tương ứng
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng DICHVUSUDUNG
INSERT INTO DICHVUSUDUNG (NgaySuDung, STTLichSuKB, MaBenhNhan, MaDichVu, SoLuong)
VALUES
  ('2023-11-15 11:00:00', 1, 1001, 1, 2), -- Đổi STTLichSuKB, MaBenhNhan và MaDichVu tương ứng
  ('2023-11-16 16:00:00', 2, 1002, 2, 1), -- Đổi STTLichSuKB, MaBenhNhan và MaDichVu tương ứng
  -- Thêm 3 dòng dữ liệu khác tương tự

-- Chèn dữ liệu cho bảng HOADON
INSERT INTO HOADON (MaBenhNhan, STTLichSuKB, MaPhieuDVSD, TongTien, TinhTrangThanhToan, NgayThanhToan, MaDonThuoc)
VALUES
  (1001, 1, 1, 500000, N'Chưa thanh toán', NULL, 1), -- Đổi MaBenhNhan, STTLichSuKB, MaPhieuDVSD và MaDonThuoc tương ứng
  (1002, 2, 2, 300000, N'Đã thanh toán', '2023-11-17 10:00:00', 2), -- Đổi MaBenhNhan, STTLichSuKB, MaPhieuDVSD và MaDonThuoc tương ứng
  -- Thêm 3 dòng dữ liệu khác tương tự
