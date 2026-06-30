@echo off
echo ========================================
echo  Iniciando Microservicios
echo ========================================
echo.
cd /d %~dp0microservicios
echo Iniciando usuario-service...
start "Usuario Service" cmd /k "cd usuario-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando analitica-service...
start "Analitica Service" cmd /k "cd analitica-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando biblioteca-service...
start "Biblioteca Service" cmd /k "cd biblioteca-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando catalogo-service...
start "Catalogo Service" cmd /k "cd catalogo-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando notificaciones-service...
start "Notificaciones Service" cmd /k "cd notificaciones-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando ofertas-service...
start "Ofertas Service" cmd /k "cd ofertas-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando pagos-service...
start "Pagos Service" cmd /k "cd pagos-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando renta-service...
start "Renta Service" cmd /k "cd renta-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando resenas-service...
start "Resenas Service" cmd /k "cd resenas-service && mvn spring-boot:run"
timeout /t 5 /nobreak
echo Iniciando soporte-service...
start "Soporte Service" cmd /k "cd soporte-service && mvn spring-boot:run"
echo.
echo ========================================
echo  Todos los microservicios se están iniciando!
echo ========================================
echo.
echo Verifica el estado en Eureka: http://localhost:8761
echo Verifica métricas en Grafana: http://localhost:3000
echo.
pause
