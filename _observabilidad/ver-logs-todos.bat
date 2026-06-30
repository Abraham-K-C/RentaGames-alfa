@echo off
title Logs Combinados - GamesRentAll
chcp 65001 > nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ver-logs-todos.ps1"
pause
