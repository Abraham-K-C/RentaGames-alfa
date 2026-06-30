export const MOCK_GAMES = [
  {
    id: 1, title: 'Cyberpunk 2077', genre: 'RPG', price: 59.99, rating: 4.2,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
    description: 'Un RPG de mundo abierto en un futuro distópico. Explora Night City.',
    developer: 'CD Projekt Red', releaseYear: 2020, tags: ['Acción', 'RPG', 'Mundo abierto'],
  },
  {
    id: 2, title: 'Elden Ring', genre: 'Action RPG', price: 49.99, rating: 4.9,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    description: 'Un action RPG de fantasía oscura creado por FromSoftware y George R.R. Martin.',
    developer: 'FromSoftware', releaseYear: 2022, tags: ['Acción', 'RPG', 'Difícil'],
  },
  {
    id: 3, title: 'Red Dead Redemption 2', genre: 'Aventura', price: 39.99, rating: 4.8,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg',
    description: 'Una épica historia del Viejo Oeste americano. Una aventura sin igual.',
    developer: 'Rockstar Games', releaseYear: 2018, tags: ['Aventura', 'Mundo abierto', 'Historia'],
  },
  {
    id: 4, title: 'Hogwarts Legacy', genre: 'RPG', price: 44.99, rating: 4.3,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg',
    description: 'Vive la experiencia del mundo mágico de Harry Potter en el siglo XIX.',
    developer: 'Avalanche Software', releaseYear: 2023, tags: ['RPG', 'Magia', 'Aventura'],
  },
  {
    id: 5, title: 'God of War', genre: 'Acción', price: 34.99, rating: 4.7,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg',
    description: 'Kratos y su hijo Atreus se adentran en la mitología nórdica.',
    developer: 'Santa Monica Studio', releaseYear: 2018, tags: ['Acción', 'Mitología', 'Historia'],
  },
  {
    id: 6, title: 'The Witcher 3', genre: 'RPG', price: 19.99, rating: 4.9,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg',
    description: 'Un juego de rol de mundo abierto con una narrativa magistral.',
    developer: 'CD Projekt Red', releaseYear: 2015, tags: ['RPG', 'Fantasía', 'Mundo abierto'],
  },
  {
    id: 7, title: 'Baldur\'s Gate 3', genre: 'RPG', price: 54.99, rating: 4.9,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
    description: 'Un RPG de rol profundo basado en Dungeons & Dragons.',
    developer: 'Larian Studios', releaseYear: 2023, tags: ['RPG', 'Turno', 'Fantasía'],
  },
  {
    id: 8, title: 'Starfield', genre: 'RPG', price: 39.99, rating: 3.8,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg',
    description: 'Explora el universo en el primer RPG espacial de Bethesda.',
    developer: 'Bethesda', releaseYear: 2023, tags: ['RPG', 'Espacio', 'Exploración'],
  },
];

export const MOCK_USERS = [
  {
    id: 1, username: 'admin', password: 'admin123', role: 'admin',
    name: 'Carlos Administrador', email: 'admin@gamesrental.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: '2024-01-15', status: 'active', libraryIds: [], reviewIds: [], paymentIds: [],
  },
  {
    id: 2, username: 'user1', password: 'user123', role: 'user',
    name: 'Ana García', email: 'ana@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    createdAt: '2024-03-10', status: 'active', libraryIds: [1, 2, 5], reviewIds: [1, 3], paymentIds: [1, 2],
  },
  {
    id: 3, username: 'user2', password: 'user123', role: 'user',
    name: 'Miguel Torres', email: 'miguel@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miguel',
    createdAt: '2024-04-22', status: 'active', libraryIds: [3, 6, 7], reviewIds: [2, 4], paymentIds: [3],
  },
  {
    id: 4, username: 'user3', password: 'user123', role: 'user',
    name: 'Laura Méndez', email: 'laura@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=laura',
    createdAt: '2024-05-01', status: 'banned', libraryIds: [2, 4], reviewIds: [5], paymentIds: [4],
  },
];

export const MOCK_REVIEWS = [
  { id: 1, gameId: 1, userId: 2, rating: 5, text: 'Una obra maestra. La historia y el mundo abierto son increíbles.', createdAt: '2024-06-01' },
  { id: 2, gameId: 3, userId: 3, rating: 5, text: 'El mejor juego de mundo abierto que he jugado en mi vida.', createdAt: '2024-06-05' },
  { id: 3, gameId: 2, userId: 2, rating: 4, text: 'Difícil pero muy gratificante. Recomendado 100%.', createdAt: '2024-06-10' },
  { id: 4, gameId: 6, userId: 3, rating: 5, text: 'Narrativa sin igual. El mejor RPG de todos los tiempos.', createdAt: '2024-06-12' },
  { id: 5, gameId: 4, userId: 4, rating: 4, text: 'Visualmente impresionante. El mundo mágico está perfectamente recreado.', createdAt: '2024-06-15' },
];

export const MOCK_PAYMENTS = [
  { id: 1, userId: 2, gameId: 1, amount: 59.99, method: 'Tarjeta de Crédito', status: 'completado', date: '2024-03-15' },
  { id: 2, userId: 2, gameId: 2, amount: 49.99, method: 'PayPal', status: 'completado', date: '2024-04-02' },
  { id: 3, userId: 3, gameId: 3, amount: 39.99, method: 'Tarjeta de Crédito', status: 'completado', date: '2024-05-10' },
  { id: 4, userId: 4, gameId: 4, amount: 44.99, method: 'Tarjeta de Débito', status: 'completado', date: '2024-05-20' },
];

// Ofertas: expiresAt en ms (epoch). Dos activas, una ya expirada para demo.
const now = Date.now()
export const MOCK_OFFERS = [
  { id: 1, gameId: 1, discount: 30, expiresAt: now + 2 * 60 * 60 * 1000 },
  { id: 2, gameId: 3, discount: 50, expiresAt: now + 25 * 60 * 1000 },
  { id: 3, gameId: 6, discount: 20, expiresAt: now + 48 * 60 * 60 * 1000 },
];

// Tickets de soporte
export const MOCK_TICKETS = [
  {
    id: 1, userId: 2, gameId: 1, paymentId: 1,
    category: 'Solicitud de Reembolso',
    subject: 'El juego no funciona correctamente en mi PC',
    status: 'pendiente', date: '2024-06-18',
    messages: [
      { from: 'user', text: 'Hola, compré Cyberpunk 2077 pero el juego crashea al iniciar. Solicito reembolso.', date: '2024-06-18 10:30' },
    ],
  },
  {
    id: 2, userId: 3, gameId: 3, paymentId: 3,
    category: 'Error Técnico',
    subject: 'No puedo descargar Red Dead Redemption 2',
    status: 'en proceso', date: '2024-06-19',
    messages: [
      { from: 'user', text: 'La descarga se interrumpe al 80% cada vez que intento bajar el juego.', date: '2024-06-19 14:15' },
      { from: 'admin', text: 'Estamos revisando el problema con los servidores. Te contactamos pronto.', date: '2024-06-19 16:00' },
    ],
  },
  {
    id: 3, userId: 2, gameId: 2, paymentId: 2,
    category: 'Problema con Yape/Plin',
    subject: 'Se realizó el cobro pero no aparece el juego',
    status: 'resuelto', date: '2024-06-20',
    messages: [
      { from: 'user', text: 'Pagué con Yape y me descontaron el dinero pero Elden Ring no está en mi biblioteca.', date: '2024-06-20 09:00' },
      { from: 'admin', text: 'Verificamos el pago y hemos activado el juego manualmente. Disculpa el inconveniente.', date: '2024-06-20 09:45' },
    ],
  },
  {
    id: 4, userId: 4, gameId: 4, paymentId: 4,
    category: 'Solicitud de Reembolso',
    subject: 'Compra accidental, solicito devolución',
    status: 'pendiente', date: '2024-06-21',
    messages: [
      { from: 'user', text: 'Compré Hogwarts Legacy por error. No era el juego que quería. Por favor procesen mi reembolso.', date: '2024-06-21 11:00' },
    ],
  },
];
