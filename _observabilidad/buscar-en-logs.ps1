# Colores para cada servicio
$colores = @{
    "servicio-discovery"     = [ConsoleColor]::Cyan
    "servicio-gateway"       = [ConsoleColor]::Magenta
    "usuario-service"        = [ConsoleColor]::Green
    "analitica-service"      = [ConsoleColor]::Yellow
    "biblioteca-service"     = [ConsoleColor]::Blue
    "catalogo-service"       = [ConsoleColor]::Red
    "notificaciones-service" = [ConsoleColor]::DarkCyan
    "ofertas-service"        = [ConsoleColor]::DarkMagenta
    "pagos-service"          = [ConsoleColor]::DarkGreen
    "renta-service"          = [ConsoleColor]::DarkYellow
    "resenas-service"        = [ConsoleColor]::DarkBlue
    "soporte-service"        = [ConsoleColor]::DarkRed
}

# Servicios a buscar
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
Write-Host "  BUSCAR EN LOGS - GAMESRENTALL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$textoBuscar = Read-Host "Ingresa el texto a buscar en los logs"

if ([string]::IsNullOrWhiteSpace($textoBuscar)) {
    Write-Host "`nNo se ingresó ningún texto para buscar.`n" -ForegroundColor Red
    exit 1
}

Write-Host "`nBuscando: '$textoBuscar' en todos los logs..." -ForegroundColor Gray
Write-Host "----------------------------------------`n" -ForegroundColor Gray

$encontrados = 0

foreach ($servicio in $servicios) {
    $archivo = Join-Path $logDir "$servicio.log"
    if (Test-Path $archivo) {
        $lineas = Get-Content -Path $archivo | Select-String -Pattern $textoBuscar -SimpleMatch
        if ($lineas) {
            foreach ($linea in $lineas) {
                $color = $colores[$servicio]
                if (-not $color) { $color = [ConsoleColor]::White }
                $etiqueta = "[$servicio]".PadRight(24)
                Write-Host $etiqueta -ForegroundColor $color -NoNewline
                Write-Host "  $linea"
                $encontrados++
            }
        }
    }
}

Write-Host "`n----------------------------------------" -ForegroundColor Gray
if ($encontrados -eq 0) {
    Write-Host "  No se encontraron coincidencias para '$textoBuscar'" -ForegroundColor Yellow
} else {
    Write-Host "  Total de coincidencias encontradas: $encontrados" -ForegroundColor Green
}
Write-Host "========================================`n" -ForegroundColor Cyan
