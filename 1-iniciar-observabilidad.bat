@echo off
echo Iniciando Prometheus y Grafana...
start "PROMETHEUS" cmd /k "cd /d %~dp0_observabilidad && levantar-prometheus.bat"
timeout /t 2 /nobreak > nul
start "GRAFANA" cmd /k "cd /d %~dp0_observabilidad && levantar-grafana.bat"
echo.
echo ========================================
echo   Prometheus y Grafana se están iniciando!
echo ========================================
echo.
echo Prometheus: http://localhost:9090
echo Grafana:    http://localhost:3000
echo.
echo Ahora ejecuta 2-iniciar-infraestructura.bat
echo.
pause
