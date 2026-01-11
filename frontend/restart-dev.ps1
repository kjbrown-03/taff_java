# Script PowerShell pour redémarrer le serveur de développement proprement

Write-Host "Arrêt des processus Node.js..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "Nettoyage du cache Vite..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue

Write-Host "Démarrage du serveur de développement..." -ForegroundColor Green
npm run dev
