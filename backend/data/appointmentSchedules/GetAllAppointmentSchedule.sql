SELECT L.[MaLichHen]
      , L.[NgayGioKham]
      , B.SDT [MaBenhNhan]
      , [NHASI].SDT [MaNhaSi]
      , L.[TrangThaiLichHen]
FROM [QLPKNK].[dbo].[LICHHEN] L
    LEFT JOIN [QLPKNK].[dbo].[BENHNHAN] B ON B.MaBenhNhan = L.MaBenhNhan
    LEFT JOIN [QLPKNK].[dbo].[NHASI] ON [NHASI].MaNhaSi = L.MaNhaSi
    ORDER BY L.[NgayGioKham]