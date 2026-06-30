# GamesRentAll — Sistema de Renta de Videojuegos

## SECCIÓN 1 — Nombre del proyecto

- **Nombre del proyecto**: GamesRentAll — Sistema de Renta de Videojuegos
- **Integrantes**: [Espacio para llenar]
- **Fecha de sustentación**: [Espacio para llenar]
- **Curso**: Microservicios


## SECCIÓN 2 — Lista de microservicios

| Nombre del servicio     | Puerto | Responsabilidad                          | Tipo          |
|-------------------------|--------|------------------------------------------|---------------|
| servicio-discovery      | 8761   | Registro y descubrimiento de servicios   | Apoyo         |
| servicio-gateway        | 8080   | Enrutamiento de peticiones               | Entrada       |
| usuario-service         | 8081   | Gestión de usuarios                      | Negocio       |
| analitica-service       | 8082   | Análisis de datos y estadísticas         | Apoyo         |
| biblioteca-service      | 8083   | Gestión de biblioteca personal de juegos | Negocio       |
| catalogo-service        | 8084   | Catálogo de videojuegos disponibles      | Negocio       |
| notificaciones-service  | 8085   | Envío de notificaciones                  | Apoyo         |
| ofertas-service         | 8086   | Gestión de promociones y descuentos      | Negocio       |
| pagos-service           | 8087   | Procesamiento de pagos                   | Negocio       |
| renta-service           | 8088   | Gestión de rentas de videojuegos         | Negocio       |
| resenas-service         | 8089   | Gestión de reseñas de juegos             | Negocio       |
| soporte-service         | 8090   | Atención al cliente y soporte técnico    | Negocio       |


## SECCIÓN 3 — Flujo principal evaluado

### Diagrama ASCII del flujo principal
```
┌─────────┐     ┌───────────────────┐     ┌─────────────────┐
│ Cliente │ ──► │ servicio-gateway  │ ──► │ usuario-service │
└─────────┘     │     (8080)        │     └─────────────────┘
                └───────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ catalogo-service│
                └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  renta-service  │
                └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  pagos-service  │
                └─────────────────┘
```

### Explicación del flujo
El flujo principal de una renta de videojuego involucra:
1. **servicio-gateway**: Recibe la petición del cliente y la enruta al servicio correspondiente.
2. **usuario-service**: Verifica que el usuario exista y esté activo.
3. **catalogo-service**: Consulta disponibilidad del videojuego.
4. **renta-service**: Crea el registro de la renta.
5. **pagos-service**: Procesa el pago asociado a la renta.


## SECCIÓN 4 — Evidencia de métricas

| Consulta PromQL                                 | Qué demuestra                                 | Dónde se ve                          |
|-------------------------------------------------|-----------------------------------------------|--------------------------------------|
| `up`                                            | Estado de disponibilidad de cada servicio     | Grafana: Panel "Servicios vivos"     |
| `sum by (job) (rate(http_server_requests_seconds_count[1m]))` | Tasa de requests por segundo por servicio | Grafana: Panel "Requests por segundo" |
| `sum by (job, status) (rate(http_server_requests_seconds_count{status=~"5.."}[1m]))` | Errores HTTP 5xx por servicio | Grafana: Panel "Errores HTTP 5xx" |
| `sum by (job) (jvm_memory_used_bytes)`          | Uso de memoria JVM por servicio               | Grafana: Panel "Memoria JVM por servicio" |
| `avg by (job) (system_cpu_usage)`               | Uso de CPU por servicio                       | Grafana: Panel "CPU por servicio"   |
| `sum by (job, status) (rate(http_server_requests_seconds_count{status=~"401|403"}[1m]))` | Errores de autorización | Grafana: Panel "Respuestas 401/403" |


## SECCIÓN 5 — Evidencia de logs

### Alternativa a Loki
Debido a restricciones de instalación, se implementó una alternativa a Loki usando **archivos de log individuales por servicio** almacenados en la carpeta `_observabilidad/logs/`, con scripts PowerShell para:
- Visualizar logs combinados en tiempo real con colores por servicio (`ver-logs-todos.bat`)
- Ver logs de un servicio específico (`ver-logs-servicio.bat`)
- Buscar texto en todos los logs (`buscar-en-logs.bat`)

### Ejemplos de líneas de log real
```
[usuario-service]    2026-06-15 14:30:00 INFO  c.g.u.UsuarioController - Petición /test recibida
[analitica-service]  2026-06-15 14:30:01 INFO  c.g.a.AnaliticaController - Petición /test recibida
[biblioteca-service] 2026-06-15 14:30:02 INFO  c.g.b.BibliotecaController - Petición /test recibida
[catalogo-service]   2026-06-15 14:30:03 INFO  c.g.c.CatalogoController - Petición /test recibida
[notificaciones-service] 2026-06-15 14:30:04 INFO  c.g.n.NotificacionesController - Petición /test recibida
[ofertas-service]    2026-06-15 14:30:05 INFO  c.g.o.OfertasController - Petición /test recibida
[pagos-service]      2026-06-15 14:30:06 INFO  c.g.p.PagosController - Petición /test recibida
[renta-service]      2026-06-15 14:30:07 INFO  c.g.r.RentaController - Petición /test recibida
[resenas-service]    2026-06-15 14:30:08 INFO  c.g.re.ResenasController - Petición /test recibida
[soporte-service]    2026-06-15 14:30:09 INFO  c.g.s.SoporteController - Petición /test recibida
```

### Equivalencia a Loki
Esta alternativa cumple con los requisitos básicos de logging:
- **Almacenamiento**: Persiste logs en archivos
- **Búsqueda**: Permite buscar texto en todos los logs
- **Filtrado**: Permite ver logs por servicio individual
- **Tiempo real**: Muestra nuevos logs a medida que se generan


## SECCIÓN 6 — Evidencia de alertas

| Nombre                       | Condición                                                                 | Severidad | Qué detecta                                  | Por qué es importante                              |
|------------------------------|---------------------------------------------------------------------------|-----------|----------------------------------------------|----------------------------------------------------|
| Servicio caído               | `up{job=~"usuario-service|renta-service|pagos-service|catalogo-service"} < 1` | Critical  | Servicios críticos no disponibles            | Los servicios de renta, pagos y catálogo son esenciales |
| Errores HTTP 5xx detectados  | `sum by (job) (rate(http_server_requests_seconds_count{status=~"5.."}[1m])) > 0` | Warning   | Errores internos del servidor                | Indica problemas en la lógica de negocio           |
| Servicio sin tráfico         | `sum by (job) (rate(http_server_requests_seconds_count[5m])) == 0`       | Warning   | Servicios sin actividad prolongada           | Podría indicar un problema silencioso              |


## SECCIÓN 7 — Falla controlada

### Escenario de falla
Se apagó manualmente el servicio **renta-service** (puerto 8088) mientras se generaba tráfico continuo.

### Qué métrica mostró el problema
- La métrica `up` para `renta-service` pasó de `1` a `0`
- El panel "Servicios vivos" en Grafana mostró el servicio en rojo (DOWN)
- La alerta "Servicio caído" se disparó en estado **Firing**

### Qué log confirmó la causa
- Los logs combinados dejaron de mostrar líneas de `[renta-service]`
- El script `probar-sistema.bat` mostró error en la petición a `/api/renta/test`

### Cómo se restauró el servicio
Se volvió a ejecutar `mvn spring-boot:run` en la carpeta `microservicios/renta-service`. El servicio se registró nuevamente en Eureka y la alerta se resolvió automáticamente.

### Frase resumen
> **"Las métricas me dijeron que el servicio estaba caído, los logs me confirmaron que no había actividad, y la recuperación fue automática gracias a Eureka."**


## SECCIÓN 8 — Riesgos arquitectónicos reconocidos

| Riesgo | Descripción | Mitigación a implementar con más tiempo |
|--------|-------------|-----------------------------------------|
| **Sin autenticación en Gateway** | Los microservicios están expuestos sin seguridad | Implementar Spring Security en Gateway con OAuth2/JWT |
| **Sin Loki** | Logs no centralizados | Instalar Loki y Promtail para recolección centralizada de logs |
| **Solo endpoint /test implementado** | Lógica de negocio no probada | Implementar endpoints reales y pruebas de integración |
| **Sin tolerancia a fallos** | No hay Circuit Breaker | Implementar Resilience4j en servicios críticos |


## SECCIÓN 9 — Matriz de revisión completa

| Microservicio          | UP en Prometheus | Requests visibles | Errores visibles | Logs disponibles | Alerta definida | Evidencia de falla | Seguridad observada |
|------------------------|------------------|-------------------|------------------|------------------|-----------------|--------------------|---------------------|
| servicio-discovery     | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| servicio-gateway       | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| usuario-service        | Sí               | Sí                | Sí               | Sí               | Sí              | Sí                 | No                  |
| analitica-service      | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| biblioteca-service     | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| catalogo-service       | Sí               | Sí                | Sí               | Sí               | Sí              | Sí                 | No                  |
| notificaciones-service | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| ofertas-service        | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| pagos-service          | Sí               | Sí                | Sí               | Sí               | Sí              | Sí                 | No                  |
| renta-service          | Sí               | Sí                | Sí               | Sí               | Sí              | Sí                 | No                  |
| resenas-service        | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |
| soporte-service        | Sí               | Sí                | Sí               | Sí               | No              | No                 | No                  |


## SECCIÓN 10 — Conclusión del equipo

En este proyecto aprendimos que la **observabilidad es fundamental en microservicios** para detectar y diagnosticar fallos rápidamente. El stack Prometheus + Grafana funciona muy bien para monitorear métricas en tiempo real y establecer alertas proactivas. Aunque no pudimos implementar Loki, la alternativa con archivos de log y scripts PowerShell cumple con los requisitos básicos y demostró ser útil para la depuración. Con más tiempo, implementaríamos autenticación en el Gateway, tolerancia a fallos con Resilience4j, y centralizaríamos los logs con Loki. La observabilidad no es solo herramientas: es una cultura de entender cómo se comporta el sistema en producción.


---

## Frases clave para la sustentación

### Pregunta 1: ¿Por qué es importante la observabilidad en microservicios?
> "En microservicios, el sistema está distribuido, así que cuando algo sale mal no hay un solo lugar para mirar. La observabilidad con métricas, logs y alertas te ayuda a detectar fallos rápidamente y saber exactamente dónde está el problema."

### Pregunta 2: ¿Por qué usaron Prometheus y Grafana?
> "Prometheus recolecta métricas de forma eficiente y tiene un lenguaje de consulta (PromQL) muy potente. Grafana permite visualizar esas métricas en dashboards intuitivos y configurar alertas fácilmente. Ambos se integran perfectamente con Spring Boot Actuator."

### Pregunta 3: ¿Por qué no usaron Loki?
> "Por restricciones de instalación en el entorno local. Pero implementamos una alternativa con archivos de log y scripts PowerShell que permiten ver logs combinados, filtrar por servicio y buscar texto, cumpliendo con los requisitos de logging."

### Pregunta 4: ¿Qué aprendieron sobre alertas?
> "Las alertas deben ser proactivas, no reactivas. Es mejor tener alertas por disponibilidad (up) y errores 5xx que esperar a que los usuarios se quejen. También aprendimos a no generar demasiadas alertas para evitar 'alert fatigue'."

### Pregunta 5: ¿Qué mejorarían con más tiempo?
> "Primero, implementaríamos seguridad en el Gateway con OAuth2. Luego, agregaríamos Resilience4j para tolerancia a fallos. Finalmente, instalaríamos Loki para centralizar logs y tener todas las tres pilas de observabilidad completas."
