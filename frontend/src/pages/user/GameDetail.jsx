import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import Modal from '../../components/shared/Modal'
import PaymentGateway from '../../components/shared/PaymentGateway'
import { useToast } from '../../components/shared/Toast'
import { useCountdown } from '../../hooks/useCountdown'
import styles from './GameDetail.module.css'

function StarPicker({ value, onChange }) {
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button"
          className={`${styles.star} ${s <= value ? styles.starOn : ''}`}
          onClick={() => onChange(s)}>★</button>
      ))}
    </div>
  )
}

function OfferTimer({ expiresAt, onExpire, offerId }) {
  const { expired, formatted } = useCountdown(expiresAt)
  React.useEffect(() => { if (expired) onExpire(offerId) }, [expired])
  if (expired) return null
  return (
    <div className={styles.offerTimer}>
      ⏱ La oferta termina en: <strong>{formatted}</strong>
    </div>
  )
}

export default function GameDetail({ game, onBack }) {
  const { reviews, addReview, updateReview, deleteReview, currentUser,
          buyGame, users, getEffectivePrice, expireOffer } = useStore()
  const toast = useToast()

  const pricing = getEffectivePrice(game.id)
  const owned = currentUser?.libraryIds?.includes(game.id)
  const gameReviews = reviews.filter(r => r.gameId === game.id)
  const myReview = gameReviews.find(r => r.userId === currentUser?.id)

  const [confirm, setConfirm] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, text: '' })

  const getUser = (uid) => users.find(u => u.id === uid)

  const handlePaySuccess = (method) => {
    buyGame(game.id, method)
    toast(`"${game.title}" añadido a tu biblioteca`, 'success')
    setShowPayment(false)
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!newReview.text.trim()) return
    addReview({ gameId: game.id, ...newReview })
    toast('Reseña publicada', 'success')
    setNewReview({ rating: 5, text: '' })
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    updateReview(editModal.id, { rating: editModal.rating, text: editModal.text })
    toast('Reseña actualizada', 'success')
    setEditModal(null)
  }

  const handleDeleteReview = () => {
    deleteReview(confirm.id)
    toast('Reseña eliminada', 'error')
    setConfirm(null)
  }

  return (
    <div className={styles.root}>
      <button className={styles.back} onClick={onBack}>← Volver</button>

      <div className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={game.image} alt={game.title} onError={e => e.target.style.display='none'} />
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.tags}>
            {game.tags?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
          <h1 className={styles.gameTitle}>{game.title}</h1>
          <p className={styles.gameDev}>{game.developer} · {game.releaseYear}</p>
          <p className={styles.gameDesc}>{game.description}</p>

          {pricing?.offer && !owned && (
            <OfferTimer
              expiresAt={pricing.offer.expiresAt}
              offerId={pricing.offer.id}
              onExpire={expireOffer}
            />
          )}

          <div className={styles.heroFooter}>
            <span className={styles.rating}>⭐ {game.rating}/5</span>
            {owned ? (
              <span className={styles.ownedLabel}>✓ En tu biblioteca</span>
            ) : (
              <div className={styles.buyArea}>
                <div className={styles.priceBox}>
                  {pricing?.originalPrice && (
                    <span className={styles.originalPrice}>${pricing.originalPrice}</span>
                  )}
                  {pricing?.discount > 0 && (
                    <span className={styles.discountBadge}>-{pricing.discount}%</span>
                  )}
                  <span className={styles.price}>${pricing?.price}</span>
                </div>
                <button className={styles.btnBuy} onClick={() => setShowPayment(true)}>
                  Comprar ahora
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Reseñas de la comunidad ({gameReviews.length})</h2>

        {/* Write review — only if owned and hasn't reviewed yet */}
        {owned && !myReview && (
          <form onSubmit={handleAddReview} className={styles.reviewForm}>
            <h3 className={styles.formTitle}>Escribe tu reseña</h3>
            <StarPicker value={newReview.rating} onChange={v => setNewReview(r => ({ ...r, rating: v }))} />
            <textarea className={styles.reviewInput}
              placeholder="Comparte tu opinión sobre este juego..."
              value={newReview.text}
              onChange={e => setNewReview(r => ({ ...r, text: e.target.value }))}
              rows={3} required />
            <button type="submit" className={styles.btnPublish}>📝 Publicar Reseña</button>
          </form>
        )}

        {/* Locked — not owned */}
        {!owned && (
          <div className={styles.reviewLocked}>
            🔒 Debes adquirir este juego para poder escribir una reseña.
          </div>
        )}

        {gameReviews.length === 0 ? (
          <p className={styles.noReviews}>Sé el primero en escribir una reseña.</p>
        ) : (
          <div className={styles.reviewsList}>
            {gameReviews.map(r => {
              const author = getUser(r.userId)
              const isOwn = r.userId === currentUser?.id
              return (
                <div key={r.id} className={`${styles.reviewCard} ${isOwn ? styles.myReview : ''}`}>
                  <div className={styles.reviewHeader}>
                    <img src={author?.avatar} alt="" className={styles.reviewAvatar} />
                    <div className={styles.reviewMeta}>
                      <span className={styles.reviewAuthor}>{author?.name || 'Usuario'}</span>
                      {isOwn && <span className={styles.ownBadge}>Tú</span>}
                      <span className={styles.reviewDate}>{r.createdAt}</span>
                    </div>
                    <div className={styles.reviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                    {isOwn && (
                      <div className={styles.reviewActions}>
                        <button className={styles.btnEdit} onClick={() => setEditModal({ ...r })}>✏️</button>
                        <button className={styles.btnDel} onClick={() => setConfirm({ type: 'review', id: r.id })}>🗑️</button>
                      </div>
                    )}
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {confirm?.type === 'review' && (
        <ConfirmDialog title="Eliminar Reseña"
          message="¿Eliminar tu reseña? Esta acción no se puede deshacer."
          onConfirm={handleDeleteReview} onCancel={() => setConfirm(null)} />
      )}

      {editModal && (
        <Modal title="Editar Reseña" onClose={() => setEditModal(null)}>
          <form onSubmit={handleSaveEdit} className={styles.editForm}>
            <StarPicker value={editModal.rating} onChange={v => setEditModal(m => ({ ...m, rating: v }))} />
            <textarea className={styles.reviewInput} value={editModal.text}
              onChange={e => setEditModal(m => ({ ...m, text: e.target.value }))} rows={4} required />
            <div className={styles.editActions}>
              <button type="button" className={styles.btnCancelEdit} onClick={() => setEditModal(null)}>Cancelar</button>
              <button type="submit" className={styles.btnSaveEdit}>💾 Guardar</button>
            </div>
          </form>
        </Modal>
      )}

      {showPayment && pricing && (
        <PaymentGateway
          game={game}
          pricing={pricing}
          onSuccess={handlePaySuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  )
}
