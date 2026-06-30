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

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  APAGAR SERVICIO - GAMESRENTALL" -ForegroundColor Cyan
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
    $seleccion = Read-Host "Selecciona un servicio para apagar (0-12)"
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

Write-Host "`nBuscando proceso para: $servicioSeleccionado..." -ForegroundColor Gray

# Buscar procesos Java que coincidan con el nombre del servicio
$procesos = Get-Process -Name java -ErrorAction SilentlyContinue
$encontrado = $false

foreach ($proc in $procesos) {
    try {
        $cmdLine = (Get-CimInstance Win32_Process -Filter "ProcessId = $($proc.Id)").CommandLine
        if ($cmdLine -like "*$servicioSeleccionado*") {
            Write-Host "`nProceso encontrado: PID $($proc.Id)" -ForegroundColor Yellow
            Stop-Process -Id $proc.Id -Force
            Write-Host "Servicio '$servicioSeleccionado' apagado correctamente!" -ForegroundColor Green
            $encontrado = $true
            break
        }
    } catch {
        # Ignorar errores
    }
}

if (-not $encontrado) {
    Write-Host "`nNo se encontró un proceso Java para '$servicioSeleccionado' ejecutándose." -ForegroundColor Red
}

Write-Host "`n"
