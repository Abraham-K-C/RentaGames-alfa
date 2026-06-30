import React, { useState, useRef } from 'react'
import { useStore } from '../../store/useStore'
import { useToast } from '../../components/shared/Toast'
import styles from './UserSupport.module.css'

const CATEGORIES = [
  'Problema con Yape/Plin',
  'Error al iniciar juego',
  'Solicitud de Reembolso',
  'Error Técnico',
]

const STATUS_META = {
  pendiente:    { label: 'Pendiente',  cls: 'pending'    },
  'en proceso': { label: 'En Proceso', cls: 'inprogress' },
  resuelto:     { label: 'Resuelto',   cls: 'resolved'   },
}

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.pendiente
  return <span className={`${styles.badge} ${styles[m.cls]}`}>{m.label}</span>
}

function DragDropArea({ file, onChange }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) onChange(f)
  }

  return (
    <div
      className={`${styles.dropArea} ${dragging ? styles.dragging : ''} ${file ? styles.hasFile : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" className={styles.fileInput}
        onChange={e => e.target.files[0] && onChange(e.target.files[0])} />
      {file ? (
        <div className={styles.filePreview}>
          <span className={styles.fileIcon}>🖼️</span>
          <span className={styles.fileName}>{file.name}</span>
          <button type="button" className={styles.fileRemove}
            onClick={e => { e.stopPropagation(); onChange(null) }}>✕</button>
        </div>
      ) : (
        <div className={styles.dropContent}>
          <span className={styles.dropIcon}>📎</span>
          <span className={styles.dropText}>Arrastra una captura de pantalla aquí</span>
          <span className={styles.dropSub}>o haz clic para seleccionar</span>
        </div>
      )}
    </div>
  )
}

export default function UserSupport() {
  const { currentUser, tickets, games, addTicket } = useStore()
  const toast = useToast()

  const [tab, setTab] = useState('tickets') // 'tickets' | 'new'
  const [form, setForm] = useState({ category: '', subject: '', message: '', gameId: '' })
  const [attachment, setAttachment] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const myTickets = tickets
    .filter(t => t.userId === currentUser?.id)
    .sort((a, b) => b.date.localeCompare(a.date))

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.category || !form.subject || !form.message) return
    setSubmitting(true)
    setTimeout(() => {
      addTicket({ ...form, gameId: form.gameId ? parseInt(form.gameId) : null })
      toast('Ticket enviado correctamente. Te responderemos pronto.', 'success')
      setForm({ category: '', subject: '', message: '', gameId: '' })
      setAttachment(null)
      setSubmitting(false)
      setTab('tickets')
    }, 800)
  }

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Centro de Ayuda</h2>
        <p className={styles.pageSub}>¿Tienes un problema? Estamos aquí para ayudarte.</p>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'tickets' ? styles.tabActive : ''}`}
          onClick={() => setTab('tickets')}>
          🎫 Mis Tickets {myTickets.length > 0 && <span className={styles.tabCount}>{myTickets.length}</span>}
        </button>
        <button className={`${styles.tab} ${tab === 'new' ? styles.tabActive : ''}`}
          onClick={() => setTab('new')}>
          ✏️ Nuevo Ticket
        </button>
      </div>

      {/* My Tickets */}
      {tab === 'tickets' && (
        <div className={styles.ticketList}>
          {myTickets.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🎫</div>
              <p>No tienes tickets enviados aún.</p>
              <button className={styles.btnNewTicket} onClick={() => setTab('new')}>
                Crear mi primer ticket
              </button>
            </div>
          ) : myTickets.map(t => {
            const game = games.find(g => g.id === t.gameId)
            const lastMsg = t.messages[t.messages.length - 1]
            const hasReply = t.messages.some(m => m.from === 'admin')
            return (
              <div key={t.id} className={`${styles.ticketCard} ${hasReply ? styles.hasReply : ''}`}>
                <div className={styles.ticketTop}>
                  <div className={styles.ticketInfo}>
                    <span className={styles.ticketCat}>{t.category}</span>
                    {game && <span className={styles.ticketGame}>· {game.title}</span>}
                  </div>
                  <StatusBadge status={t.status} />
                </div>
                <div className={styles.ticketSubject}>{t.subject}</div>
                <div className={styles.ticketMessages}>
                  {t.messages.map((m, i) => (
                    <div key={i} className={`${styles.msgRow} ${m.from === 'admin' ? styles.msgAdmin : styles.msgUser}`}>
                      <span className={styles.msgFrom}>{m.from === 'admin' ? '🛡️ Soporte' : '👤 Tú'}</span>
                      <span className={styles.msgText}>{m.text}</span>
                      <span className={styles.msgDate}>{m.date}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.ticketFooter}>
                  <span className={styles.ticketDate}>📅 {t.date}</span>
                  {hasReply && <span className={styles.replyBadge}>💬 Con respuesta</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* New ticket form */}
      {tab === 'new' && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Categoría *</label>
            <select value={form.category} onChange={e => setF('category', e.target.value)} required>
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label>Juego relacionado (opcional)</label>
            <select value={form.gameId} onChange={e => setF('gameId', e.target.value)}>
              <option value="">Ninguno</option>
              {games.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label>Asunto *</label>
            <input type="text" value={form.subject}
              onChange={e => setF('subject', e.target.value)}
              placeholder="Describe brevemente el problema" required />
          </div>

          <div className={styles.field}>
            <label>Mensaje *</label>
            <textarea value={form.message}
              onChange={e => setF('message', e.target.value)}
              placeholder="Explica con detalle qué ocurrió, pasos para reproducir el problema, etc."
              rows={5} required />
          </div>

          <div className={styles.field}>
            <label>Adjunto (captura de pantalla)</label>
            <DragDropArea file={attachment} onChange={setAttachment} />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.btnCancel} onClick={() => setTab('tickets')}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnSubmit} disabled={submitting}>
              {submitting
                ? <span className={styles.spinner} />
                : '📨 Enviar Ticket'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
