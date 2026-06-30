import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import PaymentGateway from '../../components/shared/PaymentGateway'
import { useToast } from '../../components/shared/Toast'
import { useCountdown } from '../../hooks/useCountdown'
import styles from './StorePage.module.css'

function OfferBadge({ offer, gameId, onExpire }) {
  const { expired, formatted } = useCountdown(offer.expiresAt)
  React.useEffect(() => { if (expired) onExpire(offer.id) }, [expired])
  if (expired) return null
  return <div className={styles.offerTimer}>⏱ {formatted}</div>
}

export default function StorePage({ onGameClick }) {
  const { games, currentUser, buyGame, getEffectivePrice, expireOffer } = useStore()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [payGame, setPayGame] = useState(null) // game being purchased

  const owned = currentUser?.libraryIds || []
  const genres = ['Todos', ...new Set(games.map(g => g.genre))]

  const filtered = games.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase())
    const matchGenre = genre === 'Todos' || g.genre === genre
    return matchSearch && matchGenre
  })

  const handlePaySuccess = (method) => {
    buyGame(payGame.id, method)
    toast(`"${payGame.title}" añadido a tu biblioteca`, 'success')
    setPayGame(null)
  }

  return (
    <div>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Descubre tu próximo juego</h1>
        <p className={styles.heroSub}>Explora el catálogo completo · {games.length} juegos disponibles</p>
      </div>

      <div className={styles.filters}>
        <input className={styles.search} placeholder="Buscar juegos..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className={styles.genres}>
          {genres.map(g => (
            <button key={g} className={`${styles.genreBtn} ${genre === g ? styles.genreActive : ''}`} onClick={() => setGenre(g)}>{g}</button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map(game => {
          const isOwned = owned.includes(game.id)
          const pricing = getEffectivePrice(game.id)
          const hasOffer = pricing?.discount > 0
          return (
            <div key={game.id} className={`${styles.card} ${hasOffer ? styles.cardOnSale : ''}`} onClick={() => onGameClick(game)}>
              <div className={styles.cardImg}>
                <img src={game.image} alt={game.title} onError={e => { e.target.style.display='none' }} />
                {isOwned && <div className={styles.ownedBadge}>✓ En tu biblioteca</div>}
                {hasOffer && !isOwned && <div className={styles.saleBadge}>-{pricing.discount}%</div>}
                <div className={styles.ratingBadge}>⭐ {game.rating}</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{game.title}</div>
                <div className={styles.cardDev}>{game.developer}</div>
                {hasOffer && !isOwned && (
                  <OfferBadge offer={pricing.offer} gameId={game.id} onExpire={expireOffer} />
                )}
                <div className={styles.cardTags}>
                  {game.tags?.slice(0,2).map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.priceBlock}>
                    {isOwned ? (
                      <span className={styles.owned}>En biblioteca</span>
                    ) : hasOffer ? (
                      <>
                        <span className={styles.originalPrice}>${game.price}</span>
                        <span className={styles.salePrice}>${pricing.price}</span>
                      </>
                    ) : (
                      <span className={styles.price}>${game.price}</span>
                    )}
                  </div>
                  {!isOwned && (
                    <button className={`${styles.btnBuy} ${hasOffer ? styles.btnBuyHot : ''}`}
                      onClick={e => { e.stopPropagation(); setPayGame(game) }}>
                      {hasOffer ? '🔥 Comprar' : 'Comprar'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {payGame && (
        <PaymentGateway
          game={payGame}
          pricing={getEffectivePrice(payGame.id)}
          onSuccess={handlePaySuccess}
          onClose={() => setPayGame(null)}
        />
      )}
    </div>
  )
}
