import React, { useState } from 'react'
import Modal from './Modal'
import styles from './PaymentGateway.module.css'

const METHODS = [
  { id: 'card', label: 'Tarjeta', icon: '💳' },
  { id: 'yape', label: 'Yape', icon: '🟣' },
  { id: 'plin', label: 'Plin', icon: '🔵' },
]

function formatCardNumber(v) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(v) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? `${d.slice(0,2)}/${d.slice(2)}` : d
}

function CardForm({ onPay, loading }) {
  const [form, setForm] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (form.number.replace(/\s/g,'').length < 16) e.number = 'Número inválido'
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Formato MM/AA'
    if (form.cvv.length < 3) e.cvv = 'CVV inválido'
    if (!form.name.trim()) e.name = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onPay('Tarjeta de Crédito')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.cardForm}>
      <div className={styles.cardPreview}>
        <div className={styles.cardChip}>▮▮</div>
        <div className={styles.cardNumber}>{form.number || '•••• •••• •••• ••••'}</div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>TITULAR<br /><b>{form.name || '—'}</b></span>
          <span className={styles.cardLabel}>EXPIRA<br /><b>{form.expiry || 'MM/AA'}</b></span>
        </div>
      </div>

      <div className={styles.field}>
        <label>Número de tarjeta</label>
        <input placeholder="1234 5678 9012 3456" value={form.number}
          onChange={e => setForm(f => ({ ...f, number: formatCardNumber(e.target.value) }))}
          className={errors.number ? styles.inputError : ''} />
        {errors.number && <span className={styles.error}>{errors.number}</span>}
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label>Fecha de expiración</label>
          <input placeholder="MM/AA" value={form.expiry}
            onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
            className={errors.expiry ? styles.inputError : ''} />
          {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
        </div>
        <div className={styles.field}>
          <label>CVV</label>
          <input placeholder="123" maxLength={4} value={form.cvv}
            onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/,'').slice(0,4) }))}
            className={errors.cvv ? styles.inputError : ''} type="password" />
          {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
        </div>
      </div>
      <div className={styles.field}>
        <label>Nombre del titular</label>
        <input placeholder="NOMBRE APELLIDO" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value.toUpperCase() }))}
          className={errors.name ? styles.inputError : ''} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <button type="submit" className={styles.btnPay} disabled={loading}>
        {loading ? <span className={styles.spinner} /> : '🔒 Pagar con Tarjeta'}
      </button>
    </form>
  )
}

function YapeForm({ onPay, loading }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (phone.replace(/\D/,'').length < 9) e.phone = 'Número inválido'
    if (code.length < 4) e.code = 'Código inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onPay('Yape')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.mobileForm}>
      <div className={styles.yapeBrand}>
        <div className={styles.yapeLogo}>Y</div>
        <span>Yape</span>
      </div>
      <div className={styles.qrBox}>
        <div className={styles.qr}>
          {/* SVG QR simulado */}
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="#fff"/>
            {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
              const on = ((r+c) % 2 === 0) || (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3)
              return on ? <rect key={`${r}-${c}`} x={c*16+4} y={r*16+4} width={12} height={12} fill="#6b21a8" rx={2}/> : null
            }))}
          </svg>
        </div>
        <p className={styles.qrHint}>Escanea con tu app Yape</p>
      </div>
      <p className={styles.divider}>— o ingresa tu número —</p>
      <div className={styles.field}>
        <label>Número de celular</label>
        <input placeholder="9XX XXX XXX" value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/,'').slice(0,9))}
          className={errors.phone ? styles.inputError : ''} />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>
      <div className={styles.field}>
        <label>Código de aprobación Yape</label>
        <input placeholder="####" value={code}
          onChange={e => setCode(e.target.value.replace(/\D/,'').slice(0,6))}
          className={errors.code ? styles.inputError : ''} />
        {errors.code && <span className={styles.error}>{errors.code}</span>}
      </div>
      <button type="submit" className={`${styles.btnPay} ${styles.btnYape}`} disabled={loading}>
        {loading ? <span className={styles.spinner} /> : '🟣 Confirmar con Yape'}
      </button>
    </form>
  )
}

function PlinForm({ onPay, loading }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (phone.replace(/\D/,'').length < 9) e.phone = 'Número inválido'
    if (code.length < 4) e.code = 'Código inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onPay('Plin')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.mobileForm}>
      <div className={styles.plinBrand}>
        <div className={styles.plinLogo}>P</div>
        <span>Plin</span>
      </div>
      <div className={styles.qrBox}>
        <div className={`${styles.qr} ${styles.qrPlin}`}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="#fff"/>
            {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
              const on = ((r*c) % 3 === 0) || (r === 0) || (c === 6) || (r === 6)
              return on ? <rect key={`${r}-${c}`} x={c*16+4} y={r*16+4} width={12} height={12} fill="#0066cc" rx={2}/> : null
            }))}
          </svg>
        </div>
        <p className={styles.qrHint}>Escanea con tu app Plin</p>
      </div>
      <p className={styles.divider}>— o ingresa tu número —</p>
      <div className={styles.field}>
        <label>Número de celular</label>
        <input placeholder="9XX XXX XXX" value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/,'').slice(0,9))}
          className={errors.phone ? styles.inputError : ''} />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>
      <div className={styles.field}>
        <label>Código de transferencia Plin</label>
        <input placeholder="####" value={code}
          onChange={e => setCode(e.target.value.replace(/\D/,'').slice(0,6))}
          className={errors.code ? styles.inputError : ''} />
        {errors.code && <span className={styles.error}>{errors.code}</span>}
      </div>
      <button type="submit" className={`${styles.btnPay} ${styles.btnPlin}`} disabled={loading}>
        {loading ? <span className={styles.spinner} /> : '🔵 Confirmar con Plin'}
      </button>
    </form>
  )
}

export default function PaymentGateway({ game, pricing, onSuccess, onClose }) {
  const [method, setMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlePay = (methodName) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        onSuccess(methodName)
      }, 1500)
    }, 1800)
  }

  return (
    <Modal title="Pasarela de Pago" onClose={onClose} size="md">
      {success ? (
        <div className={styles.successScreen}>
          <div className={styles.successIcon}>✓</div>
          <h3>¡Pago exitoso!</h3>
          <p>"{game.title}" fue añadido a tu biblioteca.</p>
        </div>
      ) : (
        <div className={styles.gateway}>
          <div className={styles.orderSummary}>
            <img src={game.image} alt={game.title} className={styles.gameThumb} onError={e => e.target.style.display='none'} />
            <div className={styles.orderInfo}>
              <div className={styles.orderTitle}>{game.title}</div>
              <div className={styles.orderPrice}>
                {pricing.originalPrice && (
                  <span className={styles.originalPrice}>${pricing.originalPrice}</span>
                )}
                <span className={styles.finalPrice}>${pricing.price}</span>
                {pricing.discount > 0 && (
                  <span className={styles.discountBadge}>-{pricing.discount}%</span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.methodTabs}>
            {METHODS.map(m => (
              <button key={m.id}
                className={`${styles.tab} ${method === m.id ? styles.tabActive : ''}`}
                onClick={() => setMethod(m.id)}>
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          <div className={styles.methodBody}>
            {method === 'card' && <CardForm onPay={handlePay} loading={loading} />}
            {method === 'yape' && <YapeForm onPay={handlePay} loading={loading} />}
            {method === 'plin' && <PlinForm onPay={handlePay} loading={loading} />}
          </div>
        </div>
      )}
    </Modal>
  )
}
