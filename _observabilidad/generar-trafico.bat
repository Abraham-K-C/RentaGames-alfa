@echo off
title Generar Tráfico Continuo - GamesRentAll
chcp 65001 > nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0generar-trafico.ps1"
pause
