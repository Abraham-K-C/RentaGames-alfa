@echo off
title GamesRentAll - Test de Conectividad de Microservicios
echo ========================================================
echo   VERIFICACION DE ECOSISTEMA GAMESRENTALL VIA GATEWAY
echo ========================================================
echo.

echo [1/10] Testeando usuario-service...
curl -s http://localhost:8080/api/usuarios/test
echo.
echo.

echo [2/10] Testeando analitica-service...
curl -s http://localhost:8080/api/analitica/test
echo.
echo.

echo [3/10] Testeando biblioteca-service...
curl -s http://localhost:8080/api/biblioteca/test
echo.
echo.

echo [4/10] Testeando catalogo-service...
curl -s http://localhost:8080/api/catalogo/test
echo.
echo.

echo [5/10] Testeando notificaciones-service...
curl -s http://localhost:8080/api/notificaciones/test
echo.
echo.

echo [6/10] Testeando ofertas-service...
curl -s http://localhost:8080/api/ofertas/test
echo.
echo.

echo [7/10] Testeando pagos-service...
curl -s http://localhost:8080/api/pagos/test
echo.
echo.

echo [8/10] Testeando renta-service...
curl -s http://localhost:8080/api/renta/test
echo.
echo.

echo [9/10] Testeando resenas-service...
curl -s http://localhost:8080/api/resenas/test
echo.
echo.

echo [10/10] Testeando soporte-service...
curl -s http://localhost:8080/api/soporte/test
echo.
echo.

echo ========================================================
echo   TEST COMPLETADO - VERIFICA LOS LOGS EN _OBSERVABILIDAD
echo ========================================================
pause
