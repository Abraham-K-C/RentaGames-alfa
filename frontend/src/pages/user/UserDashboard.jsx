import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { ToastProvider } from '../../components/shared/Toast'
import ServiceStatus from '../../components/shared/ServiceStatus'
import StorePage from './StorePage'
import LibraryPage from './LibraryPage'
import PaymentsPage from './PaymentsPage'
import UserSupport from './UserSupport'
import GameDetail from './GameDetail'
import styles from './UserDashboard.module.css'

const NAV = [
  { id: 'store',    icon: '🏪', label: 'Tienda' },
  { id: 'library',  icon: '📚', label: 'Biblioteca' },
  { id: 'payments', icon: '💳', label: 'Pagos' },
  { id: 'support',  icon: '🎫', label: 'Soporte' },
]

export default function UserDashboard() {
  const [section, setSection] = useState('store')
  const [selectedGame, setSelectedGame] = useState(null)
  const { currentUser, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const openGame = (game) => setSelectedGame(game)
  const closeGame = () => setSelectedGame(null)

  return (
    <ToastProvider>
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.brand}>🎮 <span>GamesRental</span></div>
          <nav className={styles.nav}>
            {NAV.map(n => (
              <button key={n.id}
                className={`${styles.navItem} ${section === n.id && !selectedGame ? styles.active : ''}`}
                onClick={() => { setSection(n.id); closeGame() }}>
                {n.icon} {n.label}
              </button>
            ))}
          </nav>
          <div className={styles.userArea}>
            <ServiceStatus />
            <img src={currentUser?.avatar} alt="" className={styles.avatar} />
            <span className={styles.userName}>{currentUser?.name}</span>
            <button className={styles.btnLogout} onClick={handleLogout}>Salir</button>
          </div>
        </header>

        <main className={styles.main}>
          {selectedGame ? (
            <GameDetail game={selectedGame} onBack={closeGame} />
          ) : (
            <>
              {section === 'store' && <StorePage onGameClick={openGame} />}
              {section === 'library' && <LibraryPage onGameClick={openGame} />}
              {section === 'payments' && <PaymentsPage />}
              {section === 'support' && <UserSupport />}
            </>
          )}
        </main>
      </div>
    </ToastProvider>
  )
}
