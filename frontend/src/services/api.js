/**
 * Capa de integración con los microservicios de GamesRental.
 * Todas las peticiones pasan por el proxy de Vite (/api/*)
 * que las redirige al microservicio correspondiente.
 *
 * Puertos reales (configurados en vite.config.js):
 *   /api/usuarios   → localhost:8081
 *   /api/catalogo   → localhost:8084
 *   /api/biblioteca → localhost:8083
 *   /api/pagos      → localhost:8087
 *   /api/resenas    → localhost:8089
 *   /api/ofertas    → localhost:8086
 *   /api/soporte    → localhost:8090
 *   /api/renta      → localhost:8088
 */

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`HTTP ${res.status}: ${text}`)
  }
  // 204 No Content
  if (res.status === 204) return null
  return res.json()
}

const get    = (url)        => fetch(url).then(handleResponse)
const post   = (url, body)  => fetch(url, { method: 'POST',   headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(handleResponse)
const put    = (url, body)  => fetch(url, { method: 'PUT',    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(handleResponse)
const del    = (url)        => fetch(url, { method: 'DELETE' }).then(handleResponse)

// ─── Catálogo (/api/catalogo → :8084) ───────────────────────────────────────
export const catalogoApi = {
  listar:     ()         => get('/api/catalogo'),
  buscar:     (id)       => get(`/api/catalogo/${id}`),
  crear:      (juego)    => post('/api/catalogo', juego),
  actualizar: (id, data) => put(`/api/catalogo/${id}`, data),
  eliminar:   (id)       => del(`/api/catalogo/${id}`),
}

// ─── Usuarios (/api/usuarios → :8081) ───────────────────────────────────────
export const usuarioApi = {
  listar:     ()           => get('/api/usuarios'),
  buscar:     (id)         => get(`/api/usuarios/${id}`),
  crear:      (usuario)    => post('/api/usuarios', usuario),
  actualizar: (id, data)   => put(`/api/usuarios/${id}`, data),
  eliminar:   (id)         => del(`/api/usuarios/${id}`),
}

// ─── Biblioteca (/api/biblioteca → :8083) ────────────────────────────────────
export const bibliotecaApi = {
  listar:     ()            => get('/api/biblioteca'),
  buscar:     (id)          => get(`/api/biblioteca/${id}`),
  crear:      (entrada)     => post('/api/biblioteca', entrada),
  actualizar: (id, data)    => put(`/api/biblioteca/${id}`, data),
  eliminar:   (id)          => del(`/api/biblioteca/${id}`),
}

// ─── Pagos (/api/pagos → :8087) ─────────────────────────────────────────────
export const pagosApi = {
  listar:     ()         => get('/api/pagos'),
  buscar:     (id)       => get(`/api/pagos/${id}`),
  crear:      (pago)     => post('/api/pagos', pago),
  actualizar: (id, data) => put(`/api/pagos/${id}`, data),
  eliminar:   (id)       => del(`/api/pagos/${id}`),
}

// ─── Reseñas (/api/resenas → :8089) ─────────────────────────────────────────
export const resenasApi = {
  listar:     ()          => get('/api/resenas'),
  buscar:     (id)        => get(`/api/resenas/${id}`),
  crear:      (resena)    => post('/api/resenas', resena),
  actualizar: (id, data)  => put(`/api/resenas/${id}`, data),
  eliminar:   (id)        => del(`/api/resenas/${id}`),
}

// ─── Ofertas (/api/ofertas → :8086) ─────────────────────────────────────────
export const ofertasApi = {
  listar:     ()          => get('/api/ofertas'),
  buscar:     (id)        => get(`/api/ofertas/${id}`),
  crear:      (oferta)    => post('/api/ofertas', oferta),
  actualizar: (id, data)  => put(`/api/ofertas/${id}`, data),
  eliminar:   (id)        => del(`/api/ofertas/${id}`),
}

// ─── Soporte (/api/soporte → :8090) ─────────────────────────────────────────
export const soporteApi = {
  listar:     ()           => get('/api/soporte'),
  buscar:     (id)         => get(`/api/soporte/${id}`),
  crear:      (ticket)     => post('/api/soporte', ticket),
  actualizar: (id, data)   => put(`/api/soporte/${id}`, data),
  eliminar:   (id)         => del(`/api/soporte/${id}`),
}

// ─── Renta (/api/renta → :8088) ─────────────────────────────────────────────
export const rentaApi = {
  listar:     ()         => get('/api/renta'),
  buscar:     (id)       => get(`/api/renta/${id}`),
  crear:      (renta)    => post('/api/renta', renta),
  actualizar: (id, data) => put(`/api/renta/${id}`, data),
  eliminar:   (id)       => del(`/api/renta/${id}`),
}
