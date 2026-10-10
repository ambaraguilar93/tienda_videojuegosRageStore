import { useState } from 'react'
import logo from '../assets/img/logo.png'

// Enlaces del menú (secciones). 
const enlaces = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#catalogo', texto: 'Catálogo' },
  { href: '#lanzamientos', texto: 'Lanzamientos' },
  { href: '#agregar', texto: 'Agregar juego' },
  { href: '#contacto', texto: 'Contacto' },
]

// Encabezado con logo y menú de navegación.
// Usamos useState para abrir el menu en modo celular con onClick.
function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <>
      <header className="encabezado-sitio" id="inicio">
        <img src={logo} alt="Logotipo de la tienda Rage Store" width="193" height="90" />
        <h1>Rage Store</h1>
        <p id="descripcion-encabezado">
          Somos una tienda especializada en videojuegos para distintas plataformas.
          Encuentra los últimos lanzamientos, clásicos y ofertas con despacho a todo Chile.
        </p>
      </header>

      <nav className="navbar navbar-expand-lg nav-principal" aria-label="Menú principal">
        <div className="container-fluid justify-content-center">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-controls="navMenu"
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* La clase show se agrega solo cuando el menú está abierto */}
          <div
            className={`collapse navbar-collapse justify-content-center ${menuAbierto ? 'show' : ''}`}
            id="navMenu"
          >
            <ul className="navbar-nav lista-nav">
              {enlaces.map(enlace => (
                <li className="nav-item" key={enlace.href}>
                  <a
                    className="nav-link"
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {enlace.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Encabezado
