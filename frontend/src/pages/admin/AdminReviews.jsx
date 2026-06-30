import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import styles from './AdminReviews.module.css'

export default function AdminReviews() {
  const { reviews, games, users } = useStore()
  const [search, setSearch] = useState('')
  const [filterGame, setFilterGame] = useState('all')

  const sorted = [...reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const filtered = sorted.filter(r => {
    const user = users.find(u => u.id === r.userId)
    const game = games.find(g => g.id === r.gameId)
    const matchSearch = !search ||
      user?.name.toLowerCase().includes(search.toLowerCase()) ||
      game?.title.toLowerCase().includes(search.toLowerCase()) ||
      r.text.toLowerCase().includes(search.toLowerCase())
    const matchGame = filterGame === 'all' || r.gameId === parseInt(filterGame)
    return matchSearch && matchGame
  })

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : '—'

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Reseñas Globales</h2>
          <p className={styles.subtitle}>Monitoreo de todas las reseñas de la plataforma</p>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal}>{reviews.length}</span>
          <span className={styles.statLabel}>Total</span>
          <span className={styles.statVal} style={{marginLeft:16}}>⭐ {avgRating}</span>
          <span className={styles.statLabel}>Promedio</span>
        </div>
      </div>

      <div className={styles.filters}>
        <input className={styles.search} placeholder="Buscar por usuario, juego o contenido..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <select className={styles.select} value={filterGame} onChange={e => setFilterGame(e.target.value)}>
          <option value="all">Todos los juegos</option>
          {games.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </div>

      <div className={styles.list}>
        {filtered.length === 0 && (
          <div className={styles.empty}>No hay reseñas que coincidan.</div>
        )}
        {filtered.map(r => {
          const user = users.find(u => u.id === r.userId)
          const game = games.find(g => g.id === r.gameId)
          return (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <img src={user?.avatar} alt="" className={styles.avatar} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.userName}>{user?.name || 'Usuario eliminado'}</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.gameTag}>{game?.title || 'Juego eliminado'}</span>
                  <div className={styles.stars}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  <span className={styles.date}>{r.createdAt}</span>
                </div>
                <p className={styles.reviewText}>{r.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
