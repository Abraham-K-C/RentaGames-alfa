@echo off
echo ========================================
echo  Iniciando Infraestructura (Discovery + Gateway)
echo ========================================
echo.
echo [1/2] Iniciando servicio-discovery (Eureka Server)...
start "Servicio Discovery" cmd /k "cd /d %~dp0servicio-discovery && mvn spring-boot:run"
echo Esperando 30 segundos a que Discovery se inicie...
timeout /t 30 /nobreak
echo.
echo [2/2] Iniciando servicio-gateway...
start "Servicio Gateway" cmd /k "cd /d %~dp0servicio-gateway && mvn spring-boot:run"
echo.
echo ========================================
echo  Infraestructura iniciada!
echo ========================================
echo Espera 20 segundos más y luego ejecuta 3-iniciar-microservicios.bat
echo.
pause
