import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserDashboard from './pages/user/UserDashboard'

function ProtectedRoute({ children, requiredRole }) {
  const currentUser = useStore(s => s.currentUser)
  if (!currentUser) return <Navigate to="/" replace />
  if (requiredRole && currentUser.role !== requiredRole) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const currentUser = useStore(s => s.currentUser)

  return (
    <Routes>
      <Route path="/" element={
        currentUser
          ? <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} replace />
          : <LoginPage />
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/dashboard/*" element={
        <ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
