# Servicios disponibles
$servicios = @(
    "servicio-discovery",
    "servicio-gateway",
    "usuario-service",
    "analitica-service",
    "biblioteca-service",
    "catalogo-service",
    "notificaciones-service",
    "ofertas-service",
    "pagos-service",
    "renta-service",
    "resenas-service",
    "soporte-service"
)

$logDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$logDir = Join-Path $logDir "logs"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VER LOGS POR SERVICIO - GAMESRENTALL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mostrar menú
for ($i = 0; $i -lt $servicios.Count; $i++) {
    $num = ($i + 1).ToString().PadLeft(2, '0')
    Write-Host "  [$num] $($servicios[$i])" -ForegroundColor White
}

Write-Host ""
Write-Host "  [0] Salir" -ForegroundColor Gray
Write-Host ""

# Obtener selección
while ($true) {
    $seleccion = Read-Host "Selecciona un servicio (0-12)"
    if ($seleccion -eq '0') {
        Write-Host "Saliendo..." -ForegroundColor Gray
        exit 0
    }
    $num = [int]::TryParse($seleccion, [ref]$null)
    if ($num -and [int]$seleccion -ge 1 -and [int]$seleccion -le $servicios.Count) {
        $servicioSeleccionado = $servicios[[int]$seleccion - 1]
        break
    }
    Write-Host "Opción inválida, intenta de nuevo." -ForegroundColor Red
}

# Verificar archivo de log
$archivoLog = Join-Path $logDir "$servicioSeleccionado.log"
if (-not (Test-Path $archivoLog)) {
    Write-Host "`nArchivo de log no encontrado: $archivoLog" -ForegroundColor Red
    Write-Host "El servicio aún no ha generado logs o no está corriendo.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  LOGS DE: $servicioSeleccionado" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener`n" -ForegroundColor Gray

# Tail -f del log
Get-Content -Path $archivoLog -Wait -Tail 50
