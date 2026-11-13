@echo off
cd /d "%~dp0"
echo Rolling back FLYQ Webinar release...
node rollback-webinar.mjs || exit /b 1
pause
