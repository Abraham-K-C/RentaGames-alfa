import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import Modal from '../../components/shared/Modal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import { useToast } from '../../components/shared/Toast'
import { useCountdown } from '../../hooks/useCountdown'
import styles from './AdminOffers.module.css'

function CountdownCell({ offer, onExpire }) {
  const { expired, formatted } = useCountdown(offer.expiresAt)

  React.useEffect(() => {
    if (expired) onExpire(offer.id)
  }, [expired])

  if (expired) return <span className={styles.expired}>Expirada</span>
  return <span className={styles.countdown}>⏱ {formatted}</span>
}

function OfferForm({ initial, games, offers, onSave, onClose }) {
  const now = new Date()
  const defaultExpiry = new Date(now.getTime() + 2 * 60 * 60 * 1000)
    .toISOString().slice(0, 16)

  const [form, setForm] = useState(initial
    ? {
        gameId: String(initial.gameId),
        discount: String(initial.discount),
        expiresAt: new Date(initial.expiresAt).toISOString().slice(0, 16),
      }
    : { gameId: '', discount: '', expiresAt: defaultExpiry }
  )

  const activeOfferGameIds = offers
    .filter(o => !initial || o.id !== initial.id)
    .map(o => o.gameId)

  const availableGames = games.filter(g => !activeOfferGameIds.includes(g.id))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      gameId: parseInt(form.gameId),
      discount: parseInt(form.discount),
      expiresAt: new Date(form.expiresAt).getTime(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label>Juego</label>
        <select value={form.gameId} onChange={e => setForm(f => ({ ...f, gameId: e.target.value }))} required>
          <option value="">Selecciona un juego</option>
          {availableGames.map(g => (
            <option key={g.id} value={g.id}>{g.title} (${g.price})</option>
          ))}
          {initial && !availableGames.find(g => g.id === initial.gameId) && (
            <option value={initial.gameId}>{games.find(g => g.id === initial.gameId)?.title}</option>
          )}
        </select>
      </div>
      <div className={styles.field}>
        <label>Descuento (%)</label>
        <input type="number" min={1} max={99} value={form.discount}
          onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} required placeholder="Ej: 30" />
      </div>
      <div className={styles.field}>
        <label>Fecha y hora de expiración</label>
        <input type="datetime-local" value={form.expiresAt}
          min={new Date().toISOString().slice(0,16)}
          onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))} required />
      </div>
      {form.gameId && form.discount && (
        <div className={styles.preview}>
          {(() => {
            const g = games.find(g => g.id === parseInt(form.gameId))
            if (!g) return null
            const discounted = (g.price * (1 - parseInt(form.discount) / 100)).toFixed(2)
            return <span>Precio con descuento: <b className={styles.previewPrice}>${discounted}</b> (antes ${g.price})</span>
          })()}
        </div>
      )}
      <div className={styles.formActions}>
        <button type="button" className={styles.btnCancel} onClick={onClose}>Cancelar</button>
        <button type="submit" className={styles.btnSave}>💾 Guardar Oferta</button>
      </div>
    </form>
  )
}

export default function AdminOffers() {
  const { offers, games, addOffer, updateOffer, deleteOffer, expireOffer } = useStore()
  const toast = useToast()
  const [modal, setModal] = useState(null)

  const handleCreate = (form) => {
    addOffer(form)
    toast('Oferta creada', 'success')
    setModal(null)
  }
  const handleEdit = (form) => {
    updateOffer(modal.offer.id, form)
    toast('Oferta actualizada', 'success')
    setModal(null)
  }
  const handleDelete = () => {
    deleteOffer(modal.offer.id)
    toast('Oferta eliminada', 'error')
    setModal(null)
  }

  const totalRevenueLoss = offers.reduce((acc, o) => {
    const g = games.find(g => g.id === o.gameId)
    return g ? acc + (g.price * o.discount / 100) : acc
  }, 0)

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Gestión de Ofertas</h2>
          <p className={styles.subtitle}>{offers.length} ofertas activas</p>
        </div>
        <button className={styles.btnCreate} onClick={() => setModal({ type: 'create' })}>+ Nueva Oferta</button>
      </div>

      {offers.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🏷️</div>
          <p>No hay ofertas activas. Crea una para incentivar ventas.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {offers.map(o => {
            const game = games.find(g => g.id === o.gameId)
            if (!game) return null
            const discounted = (game.price * (1 - o.discount / 100)).toFixed(2)
            return (
              <div key={o.id} className={styles.offerCard}>
                <div className={styles.offerImg}>
                  <img src={game.image} alt={game.title} onError={e => e.target.style.display='none'} />
                  <div className={styles.discountBadge}>-{o.discount}%</div>
                </div>
                <div className={styles.offerBody}>
                  <div className={styles.offerTitle}>{game.title}</div>
                  <div className={styles.offerPrices}>
                    <span className={styles.original}>${game.price}</span>
                    <span className={styles.discounted}>${discounted}</span>
                  </div>
                  <div className={styles.offerTimer}>
                    <CountdownCell offer={o} onExpire={expireOffer} />
                  </div>
                  <div className={styles.offerActions}>
                    <button className={styles.btnEdit} onClick={() => setModal({ type: 'edit', offer: o })}>✏️ Editar</button>
                    <button className={styles.btnDelete} onClick={() => setModal({ type: 'delete', offer: o })}>🗑️</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal?.type === 'create' && (
        <Modal title="Nueva Oferta" onClose={() => setModal(null)}>
          <OfferForm games={games} offers={offers} onSave={handleCreate} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'edit' && (
        <Modal title="Editar Oferta" onClose={() => setModal(null)}>
          <OfferForm initial={modal.offer} games={games} offers={offers} onSave={handleEdit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'delete' && (
        <ConfirmDialog
          title="Eliminar Oferta"
          message={`¿Eliminar la oferta de "${games.find(g => g.id === modal.offer.gameId)?.title}"? El juego volverá a su precio original.`}
          onConfirm={handleDelete} onCancel={() => setModal(null)} />
      )}
    </div>
  )
}
