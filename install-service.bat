@echo off
echo Weather Station Service Installer
echo ================================

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running as administrator - OK
) else (
    echo ERROR: This script must be run as administrator
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorLevel% == 0 (
    echo Node.js found - OK
) else (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if nssm is available (for service installation)
nssm --version >nul 2>&1
if %errorLevel% == 0 (
    echo NSSM found - OK
) else (
    echo NSSM not found. Installing NSSM...
    echo Please download NSSM from https://nssm.cc/
    echo and place nssm.exe in the same directory as this script
    pause
    exit /b 1
)

REM Get current directory
set "CURRENT_DIR=%~dp0"
set "SERVICE_NAME=WeatherStationService"
set "SERVICE_DISPLAY_NAME=Weather Station Service"
set "SERVICE_DESCRIPTION=Automated weather station data update service"

echo.
echo Installing Weather Station Service...
echo Service Name: %SERVICE_NAME%
echo Display Name: %SERVICE_DISPLAY_NAME%
echo Working Directory: %CURRENT_DIR%

REM Install the service using NSSM
nssm install %SERVICE_NAME% "%CURRENT_DIR%node.exe" "%CURRENT_DIR%weather-service.js start"
if %errorLevel% neq 0 (
    echo ERROR: Failed to install service
    pause
    exit /b 1
)

REM Set service display name and description
nssm set %SERVICE_NAME% DisplayName "%SERVICE_DISPLAY_NAME%"
nssm set %SERVICE_NAME% Description "%SERVICE_DESCRIPTION%"

REM Set working directory
nssm set %SERVICE_NAME% AppDirectory "%CURRENT_DIR%"

REM Set startup type to automatic
nssm set %SERVICE_NAME% Start SERVICE_AUTO_START

REM Set restart options
nssm set %SERVICE_NAME% AppRestartDelay 10000
nssm set %SERVICE_NAME% AppStopMethodSkip 0
nssm set %SERVICE_NAME% AppStopMethodConsole 1500
nssm set %SERVICE_NAME% AppStopMethodWindow 1500
nssm set %SERVICE_NAME% AppStopMethodThreads 1500

REM Set environment variables
nssm set %SERVICE_NAME% AppEnvironmentExtra NODE_ENV=production

echo.
echo Service installed successfully!
echo.
echo To start the service:
echo   net start %SERVICE_NAME%
echo.
echo To stop the service:
echo   net stop %SERVICE_NAME%
echo.
echo To remove the service:
echo   nssm remove %SERVICE_NAME% confirm
echo.
echo The service will automatically start when Windows boots.
echo.
pause 