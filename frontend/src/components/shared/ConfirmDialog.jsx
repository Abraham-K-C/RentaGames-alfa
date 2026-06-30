import React from 'react'
import Modal from './Modal'
import styles from './ConfirmDialog.module.css'

export default function ConfirmDialog({ title, message, onConfirm, onCancel, danger = true }) {
  return (
    <Modal title={title} onClose={onCancel} size="sm">
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button className={styles.btnCancel} onClick={onCancel}>Cancelar</button>
        <button className={`${styles.btnConfirm} ${danger ? styles.danger : styles.primary}`} onClick={onConfirm}>
          {danger ? '🗑️ Confirmar' : '✓ Confirmar'}
        </button>
      </div>
    </Modal>
  )
}
