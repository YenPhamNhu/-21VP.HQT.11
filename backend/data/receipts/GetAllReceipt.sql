SELECT [MaHoaDon]
      , HD.[MaBenhNhan]
      , [STTLichSuKB]
      , [MaPhieuDVSD]
      , [TongTien]
      , [TinhTrangThanhToan]
      , [NgayThanhToan]
      , [MaDonThuoc]
      , [SDT]
FROM [QLPKNK].[dbo].[HOADON] HD
JOIN [QLPKNK].[dbo].[BENHNHAN] BN ON HD.[MaBenhNhan] = BN.[MaBenhNhan];