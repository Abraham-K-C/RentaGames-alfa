import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useStore(s => s.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleQuickLogin = (u, p) => { setUsername(u); setPassword(p); setError('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(username, password)
      setLoading(false)
      if (result === false) return setError('Credenciales incorrectas. Intenta de nuevo.')
      if (result === 'banned') return setError('Tu cuenta ha sido suspendida.')
      navigate(result === 'admin' ? '/admin' : '/dashboard')
    }, 800)
  }

  return (
    <div className={styles.root}>
      <div className={styles.bg}>
        <div className={styles.bgOverlay} />
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`,
            width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px`,
          }} />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎮</span>
          <h1 className={styles.logoText}>GamesRental</h1>
          <p className={styles.logoSub}>Tu plataforma de videojuegos</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Usuario</label>
            <input className={styles.input} type="text" value={username}
              onChange={e => setUsername(e.target.value)} placeholder="Ingresa tu usuario" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input className={styles.input} type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" required />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.btnLogin} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Iniciar Sesión'}
          </button>
        </form>

        <div className={styles.quickAccess}>
          <p className={styles.quickTitle}>Acceso rápido (Demo)</p>
          <div className={styles.quickBtns}>
            <button className={`${styles.quickBtn} ${styles.quickAdmin}`}
              onClick={() => handleQuickLogin('admin', 'admin123')}>
              🛡️ Admin
            </button>
            <button className={`${styles.quickBtn} ${styles.quickUser}`}
              onClick={() => handleQuickLogin('user1', 'user123')}>
              👤 Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
