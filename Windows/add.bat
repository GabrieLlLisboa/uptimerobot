@echo off
set /p site="Digite a URL do site: "
curl -X POST http://mistarts.sytes.net:3000/add -H "Content-Type: application/json" -d "{\"url\": \"%site%\"}"
echo.
pause