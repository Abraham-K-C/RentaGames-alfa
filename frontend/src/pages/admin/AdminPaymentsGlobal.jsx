import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import styles from './AdminPaymentsGlobal.module.css'

export default function AdminPaymentsGlobal() {
  const { payments, games, users } = useStore()
  const [search, setSearch] = useState('')

  const sorted = [...payments].sort((a, b) => b.date.localeCompare(a.date))
  const filtered = sorted.filter(p => {
    if (!search) return true
    const user = users.find(u => u.id === p.userId)
    const game = games.find(g => g.id === p.gameId)
    return user?.name.toLowerCase().includes(search.toLowerCase()) ||
      game?.title.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase())
  })

  // Only count non-refunded payments toward revenue
  const activePayments = payments.filter(p => p.status !== 'reembolsado')
  const refundedPayments = payments.filter(p => p.status === 'reembolsado')
  const totalRevenue = activePayments.reduce((acc, p) => acc + p.amount, 0)
  const totalRefunded = refundedPayments.reduce((acc, p) => acc + p.amount, 0)
  const totalTransactions = payments.length
  const uniqueUsers = new Set(payments.map(p => p.userId)).size
  const avgTicket = activePayments.length ? (totalRevenue / activePayments.length).toFixed(2) : 0

  const methodBreakdown = activePayments.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + p.amount
    return acc
  }, {})

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Finanzas Globales</h2>
          <p className={styles.subtitle}>Historial de todas las transacciones de la plataforma</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statVal}>${totalRevenue.toFixed(2)}</div>
          <div className={styles.statLabel}>Ingresos totales</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🧾</div>
          <div className={styles.statVal}>{totalTransactions}</div>
          <div className={styles.statLabel}>Transacciones</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statVal}>{uniqueUsers}</div>
          <div className={styles.statLabel}>Compradores únicos</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statVal}>${avgTicket}</div>
          <div className={styles.statLabel}>Ticket promedio</div>
        </div>
      </div>

      <div className={styles.breakdown}>
        <h3 className={styles.breakdownTitle}>Ingresos por método de pago</h3>
        <div className={styles.breakdownList}>
          {Object.entries(methodBreakdown).map(([method, total]) => {
            const pct = ((total / totalRevenue) * 100).toFixed(0)
            return (
              <div key={method} className={styles.breakdownItem}>
                <span className={styles.breakdownMethod}>{method}</span>
                <div className={styles.breakdownBar}>
                  <div className={styles.breakdownFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.breakdownAmt}>${total.toFixed(2)} ({pct}%)</span>
              </div>
            )
          })}
        </div>
      </div>

      <input className={styles.search} placeholder="Buscar por usuario, juego o método..."
        value={search} onChange={e => setSearch(e.target.value)} />

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Usuario</span><span>Juego</span><span>Método</span><span>Estado</span><span>Fecha</span><span>Monto</span>
        </div>
        {filtered.map(p => {
          const user = users.find(u => u.id === p.userId)
          const game = games.find(g => g.id === p.gameId)
          return (
            <div key={p.id} className={styles.tableRow}>
              <div className={styles.userCell}>
                <img src={user?.avatar} alt="" className={styles.rowAvatar} onError={e => e.target.style.display='none'} />
                <span>{user?.name || '—'}</span>
              </div>
              <span className={styles.cell}>{game?.title || 'Eliminado'}</span>
              <span className={styles.cell}>{p.method}</span>
              <span className={styles.cell}>
                <span className={styles.statusBadge}>✓ {p.status}</span>
              </span>
              <span className={styles.cell}>{p.date}</span>
              <div className={styles.amtCell}>
                {p.discount > 0 && <span className={styles.discountLabel}>-{p.discount}%</span>}
                <span className={styles.amount}>${p.amount.toFixed(2)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
