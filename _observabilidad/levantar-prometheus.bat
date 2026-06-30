@echo off
chcp 65001 > nul
title PROMETHEUS - GamesRentAll (Puerto 9090)
echo ========================================
echo   LEVANTANDO PROMETHEUS...
echo ========================================
echo.
echo Ruta config: %~dp0prometheus\prometheus.yml
echo.
cd /d "%~dp0prometheus\prometheus-3.12.0.windows-amd64"
echo Presiona CTRL+C para detener Prometheus
echo.
prometheus.exe --config.file="%~dp0prometheus\prometheus.yml"
pause
