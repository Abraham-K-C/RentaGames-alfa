import { create } from 'zustand'
import { MOCK_GAMES, MOCK_USERS, MOCK_REVIEWS, MOCK_PAYMENTS, MOCK_OFFERS, MOCK_TICKETS } from '../data/mockData'

export const useStore = create((set, get) => ({
  // Auth
  currentUser: null,
  login: (username, password) => {
    const user = get().users.find(u => u.username === username && u.password === password)
    if (!user) return false
    if (user.status === 'banned') return 'banned'
    set({ currentUser: user })
    return user.role
  },
  logout: () => set({ currentUser: null }),

  // Games (Catálogo)
  games: [...MOCK_GAMES],
  addGame: (game) => set(s => ({ games: [...s.games, { ...game, id: Date.now() }] })),
  updateGame: (id, data) => set(s => ({ games: s.games.map(g => g.id === id ? { ...g, ...data } : g) })),
  deleteGame: (id) => set(s => ({
    games: s.games.filter(g => g.id !== id),
    users: s.users.map(u => ({ ...u, libraryIds: u.libraryIds.filter(lid => lid !== id) })),
    offers: s.offers.filter(o => o.gameId !== id),
  })),

  // Offers
  offers: [...MOCK_OFFERS],
  addOffer: (offer) => set(s => ({ offers: [...s.offers, { ...offer, id: Date.now() }] })),
  updateOffer: (id, data) => set(s => ({ offers: s.offers.map(o => o.id === id ? { ...o, ...data } : o) })),
  deleteOffer: (id) => set(s => ({ offers: s.offers.filter(o => o.id !== id) })),
  expireOffer: (id) => set(s => ({ offers: s.offers.filter(o => o.id !== id) })),

  // Helper: get effective price for a game (applies active offer)
  getEffectivePrice: (gameId) => {
    const { games, offers } = get()
    const game = games.find(g => g.id === gameId)
    if (!game) return null
    const offer = offers.find(o => o.gameId === gameId && o.expiresAt > Date.now())
    if (!offer) return { price: game.price, originalPrice: null, discount: 0 }
    const discounted = +(game.price * (1 - offer.discount / 100)).toFixed(2)
    return { price: discounted, originalPrice: game.price, discount: offer.discount, offer }
  },

  // Users
  users: [...MOCK_USERS],
  addUser: (user) => set(s => ({
    users: [...s.users, { ...user, id: Date.now(), libraryIds: [], reviewIds: [], paymentIds: [], createdAt: new Date().toISOString().split('T')[0] }]
  })),
  updateUser: (id, data) => set(s => ({
    users: s.users.map(u => u.id === id ? { ...u, ...data } : u),
    currentUser: s.currentUser?.id === id ? { ...s.currentUser, ...data } : s.currentUser,
  })),
  deleteUser: (id) => set(s => ({ users: s.users.filter(u => u.id !== id) })),
  banUser: (id) => set(s => ({ users: s.users.map(u => u.id === id ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u) })),

  // Library / Buy
  buyGame: (gameId, method) => {
    const { currentUser, games, getEffectivePrice } = get()
    if (!currentUser) return
    const game = games.find(g => g.id === gameId)
    if (!game) return
    const pricing = getEffectivePrice(gameId)
    const payment = {
      id: Date.now(), userId: currentUser.id, gameId,
      amount: pricing.price,
      originalAmount: pricing.originalPrice,
      discount: pricing.discount,
      method: method || 'Tarjeta de Crédito',
      status: 'completado', date: new Date().toISOString().split('T')[0],
    }
    set(s => ({
      payments: [...s.payments, payment],
      users: s.users.map(u => u.id === currentUser.id
        ? { ...u, libraryIds: [...u.libraryIds, gameId], paymentIds: [...u.paymentIds, payment.id] }
        : u
      ),
      currentUser: {
        ...currentUser,
        libraryIds: [...currentUser.libraryIds, gameId],
        paymentIds: [...currentUser.paymentIds, payment.id],
      },
    }))
  },

  // Reviews
  reviews: [...MOCK_REVIEWS],
  addReview: (review) => {
    const { currentUser } = get()
    const newReview = { ...review, id: Date.now(), userId: currentUser.id, createdAt: new Date().toISOString().split('T')[0] }
    set(s => ({
      reviews: [...s.reviews, newReview],
      users: s.users.map(u => u.id === currentUser.id ? { ...u, reviewIds: [...u.reviewIds, newReview.id] } : u),
      currentUser: { ...currentUser, reviewIds: [...currentUser.reviewIds, newReview.id] },
    }))
  },
  updateReview: (id, data) => set(s => ({ reviews: s.reviews.map(r => r.id === id ? { ...r, ...data } : r) })),
  deleteReview: (id) => {
    const { currentUser } = get()
    set(s => ({
      reviews: s.reviews.filter(r => r.id !== id),
      users: s.users.map(u => ({ ...u, reviewIds: u.reviewIds.filter(rid => rid !== id) })),
      currentUser: currentUser ? { ...currentUser, reviewIds: currentUser.reviewIds.filter(rid => rid !== id) } : null,
    }))
  },

  // Payments
  payments: [...MOCK_PAYMENTS],

  // Support Tickets
  tickets: [...MOCK_TICKETS],

  addTicket: (ticket) => {
    const { currentUser } = get()
    const newTicket = {
      ...ticket,
      id: Date.now(),
      userId: currentUser.id,
      status: 'pendiente',
      date: new Date().toISOString().split('T')[0],
      messages: [{
        from: 'user',
        text: ticket.message,
        date: new Date().toLocaleString('es-PE'),
      }],
    }
    set(s => ({ tickets: [...s.tickets, newTicket] }))
  },

  addTicketMessage: (ticketId, text, from = 'admin') => {
    const msg = { from, text, date: new Date().toLocaleString('es-PE') }
    set(s => ({
      tickets: s.tickets.map(t =>
        t.id === ticketId
          ? { ...t, messages: [...t.messages, msg], status: from === 'admin' ? 'en proceso' : t.status }
          : t
      ),
    }))
  },

  updateTicketStatus: (ticketId, status) =>
    set(s => ({ tickets: s.tickets.map(t => t.id === ticketId ? { ...t, status } : t) })),

  // Approve refund: marks ticket resolved, payment refunded, removes game from library
  approveRefund: (ticketId) => {
    const { tickets, payments, users, currentUser } = get()
    const ticket = tickets.find(t => t.id === ticketId)
    if (!ticket) return

    set(s => ({
      // Ticket → resuelto
      tickets: s.tickets.map(t =>
        t.id === ticketId ? { ...t, status: 'resuelto' } : t
      ),
      // Payment → reembolsado
      payments: s.payments.map(p =>
        p.userId === ticket.userId && p.gameId === ticket.gameId
          ? { ...p, status: 'reembolsado' }
          : p
      ),
      // Remove game from user library
      users: s.users.map(u =>
        u.id === ticket.userId
          ? { ...u, libraryIds: u.libraryIds.filter(id => id !== ticket.gameId) }
          : u
      ),
      // Also update currentUser if they are the affected user
      currentUser:
        s.currentUser?.id === ticket.userId
          ? { ...s.currentUser, libraryIds: s.currentUser.libraryIds.filter(id => id !== ticket.gameId) }
          : s.currentUser,
    }))
  },
}))
