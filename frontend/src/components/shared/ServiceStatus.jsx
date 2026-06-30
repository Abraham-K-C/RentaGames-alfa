import React, { useState, useEffect } from 'react'
import styles from './ServiceStatus.module.css'

const SERVICES = [
  { name: 'Usuarios',       url: '/api/usuarios/test',       port: 8081 },
  { name: 'Catálogo',       url: '/api/catalogo/test',       port: 8084 },
  { name: 'Biblioteca',     url: '/api/biblioteca/test',     port: 8083 },
  { name: 'Pagos',          url: '/api/pagos/test',          port: 8087 },
  { name: 'Reseñas',        url: '/api/resenas/test',        port: 8089 },
  { name: 'Ofertas',        url: '/api/ofertas/test',        port: 8086 },
  { name: 'Soporte',        url: '/api/soporte/test',        port: 8090 },
  { name: 'Renta',          url: '/api/renta/test',          port: 8088 },
]

export default function ServiceStatus() {
  const [open, setOpen] = useState(false)
  const [statuses, setStatuses] = useState({})

  const checkAll = async () => {
    const results = {}
    await Promise.all(
      SERVICES.map(async (s) => {
        try {
          const res = await fetch(s.url, { signal: AbortSignal.timeout(2500) })
          results[s.name] = res.ok ? 'ok' : 'error'
        } catch {
          results[s.name] = 'offline'
        }
      })
    )
    setStatuses(results)
  }

  useEffect(() => {
    if (open) checkAll()
  }, [open])

  const allOk = SERVICES.every(s => statuses[s.name] === 'ok')
  const anyChecked = Object.keys(statuses).length > 0

  return (
    <div className={styles.root}>
      <button
        className={`${styles.trigger} ${anyChecked ? (allOk ? styles.triggerOk : styles.triggerWarn) : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Estado de microservicios"
      >
        <span className={styles.dot} />
        Servicios
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>Estado de Microservicios</span>
            <button className={styles.btnRefresh} onClick={checkAll}>↻ Revisar</button>
          </div>
          {SERVICES.map(s => {
            const st = statuses[s.name]
            return (
              <div key={s.name} className={styles.row}>
                <span className={`${styles.indicator} ${st === 'ok' ? styles.indOk : st ? styles.indOff : styles.indPending}`} />
                <span className={styles.svcName}>{s.name}</span>
                <span className={styles.svcPort}>:{s.port}</span>
                <span className={styles.svcStatus}>
                  {!st ? '—' : st === 'ok' ? 'Activo' : 'Offline'}
                </span>
              </div>
            )
          })}
          <p className={styles.hint}>
            Los microservicios deben estar corriendo para que el frontend los use. Mientras no estén activos, la app funciona con datos locales.
          </p>
        </div>
      )}
    </div>
  )
}
