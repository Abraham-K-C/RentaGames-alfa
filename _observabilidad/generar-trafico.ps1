$urls = @(
    "http://localhost:8080/api/usuarios/test",
    "http://localhost:8080/api/analitica/test",
    "http://localhost:8080/api/biblioteca/test",
    "http://localhost:8080/api/catalogo/test",
    "http://localhost:8080/api/notificaciones/test",
    "http://localhost:8080/api/ofertas/test",
    "http://localhost:8080/api/pagos/test",
    "http://localhost:8080/api/renta/test",
    "http://localhost:8080/api/resenas/test",
    "http://localhost:8080/api/soporte/test"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GENERADOR DE TRAFICO - GAMESRENTALL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Generando tráfico cada 2 segundos..." -ForegroundColor Gray
Write-Host "Presiona Ctrl+C para detener`n" -ForegroundColor Gray

$contador = 0
while ($true) {
    $contador++
    $url = $urls | Get-Random
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
        $status = $response.StatusCode
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Petición #$contador a $($url.Split('/')[4]) - Status: $status" -ForegroundColor Green
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        if (-not $status) { $status = "ERROR" }
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Petición #$contador a $($url.Split('/')[4]) - Status: $status" -ForegroundColor Red
    }
    Start-Sleep -Seconds 2
}
