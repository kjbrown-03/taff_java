@echo off
echo Starting Hotel Management System Backend...
echo.

REM Check if Maven is installed
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo Maven is not installed or not in PATH.
    echo Please install Maven 3.6+ and add it to your PATH.
    echo Visit: https://maven.apache.org/install.html
    echo.
    echo After installing Maven, run this script again.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd /d "%~dp0\backend"

echo Building and starting backend...
echo.

REM Build and run the application
call mvn spring-boot:run

pause