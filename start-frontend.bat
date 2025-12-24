@echo off
echo Starting Hotel Management System Frontend...
echo.

REM Navigate to frontend directory
cd /d "%~dp0\frontend"

echo Installing dependencies (if not already installed)...
call npm install

echo.
echo Starting frontend development server...
echo.

REM Start the development server
call npm run dev

pause