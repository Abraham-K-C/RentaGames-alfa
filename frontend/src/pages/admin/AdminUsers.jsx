import React, { useState } from 'react'
import { useStore } from '../../store/useStore'
import Modal from '../../components/shared/Modal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import { useToast } from '../../components/shared/Toast'
import styles from './AdminUsers.module.css'

function UserForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { name: '', username: '', email: '', password: '', role: 'user' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }} className={styles.form}>
      {[['Nombre', 'name', 'text'], ['Usuario', 'username', 'text'], ['Email', 'email', 'email'], ['Contraseña', 'password', 'password']].map(([label, key, type]) => (
        <div key={key} className={styles.field}>
          <label>{label}</label>
          <input type={type} value={form[key] || ''} onChange={e => set(key, e.target.value)} required={!initial || key !== 'password'} placeholder={initial && key === 'password' ? 'Dejar vacío para no cambiar' : ''} />
        </div>
      ))}
      <div className={styles.field}>
        <label>Rol</label>
        <select value={form.role} onChange={e => set('role', e.target.value)}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className={styles.formActions}>
        <button type="button" className={styles.btnCancel} onClick={onClose}>Cancelar</button>
        <button type="submit" className={styles.btnSave}>💾 Guardar</button>
      </div>
    </form>
  )
}

function UserDetail({ user, onClose }) {
  const { games, reviews, payments } = useStore()
  const userGames = games.filter(g => user.libraryIds.includes(g.id))
  const userReviews = reviews.filter(r => user.reviewIds.includes(r.id))
  const userPayments = payments.filter(p => user.paymentIds.includes(p.id))

  return (
    <div className={styles.detail}>
      <div className={styles.detailHeader}>
        <img src={user.avatar} alt="" className={styles.detailAvatar} />
        <div>
          <div className={styles.detailName}>{user.name}</div>
          <div className={styles.detailMeta}>@{user.username} · {user.email}</div>
          <span className={`${styles.badge} ${user.status === 'banned' ? styles.banned : styles.active}`}>{user.status}</span>
        </div>
      </div>

      <div className={styles.detailSections}>
        <section>
          <h4 className={styles.sectionTitle}>🎮 Biblioteca ({userGames.length} juegos)</h4>
          {userGames.length === 0 ? <p className={styles.empty}>Sin juegos</p> : (
            <div className={styles.gameList}>
              {userGames.map(g => <span key={g.id} className={styles.gameChip}>{g.title}</span>)}
            </div>
          )}
        </section>

        <section>
          <h4 className={styles.sectionTitle}>⭐ Reseñas ({userReviews.length})</h4>
          {userReviews.length === 0 ? <p className={styles.empty}>Sin reseñas</p> : userReviews.map(r => {
            const game = games.find(g => g.id === r.gameId)
            return (
              <div key={r.id} className={styles.reviewItem}>
                <span className={styles.reviewGame}>{game?.title}</span>
                <span className={styles.reviewStars}>{'★'.repeat(r.rating)}</span>
                <p className={styles.reviewText}>{r.text}</p>
              </div>
            )
          })}
        </section>

        <section>
          <h4 className={styles.sectionTitle}>💳 Pagos ({userPayments.length})</h4>
          {userPayments.length === 0 ? <p className={styles.empty}>Sin pagos</p> : userPayments.map(p => {
            const game = games.find(g => g.id === p.gameId)
            return (
              <div key={p.id} className={styles.paymentItem}>
                <span>{game?.title}</span>
                <span className={styles.paymentAmount}>${p.amount}</span>
                <span className={styles.paymentDate}>{p.date}</span>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default function AdminUsers() {
  const { users, addUser, updateUser, deleteUser, banUser } = useStore()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // null | {type: 'create'|'edit'|'detail'|'delete'|'ban', user?}

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = (form) => {
    addUser(form)
    toast('Usuario creado correctamente', 'success')
    setModal(null)
  }

  const handleEdit = (form) => {
    const data = { ...form }
    if (!data.password) delete data.password
    updateUser(modal.user.id, data)
    toast('Usuario actualizado', 'success')
    setModal(null)
  }

  const handleDelete = () => {
    deleteUser(modal.user.id)
    toast('Usuario eliminado', 'error')
    setModal(null)
  }

  const handleBan = () => {
    banUser(modal.user.id)
    const u = users.find(u => u.id === modal.user.id)
    toast(u?.status === 'banned' ? 'Usuario reactivado' : 'Usuario suspendido', 'info')
    setModal(null)
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Control de Usuarios</h2>
          <p className={styles.subtitle}>{users.length} usuarios registrados</p>
        </div>
        <button className={styles.btnCreate} onClick={() => setModal({ type: 'create' })}>+ Crear Usuario</button>
      </div>

      <input className={styles.search} placeholder="Buscar usuarios..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Usuario</span><span>Email</span><span>Rol</span><span>Estado</span><span>Registro</span><span>Acciones</span>
        </div>
        {filtered.map(u => (
          <div key={u.id} className={styles.tableRow}>
            <div className={styles.userCell}>
              <img src={u.avatar} alt="" className={styles.rowAvatar} />
              <div>
                <div className={styles.rowName}>{u.name}</div>
                <div className={styles.rowUsername}>@{u.username}</div>
              </div>
            </div>
            <span className={styles.cell}>{u.email}</span>
            <span className={styles.cell}><span className={`${styles.role} ${u.role === 'admin' ? styles.roleAdmin : styles.roleUser}`}>{u.role}</span></span>
            <span className={styles.cell}><span className={`${styles.badge} ${u.status === 'banned' ? styles.banned : styles.active}`}>{u.status}</span></span>
            <span className={styles.cell}>{u.createdAt}</span>
            <div className={styles.actions}>
              <button className={styles.btnInfo} onClick={() => setModal({ type: 'detail', user: u })}>👁</button>
              <button className={styles.btnEdit} onClick={() => setModal({ type: 'edit', user: u })}>✏️</button>
              <button className={styles.btnBan} onClick={() => setModal({ type: 'ban', user: u })}>
                {u.status === 'banned' ? '✅' : '🚫'}
              </button>
              <button className={styles.btnDelete} onClick={() => setModal({ type: 'delete', user: u })}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {modal?.type === 'create' && (
        <Modal title="Crear Usuario" onClose={() => setModal(null)}>
          <UserForm onSave={handleCreate} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'edit' && (
        <Modal title="Editar Usuario" onClose={() => setModal(null)}>
          <UserForm initial={modal.user} onSave={handleEdit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'detail' && (
        <Modal title="Historial de Actividad" onClose={() => setModal(null)} size="lg">
          <UserDetail user={modal.user} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'delete' && (
        <ConfirmDialog
          title="Eliminar Usuario"
          message={`¿Eliminar a "${modal.user.name}" permanentemente? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete} onCancel={() => setModal(null)} />
      )}
      {modal?.type === 'ban' && (
        <ConfirmDialog
          title={modal.user.status === 'banned' ? 'Reactivar Usuario' : 'Suspender Usuario'}
          message={`¿${modal.user.status === 'banned' ? 'Reactivar' : 'Suspender'} la cuenta de "${modal.user.name}"?`}
          onConfirm={handleBan} onCancel={() => setModal(null)} danger={modal.user.status !== 'banned'} />
      )}
    </div>
  )
}
