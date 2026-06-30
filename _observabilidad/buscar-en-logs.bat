@echo off
title Buscar en Logs - GamesRentAll
chcp 65001 > nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0buscar-en-logs.ps1"
pause
