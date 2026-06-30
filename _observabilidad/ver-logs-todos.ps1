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

# Servicios a monitorear
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

# Inicializar posiciones de lectura
$posiciones = @{}
foreach ($servicio in $servicios) {
    $archivo = Join-Path $logDir "$servicio.log"
    if (Test-Path $archivo) {
        $posiciones[$servicio] = (Get-Item $archivo).Length
    } else {
        $posiciones[$servicio] = 0
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LOGS COMBINADOS - GAMESRENTALL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Monitoreando todos los servicios..." -ForegroundColor Gray
Write-Host "Presiona Ctrl+C para detener`n" -ForegroundColor Gray

# Bucle para leer nuevos logs
while ($true) {
    foreach ($servicio in $servicios) {
        $archivo = Join-Path $logDir "$servicio.log"
        if (Test-Path $archivo) {
            $actualLength = (Get-Item $archivo).Length
            if ($actualLength -gt $posiciones[$servicio]) {
                $stream = [System.IO.File]::Open($archivo, 'Open', 'Read', 'ReadWrite')
                $stream.Seek($posiciones[$servicio], [System.IO.SeekOrigin]::Begin) | Out-Null
                $reader = New-Object System.IO.StreamReader($stream)
                while (($linea = $reader.ReadLine()) -ne $null) {
                    if (-not [string]::IsNullOrWhiteSpace($linea)) {
                        $color = $colores[$servicio]
                        if (-not $color) { $color = [ConsoleColor]::White }
                        $etiqueta = "[$servicio]".PadRight(24)
                        Write-Host $etiqueta -ForegroundColor $color -NoNewline
                        Write-Host "  $linea"
                    }
                }
                $posiciones[$servicio] = $stream.Position
                $reader.Close()
                $stream.Close()
            }
        }
    }
    Start-Sleep -Milliseconds 500
}
