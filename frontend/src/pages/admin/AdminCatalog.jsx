import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import Modal from '../../components/shared/Modal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import { useToast } from '../../components/shared/Toast'
import styles from './AdminCatalog.module.css'

const EMPTY_GAME = { title: '', genre: '', price: '', developer: '', releaseYear: '', description: '', image: '', tags: '' }

function GameForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial
    ? { ...initial, tags: initial.tags?.join(', ') || '', price: String(initial.price) }
    : EMPTY_GAME)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, price: parseFloat(form.price), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        {[['Título', 'title', 'text'], ['Género', 'genre', 'text'], ['Precio ($)', 'price', 'number'], ['Desarrollador', 'developer', 'text'], ['Año', 'releaseYear', 'number']].map(([label, key, type]) => (
          <div key={key} className={styles.field}>
            <label>{label}</label>
            <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} required step={key === 'price' ? '0.01' : undefined} />
          </div>
        ))}
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>URL de Imagen</label>
          <input type="url" value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Tags (separados por coma)</label>
          <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Acción, RPG, Mundo abierto" />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Descripción</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
        </div>
      </div>
      <div className={styles.formActions}>
        <button type="button" className={styles.btnCancel} onClick={onClose}>Cancelar</button>
        <button type="submit" className={styles.btnSave}>💾 Guardar</button>
      </div>
    </form>
  )
}

export default function AdminCatalog() {
  const { games, addGame, updateGame, deleteGame } = useStore()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.genre.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = (form) => { addGame(form); toast('Juego añadido al catálogo', 'success'); setModal(null) }
  const handleEdit = (form) => { updateGame(modal.game.id, form); toast('Juego actualizado', 'success'); setModal(null) }
  const handleDelete = () => { deleteGame(modal.game.id); toast('Juego eliminado del catálogo', 'error'); setModal(null) }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Gestión de Catálogo</h2>
          <p className={styles.subtitle}>{games.length} juegos en la base de datos</p>
        </div>
        <button className={styles.btnCreate} onClick={() => setModal({ type: 'create' })}>+ Añadir Juego</button>
      </div>

      <input className={styles.search} placeholder="Buscar juegos..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className={styles.grid}>
        {filtered.map(g => (
          <div key={g.id} className={styles.card}>
            <div className={styles.cardImg}>
              <img src={g.image} alt={g.title} onError={e => e.target.style.display = 'none'} />
              <div className={styles.cardOverlay}>
                <button className={styles.btnEdit} onClick={() => setModal({ type: 'edit', game: g })}>✏️ Editar</button>
                <button className={styles.btnDelete} onClick={() => setModal({ type: 'delete', game: g })}>🗑️ Eliminar</button>
              </div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{g.title}</div>
              <div className={styles.cardMeta}>{g.genre} · {g.developer}</div>
              <div className={styles.cardPrice}>${g.price}</div>
              <div className={styles.cardTags}>
                {g.tags?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal?.type === 'create' && (
        <Modal title="Añadir Juego" onClose={() => setModal(null)} size="lg">
          <GameForm onSave={handleCreate} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'edit' && (
        <Modal title="Editar Juego" onClose={() => setModal(null)} size="lg">
          <GameForm initial={modal.game} onSave={handleEdit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'delete' && (
        <ConfirmDialog
          title="Eliminar Juego"
          message={`¿Eliminar "${modal.game.title}" del catálogo? También se eliminará de las bibliotecas de usuarios.`}
          onConfirm={handleDelete} onCancel={() => setModal(null)} />
      )}
    </div>
  )
}
