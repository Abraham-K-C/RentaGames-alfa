@echo off
title Ver Logs por Servicio - GamesRentAll
chcp 65001 > nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ver-logs-servicio.ps1"
pause
