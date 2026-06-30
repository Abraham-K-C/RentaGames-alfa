@echo off
title Apagar Servicio - GamesRentAll
chcp 65001 > nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0apagar-servicio.ps1"
pause
