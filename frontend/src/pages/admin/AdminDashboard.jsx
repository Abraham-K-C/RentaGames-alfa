import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { ToastProvider } from '../../components/shared/Toast'
import ServiceStatus from '../../components/shared/ServiceStatus'
import AdminUsers from './AdminUsers'
import AdminCatalog from './AdminCatalog'
import AdminOffers from './AdminOffers'
import AdminReviews from './AdminReviews'
import AdminPaymentsGlobal from './AdminPaymentsGlobal'
import AdminSupport from './AdminSupport'
import styles from './AdminDashboard.module.css'

const NAV = [
  { id: 'users',    icon: '👥', label: 'Usuarios' },
  { id: 'catalog',  icon: '🎮', label: 'Catálogo' },
  { id: 'offers',   icon: '🏷️', label: 'Ofertas' },
  { id: 'reviews',  icon: '⭐', label: 'Reseñas' },
  { id: 'payments', icon: '💰', label: 'Finanzas' },
  { id: 'support',  icon: '🎫', label: 'Soporte' },
]

export default function AdminDashboard() {
  const [section, setSection] = useState('users')
  const { currentUser, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <ToastProvider>
      <div className={styles.root}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <div className={styles.brand}>🎮 <span>GamesRental</span></div>
            <div className={styles.adminBadge}>🛡️ Panel Admin</div>
          </div>
          <nav className={styles.nav}>
            {NAV.map(n => (
              <button key={n.id}
                className={`${styles.navItem} ${section === n.id ? styles.active : ''}`}
                onClick={() => setSection(n.id)}>
                <span>{n.icon}</span> {n.label}
              </button>
            ))}
          </nav>
          <div className={styles.sidebarBottom}>
            <div className={styles.userInfo}>
              <img src={currentUser?.avatar} alt="" className={styles.avatar} />
              <div>
                <div className={styles.userName}>{currentUser?.name}</div>
                <div className={styles.userRole}>Administrador</div>
              </div>
            </div>
            <button className={styles.btnLogout} onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </aside>
        <main className={styles.main}>
          {section === 'users'    && <AdminUsers />}
          {section === 'catalog'  && <AdminCatalog />}
          {section === 'offers'   && <AdminOffers />}
          {section === 'reviews'  && <AdminReviews />}
          {section === 'payments' && <AdminPaymentsGlobal />}
          {section === 'support'  && <AdminSupport />}
        </main>
      </div>
    </ToastProvider>
  )
}
