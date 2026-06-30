import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Proxy de desarrollo: redirige /api/<servicio>/* al microservicio Spring Boot
 * correspondiente. Esto evita CORS durante desarrollo.
 * El backend usa el API Gateway en :8080, pero también se puede llamar directo.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Cada ruta apunta directo al microservicio
      '/api/usuarios': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/analitica': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/biblioteca': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/catalogo': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
      '/api/notificaciones': {
        target: 'http://localhost:8085',
        changeOrigin: true,
      },
      '/api/ofertas': {
        target: 'http://localhost:8086',
        changeOrigin: true,
      },
      '/api/pagos': {
        target: 'http://localhost:8087',
        changeOrigin: true,
      },
      '/api/renta': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
      '/api/resenas': {
        target: 'http://localhost:8089',
        changeOrigin: true,
      },
      '/api/soporte': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
    },
  },
})
