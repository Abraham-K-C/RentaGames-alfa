import React from 'react'
import { useStore } from '../../store/useStore'
import styles from './LibraryPage.module.css'

export default function LibraryPage({ onGameClick }) {
  const { games, currentUser } = useStore()
  const owned = games.filter(g => currentUser?.libraryIds?.includes(g.id))

  if (owned.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📚</div>
        <h2>Tu biblioteca está vacía</h2>
        <p>Visita la tienda para adquirir juegos y aparecerán aquí.</p>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Mi Biblioteca</h2>
        <span className={styles.count}>{owned.length} juegos</span>
      </div>
      <div className={styles.grid}>
        {owned.map(game => (
          <div key={game.id} className={styles.card} onClick={() => onGameClick(game)}>
            <div className={styles.cardImg}>
              <img src={game.image} alt={game.title} onError={e => { e.target.style.display='none' }} />
              <div className={styles.playOverlay}>▶ Ver detalles</div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardTitle}>{game.title}</div>
              <div className={styles.cardSub}>{game.genre} · {game.developer}</div>
              <div className={styles.cardTags}>
                {game.tags?.slice(0,3).map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
