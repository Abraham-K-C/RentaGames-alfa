import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import { useToast } from '../../components/shared/Toast'
import styles from './AdminSupport.module.css'

const STATUS_META = {
  pendiente:   { label: 'Pendiente',   cls: 'pending'    },
  'en proceso':{ label: 'En Proceso',  cls: 'inprogress' },
  resuelto:    { label: 'Resuelto',    cls: 'resolved'   },
}

const CATEGORY_ICON = {
  'Solicitud de Reembolso': '💸',
  'Error Técnico':          '⚙️',
  'Problema con Yape/Plin': '📱',
}

function ChatDrawer({ ticket, onClose }) {
  const { users, games, addTicketMessage, approveRefund, updateTicketStatus } = useStore()
  const toast = useToast()
  const [msg, setMsg] = useState('')
  const [confirmRefund, setConfirmRefund] = useState(false)
  const bottomRef = useRef(null)

  const author = users.find(u => u.id === ticket.userId)
  const game   = games.find(g => g.id === ticket.gameId)
  const isRefund = ticket.category === 'Solicitud de Reembolso'
  const isResolved = ticket.status === 'resuelto'

  // Sync latest ticket from store on every render
  const { tickets } = useStore()
  const liveTicket = tickets.find(t => t.id === ticket.id) || ticket

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [liveTicket.messages.length])

  const handleSend = (e) => {
    e.preventDefault()
    if (!msg.trim()) return
    addTicketMessage(liveTicket.id, msg.trim(), 'admin')
    setMsg('')
  }

  const handleApproveRefund = () => {
    approveRefund(liveTicket.id)
    toast(`Reembolso aprobado para "${game?.title}". Juego removido de la biblioteca del usuario.`, 'success')
    setConfirmRefund(false)
  }

  const handleMarkResolved = () => {
    updateTicketStatus(liveTicket.id, 'resuelto')
    toast('Ticket marcado como resuelto', 'success')
  }

  return (
    <>
      <div className={styles.drawerOverlay} onClick={onClose} />
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerMeta}>
            <div className={styles.drawerUser}>
              <img src={author?.avatar} alt="" className={styles.drawerAvatar} />
              <div>
                <div className={styles.drawerUserName}>{author?.name}</div>
                <div className={styles.drawerSub}>{game?.title} · {liveTicket.category}</div>
              </div>
            </div>
            <StatusBadge status={liveTicket.status} />
          </div>
          <div className={styles.drawerSubject}>📌 {liveTicket.subject}</div>
          <button className={styles.drawerClose} onClick={onClose}>✕</button>
        </div>

        {/* Chat messages */}
        <div className={styles.chatBody}>
          {liveTicket.messages.map((m, i) => (
            <div key={i} className={`${styles.bubble} ${m.from === 'admin' ? styles.bubbleAdmin : styles.bubbleUser}`}>
              <div className={styles.bubbleFrom}>{m.from === 'admin' ? '🛡️ Soporte' : `👤 ${author?.name}`}</div>
              <div className={styles.bubbleText}>{m.text}</div>
              <div className={styles.bubbleDate}>{m.date}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Actions */}
        {!isResolved && (
          <div className={styles.drawerActions}>
            {isRefund && (
              <button className={styles.btnRefund} onClick={() => setConfirmRefund(true)}>
                💸 Aprobar Reembolso
              </button>
            )}
            <button className={styles.btnResolve} onClick={handleMarkResolved}>
              ✅ Marcar Resuelto
            </button>
          </div>
        )}

        {/* Reply input */}
        <form className={styles.replyForm} onSubmit={handleSend}>
          <input
            className={styles.replyInput}
            placeholder="Escribe una respuesta..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
            disabled={isResolved}
          />
          <button type="submit" className={styles.btnSend} disabled={isResolved || !msg.trim()}>
            Enviar ➤
          </button>
        </form>
      </div>

      {confirmRefund && (
        <ConfirmDialog
          title="Aprobar Reembolso"
          message={`¿Aprobar el reembolso de "${game?.title}" para ${author?.name}? El juego será removido de su biblioteca y la transacción marcada como reembolsada.`}
          onConfirm={handleApproveRefund}
          onCancel={() => setConfirmRefund(false)}
          danger={false}
        />
      )}
    </>
  )
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pendiente
  return <span className={`${styles.badge} ${styles[meta.cls]}`}>{meta.label}</span>
}

export default function AdminSupport() {
  const { tickets, users, games } = useStore()
  const [activeTicket, setActiveTicket] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')

  const pending   = tickets.filter(t => t.status === 'pendiente').length
  const refunds   = tickets.filter(t => t.category === 'Solicitud de Reembolso' && t.status !== 'resuelto').length
  const avgTime   = '15 min'

  const filtered = tickets
    .filter(t => filterStatus === 'all' || t.status === filterStatus)
    .filter(t => {
      if (!search) return true
      const u = users.find(u => u.id === t.userId)
      const g = games.find(g => g.id === t.gameId)
      return u?.name.toLowerCase().includes(search.toLowerCase()) ||
             g?.title.toLowerCase().includes(search.toLowerCase()) ||
             t.subject.toLowerCase().includes(search.toLowerCase())
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  // Keep activeTicket reference fresh (store may have changed it)
  const { tickets: liveTickets } = useStore()
  const liveActive = activeTicket ? liveTickets.find(t => t.id === activeTicket.id) : null

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Panel de Soporte</h2>
          <p className={styles.subtitle}>Gestión de tickets y solicitudes de usuarios</p>
        </div>
      </div>

      {/* KPIs */}
      <div className={styles.kpiGrid}>
        <div className={`${styles.kpiCard} ${styles.kpiYellow}`}>
          <div className={styles.kpiIcon}>🎫</div>
          <div className={styles.kpiVal}>{pending}</div>
          <div className={styles.kpiLabel}>Tickets Pendientes</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.kpiRed}`}>
          <div className={styles.kpiIcon}>💸</div>
          <div className={styles.kpiVal}>{refunds}</div>
          <div className={styles.kpiLabel}>Solicitudes de Reembolso</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.kpiBlue}`}>
          <div className={styles.kpiIcon}>⚡</div>
          <div className={styles.kpiVal}>{avgTime}</div>
          <div className={styles.kpiLabel}>Tiempo de Respuesta Prom.</div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input className={styles.search} placeholder="Buscar tickets..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className={styles.statusFilter}>
          {['all', 'pendiente', 'en proceso', 'resuelto'].map(s => (
            <button key={s}
              className={`${styles.filterBtn} ${filterStatus === s ? styles.filterActive : ''}`}
              onClick={() => setFilterStatus(s)}>
              {s === 'all' ? 'Todos' : STATUS_META[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Usuario</span>
          <span>Categoría</span>
          <span>Asunto</span>
          <span>Estado</span>
          <span>Fecha</span>
          <span>Acción</span>
        </div>
        {filtered.length === 0 && (
          <div className={styles.empty}>No hay tickets que coincidan.</div>
        )}
        {filtered.map(t => {
          const user = users.find(u => u.id === t.userId)
          const game = games.find(g => g.id === t.gameId)
          return (
            <div key={t.id} className={styles.tableRow}>
              <div className={styles.userCell}>
                <img src={user?.avatar} alt="" className={styles.rowAvatar} onError={e => e.target.style.display='none'} />
                <div>
                  <div className={styles.rowName}>{user?.name || '—'}</div>
                  <div className={styles.rowSub}>{game?.title}</div>
                </div>
              </div>
              <div className={styles.catCell}>
                <span className={styles.catIcon}>{CATEGORY_ICON[t.category] || '📋'}</span>
                <span className={styles.catLabel}>{t.category}</span>
              </div>
              <div className={styles.subjectCell}>{t.subject}</div>
              <div><StatusBadge status={t.status} /></div>
              <div className={styles.cell}>{t.date}</div>
              <button className={styles.btnView} onClick={() => setActiveTicket(t)}>
                Ver / Responder
              </button>
            </div>
          )
        })}
      </div>

      {liveActive && (
        <ChatDrawer ticket={liveActive} onClose={() => setActiveTicket(null)} />
      )}
    </div>
  )
}
