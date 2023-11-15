-- https://www.sqlshack.com/move-or-copy-sql-logins-with-assigning-roles-and-permissions/
-- the script for Windows logins and SQL Logins for SQL Server migrate logins
SELECT 'IF (SUSER_ID('+QUOTENAME(SP.name,'''')+') IS NULL) BEGIN CREATE LOGIN ' +QUOTENAME(SP.name)+
               CASE 
                    WHEN SP.type_desc = 'SQL_LOGIN' THEN ' WITH PASSWORD = ' +CONVERT(NVARCHAR(MAX),SL.password_hash,1)+ ' HASHED, CHECK_EXPIRATION = ' 
                        + CASE WHEN SL.is_expiration_checked = 1 THEN 'ON' ELSE 'OFF' END +', CHECK_POLICY = ' +CASE WHEN SL.is_policy_checked = 1 THEN 'ON,' ELSE 'OFF,' END
                    ELSE ' FROM WINDOWS WITH'
                END 
       +' DEFAULT_DATABASE=[' +SP.default_database_name+ '], DEFAULT_LANGUAGE=[' +SP.default_language_name+ '] END;' COLLATE SQL_Latin1_General_CP1_CI_AS AS [-- Logins To Be Created --]
FROM sys.server_principals AS SP
    LEFT JOIN sys.sql_logins AS SL ON SP.principal_id = SL.principal_id
WHERE SP.type IN ('S','G','U')
    AND SP.name NOT LIKE '##%##'
    AND SP.name NOT LIKE 'NT AUTHORITY%'
    AND SP.name NOT LIKE 'NT SERVICE%'
    AND SP.name <> ('sa')
    AND SP.name <> 'distributor_admin'

GO
SELECT 'USE '+ DB_NAME()+'; CREATE USER ['+dp.name+'] FOR LOGIN ['+dp.name+'];'+ 
        'ALTER USER ['+dp.name+'] WITH DEFAULT_SCHEMA=['+dp.default_schema_name+'];' AS [-- Logins To Be Created --]
FROM sys.database_principals AS dp
    INNER JOIN sys.server_principals sp ON dp.sid = sp.sid
WHERE (dp.type in ('S','G','U'))
    AND dp.name NOT LIKE '##%##'
    AND dp.name NOT LIKE 'NT AUTHORITY%'
    AND dp.name NOT LIKE 'NT SERVICE%'
    AND dp.name <> ('sa')
    AND dp.default_schema_name IS NOT NULL
    AND dp.name <> 'distributor_admin'
    AND dp.principal_id > 4