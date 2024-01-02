SELECT L.[STT]
      , B.SDT [MaBenhNhan]
      , NHASI.SDT [MaNhaSiKham]
      , L.[GhiChu]
      , L.[NgayKham]
FROM [QLPKNK].[dbo].[LICHSUKHAMBENH] L
    LEFT JOIN [QLPKNK].[dbo].[BENHNHAN] B ON B.MaBenhNhan = L.MaBenhNhan
    LEFT JOIN [QLPKNK].[dbo].[NHASI] ON [NHASI].MaNhaSi = L.[MaNhaSiKham]
-- EXEC XemHoSoBenhAn