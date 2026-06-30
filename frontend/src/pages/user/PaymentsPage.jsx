import React from 'react'
import { useStore } from '../../store/useStore'
import styles from './PaymentsPage.module.css'

export default function PaymentsPage() {
  const { payments, games, currentUser } = useStore()
  const mine = payments.filter(p => p.userId === currentUser?.id)
  const total = mine.reduce((acc, p) => acc + p.amount, 0)

  return (
    <div>
      <h2 className={styles.title}>Historial de Pagos</h2>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{mine.length}</div>
          <div className={styles.statLabel}>Transacciones</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>${total.toFixed(2)}</div>
          <div className={styles.statLabel}>Total gastado</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{currentUser?.libraryIds?.length || 0}</div>
          <div className={styles.statLabel}>Juegos adquiridos</div>
        </div>
      </div>

      {mine.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>💳</div>
          <p>No tienes transacciones aún.</p>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Juego</span><span>Método</span><span>Estado</span><span>Fecha</span><span>Monto</span>
          </div>
          {mine.map(p => {
            const game = games.find(g => g.id === p.gameId)
            return (
              <div key={p.id} className={styles.tableRow}>
                <div className={styles.gameCell}>
                  {game?.image && <img src={game.image} alt="" className={styles.gameThumb} onError={e => e.target.style.display='none'} />}
                  <span>{game?.title || 'Juego eliminado'}</span>
                </div>
                <span className={styles.cell}>{p.method}</span>
                <span className={styles.cell}>
                  <span className={`${styles.status} ${p.status === 'completado' ? styles.completed : styles.pending}`}>
                    {p.status === 'completado' ? '✓ Completado' : p.status}
                  </span>
                </span>
                <span className={styles.cell}>{p.date}</span>
                <span className={styles.amount}>${p.amount.toFixed(2)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
