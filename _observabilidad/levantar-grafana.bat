@echo off
chcp 65001 > nul
title GRAFANA - GamesRentAll (Puerto 3000)
echo ========================================
echo   LEVANTANDO GRAFANA...
echo ========================================
echo.
echo Ruta: %~dp0grafana\grafana-13.0.1+security-01\bin
echo.
cd /d "%~dp0grafana\grafana-13.0.1+security-01\bin"
echo Presiona CTRL+C para detener Grafana
echo.
grafana.exe
pause
