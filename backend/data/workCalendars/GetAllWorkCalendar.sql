SELECT NHASI.HoTen HoTen
,NHASI.SDT
, [Ngay] Ngay
, [CaDangKy] CaDangKy
FROM [QLPKNK].[dbo].[LICHLAMVIEC] L
    LEFT JOIN [QLPKNK].[dbo].[NHASI] ON [NHASI].MaNhaSi = L.MaNhaSi
ORDER BY [Ngay]