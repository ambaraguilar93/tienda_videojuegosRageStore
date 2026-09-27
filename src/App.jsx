import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Buscador from './components/Buscador.jsx'
import ProductList from './components/ProductList.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import BotonCarrito from './components/BotonCarrito.jsx'
import Carrito from './components/Carrito.jsx'
import { catalogo, lanzamientos } from './data/productos.js'
import {
  agregarItem,
  restarItem,
  eliminarItem,
  contarUnidades,
  leerCarritoGuardado,
  guardarCarrito,
} from './utils/carrito.js'

// Todos los productos juntos, para recuperar el carrito guardado.
const todosLosProductos = [...catalogo, ...lanzamientos]

// Devuelve solo los productos cuyo nombre contiene el texto buscado.
function filtrarPorNombre(productos, texto) {
  const termino = texto.trim().toLowerCase()
  if (termino === '') return productos
  return productos.filter(producto => producto.nombre.toLowerCase().includes(termino))
}

function App() {
  /* ---------- ESTADO ----------
     El estado vive aquí (componente padre) y se reparte a los hijos
     mediante props. Así el contador, las tarjetas y el panel del
     carrito siempre muestran la misma información. */

  // Carrito: se inicializa con lo guardado en localStorage (si existe).
  const [carrito, setCarrito] = useState(() => leerCarritoGuardado(todosLosProductos))
  // Controla si el panel del carrito está abierto o cerrado.
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  // Texto escrito en el buscador.
  const [busqueda, setBusqueda] = useState('')

  /* ---------- EFECTO ----------
     Cada vez que cambia el carrito, se guarda en localStorage,
     así no se pierde al recargar la página. */
  useEffect(() => {
    guardarCarrito(carrito)
  }, [carrito])

  /* ---------- MANEJADORES DE EVENTOS ---------- */
  const handleAgregar = producto => setCarrito(actual => agregarItem(actual, producto))
  const handleRestar = id => setCarrito(actual => restarItem(actual, id))
  const handleEliminar = id => setCarrito(actual => eliminarItem(actual, id))
  const handleVaciar = () => setCarrito([])

  /* ---------- DATOS DERIVADOS ----------
     No se guardan en el estado porque se pueden calcular. */
  const totalUnidades = contarUnidades(carrito)
  const catalogoFiltrado = filtrarPorNombre(catalogo, busqueda)
  const lanzamientosFiltrados = filtrarPorNombre(lanzamientos, busqueda)
  const totalResultados = catalogoFiltrado.length + lanzamientosFiltrados.length

  return (
    <>
      <Header />

      <main>
        <Hero />

        <hr />

        <Buscador
          valor={busqueda}
          onCambiar={setBusqueda}
          totalResultados={totalResultados}
        />

        <ProductList
          id="catalogo"
          titulo="Videojuegos disponibles"
          descripcion="Todos los títulos incluyen boleta y garantía de 6 meses."
          productos={catalogoFiltrado}
          carrito={carrito}
          onAgregar={handleAgregar}
          claseAcento="panel-games"
        />

        <hr />

        <ProductList
          id="lanzamientos"
          titulo="Próximos lanzamientos"
          descripcion="Reserva ahora y asegura tu copia con precio de preventa."
          productos={lanzamientosFiltrados}
          carrito={carrito}
          onAgregar={handleAgregar}
          claseAcento="panel-accessories"
        />

        <hr />

        <Contacto />
      </main>

      <Footer />

      <BotonCarrito cantidad={totalUnidades} onAbrir={() => setCarritoAbierto(true)} />

      {/* Renderizado condicional: el panel solo existe cuando está abierto */}
      {carritoAbierto && (
        <Carrito
          items={carrito}
          onCerrar={() => setCarritoAbierto(false)}
          onSumar={handleAgregar}
          onRestar={handleRestar}
          onEliminar={handleEliminar}
          onVaciar={handleVaciar}
        />
      )}
    </>
  )
}

export default App
