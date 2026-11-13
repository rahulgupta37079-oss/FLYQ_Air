@echo off
cd /d "%~dp0"
echo Running FLYQ Webinar + SEO tests...
node test-webinar.mjs || exit /b 1
echo Deploying to Cloudflare Workers (flyq-workshops and flyq-storefront)...
node deploy-webinar.mjs || exit /b 1
echo Verifying live production URLs on https://flyqdrone.in ...
node verify-live.mjs || exit /b 1
echo.
echo DONE! Live at https://flyqdrone.in/webinar
pause
