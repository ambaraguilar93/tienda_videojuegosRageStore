// Aqui se encuentra la configuracion de Vite.
// Con esto podremos hacer funcionar en GitHub Pages.
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Ruta base para GitHub Pages:
  base: '/tienda_videojuegosRageStore/',
})
