@echo off 
cd /d "%~dp0prometheus\prometheus-3.12.0.windows-amd64" 
prometheus.exe --config.file=../../prometheus/prometheus.yml 
pause 
