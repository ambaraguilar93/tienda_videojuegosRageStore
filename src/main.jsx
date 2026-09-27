import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import App from './App.jsx'

// Esto es el punto de entrada, donde se importa Bootstrap y los estilos.
// Aqui montamos el <App />
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
