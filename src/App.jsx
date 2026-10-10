import { useCallback, useEffect, useState } from 'react'
import Encabezado from './components/Encabezado.jsx'
import BannerOfertas from './components/BannerOfertas.jsx'
import Buscador from './components/Buscador.jsx'
import FiltroCategorias from './components/FiltroCategorias.jsx'
import EstadoCarga from './components/EstadoCarga.jsx'
import ListaProductos from './components/ListaProductos.jsx'
import FormularioAgregarProducto from './components/FormularioAgregarProducto.jsx'
import Contacto from './components/Contacto.jsx'
import PiePagina from './components/PiePagina.jsx'
import BotonCarrito from './components/BotonCarrito.jsx'
import Carrito from './components/Carrito.jsx'
import Aviso from './components/Aviso.jsx'
import DetalleProducto from './components/DetalleProducto.jsx'
import { esCancelacion } from './utils/espera.js'
import {
  CATEGORIA_TODAS,
  cargarProductos,
  filtrarPorNombre,
  filtrarPorCategoria,
  obtenerCategorias,
} from './utils/productos.js'
import {
  agregarItem,
  restarItem,
  eliminarItem,
  contarUnidades,
  cantidadEnCarrito,
  leerCarritoGuardado,
  guardarCarrito,
} from './utils/carrito.js'

const ESPERA_BUSQUEDA = 300
const DURACION_AVISO = 3000

function App() {
  /* El estado vive aquí (componente padre) y se reparte a los hijos
     mediante props. */

  // Catálogo empieza vacío y se llena cuando termina la carga del JSON.
  const [catalogo, setCatalogo] = useState([])
  const [lanzamientos, setLanzamientos] = useState([])
  // Estado de la carga es true mientras se espera la respuesta.
  const [cargando, setCargando] = useState(true)
  // Mensaje de error si la carga falla.
  const [error, setError] = useState(null)
  // Cada vez que cambia, el efecto de carga se vuelve a ejecutar.
  const [intentoCarga, setIntentoCarga] = useState(0)

  // Carrito se inicializa con lo guardado en localStorage.
  const [carrito, setCarrito] = useState(leerCarritoGuardado)
  // Controla si el panel del carrito está abierto o cerrado.
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  // Producto que se muestra en el modal de detalle.
  const [productoDetalle, setProductoDetalle] = useState(null)
  // Aviso flotante con el resultado de la última operación.
  const [aviso, setAviso] = useState(null)

  // Texto escrito en el buscador.
  const [busqueda, setBusqueda] = useState('')
  // Texto que realmente se usa para filtrar.
  const [busquedaAplicada, setBusquedaAplicada] = useState('')

  // Categoría elegida en el filtro ("Todas" muestra todo).
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIA_TODAS)

  // 1. Carga del catálogo desde productos.json.
  useEffect(() => {
    const controlador = new AbortController()

    cargarProductos(controlador.signal)
      .then(datos => {
        setCatalogo(datos.catalogo)
        setLanzamientos(datos.lanzamientos)
        setCargando(false)
      })
      .catch(err => {
        // Una cancelación no es un error de carga, no se muestra nada.
        if (esCancelacion(err)) return
        console.error('Error al cargar los productos:', err)
        setError(err.message)
        setCargando(false)
      })

    return () => controlador.abort()
  }, [intentoCarga])

  // 2. El aviso se oculta solo después de unos segundos.
  useEffect(() => {
    if (!aviso) return
    const temporizador = setTimeout(() => setAviso(null), DURACION_AVISO)
    return () => clearTimeout(temporizador)
  }, [aviso])

  // 3. Búsqueda espera a que la persona deje de escribir para filtrar.
  useEffect(() => {
    const temporizador = setTimeout(() => setBusquedaAplicada(busqueda), ESPERA_BUSQUEDA)
    return () => clearTimeout(temporizador)
  }, [busqueda])

  // Actualiza el estado del carrito, lo guarda en localStorage 
  // y muestra un aviso con el resultado.
  const actualizarCarrito = (nuevoCarrito, textoExito) => {
    setCarrito(nuevoCarrito)
    const guardado = guardarCarrito(nuevoCarrito)
    setAviso(
      guardado
        ? { texto: textoExito, tipo: 'exito' }
        : { texto: 'No se pudo guardar el carrito en este navegador.', tipo: 'error' }
    )
  }

  const handleAgregar = producto => {
    const texto = producto.reserva ? `${producto.nombre} reservado` : `${producto.nombre} agregado al carrito`
    actualizarCarrito(agregarItem(carrito, producto), texto)
  }
  const handleRestar = item =>
    actualizarCarrito(restarItem(carrito, item.id), `Se quitó una unidad de ${item.nombre}`)
  const handleEliminar = item =>
    actualizarCarrito(eliminarItem(carrito, item.id), `${item.nombre} se eliminó del carrito`)
  // Agrega un videojuego nuevo al final del catálogo.
  const handleAgregarProducto = producto => {
    setCatalogo(lista => [...lista, producto])
    setAviso({ texto: `${producto.nombre} se agregó al catálogo`, tipo: 'exito' })
  }

  // Quita un videojuego del catálogo. Si estaba en
  // el carrito también se saca de ahí, para no dejar productos que ya no existen.
  const handleEliminarProducto = producto => {
    setCatalogo(lista => lista.filter(p => p.id !== producto.id))
    setLanzamientos(lista => lista.filter(p => p.id !== producto.id))

    const nuevoCarrito = eliminarItem(carrito, producto.id)
    setCarrito(nuevoCarrito)
    guardarCarrito(nuevoCarrito)
    // Si la categoría activa se quedó sin productos, se vuelve a "Todas".
    const quedan = [...catalogo, ...lanzamientos].filter(p => p.id !== producto.id)
    if (categoriaActiva !== CATEGORIA_TODAS && !quedan.some(p => p.categoria === categoriaActiva)) {
      setCategoriaActiva(CATEGORIA_TODAS)
    }
    setAviso({ texto: `${producto.nombre} se eliminó del catálogo`, tipo: 'exito' })
  }
  const handleVaciar = () => actualizarCarrito([], 'Se vació el carrito')

  // Al reintentar se vuelve al estado "cargando" y cambia intentoCarga,
  // lo que hace que el efecto de carga se ejecute otra vez.
  const handleReintentar = () => {
    setCargando(true)
    setError(null)
    setIntentoCarga(intento => intento + 1)
  }

  const handleCerrarCarrito = useCallback(() => setCarritoAbierto(false), [])
  const handleCerrarDetalle = useCallback(() => setProductoDetalle(null), [])

  const totalUnidades = contarUnidades(carrito)
  // Los dos filtros se combinan, primero la categoría y luego el nombre.
  const categorias = obtenerCategorias(catalogo, lanzamientos)
  const catalogoFiltrado = filtrarPorNombre(filtrarPorCategoria(catalogo, categoriaActiva), busquedaAplicada)
  const lanzamientosFiltrados = filtrarPorNombre(
    filtrarPorCategoria(lanzamientos, categoriaActiva),
    busquedaAplicada
  )
  const totalResultados = catalogoFiltrado.length + lanzamientosFiltrados.length
  const buscando = busqueda !== busquedaAplicada
  const catalogoListo = !cargando && !error

  return (
    <>
      <Encabezado />

      <main>
        <BannerOfertas />

        <hr />

        <Buscador
          valor={busqueda}
          onCambiar={setBusqueda}
          totalResultados={totalResultados}
          buscando={buscando}
          deshabilitado={!catalogoListo}
        />

        <FiltroCategorias
          categorias={categorias}
          activa={categoriaActiva}
          onCambiar={setCategoriaActiva}
          deshabilitado={!catalogoListo}
        />

        {catalogoListo ? (
          <>
            <ListaProductos
              id="catalogo"
              titulo="Videojuegos disponibles"
              descripcion="Todos los títulos incluyen boleta y garantía de 6 meses."
              productos={catalogoFiltrado}
              carrito={carrito}
              onAgregar={handleAgregar}
              onVerDetalle={setProductoDetalle}
              onEliminar={handleEliminarProducto}
              claseAcento="panel-catalogo"
            />

            <hr />

            <ListaProductos
              id="lanzamientos"
              titulo="Próximos lanzamientos"
              descripcion="Reserva ahora y asegura tu copia con precio de preventa."
              productos={lanzamientosFiltrados}
              carrito={carrito}
              onAgregar={handleAgregar}
              onVerDetalle={setProductoDetalle}
              onEliminar={handleEliminarProducto}
              claseAcento="panel-lanzamientos"
            />

            <hr />

            <FormularioAgregarProducto categorias={categorias} onAgregar={handleAgregarProducto} />
          </>
        ) : (
          <EstadoCarga
            cargando={cargando}
            error={error}
            onReintentar={handleReintentar}
          />
        )}

        <hr />

        <Contacto />
      </main>

      <PiePagina />

      <BotonCarrito cantidad={totalUnidades} onAbrir={() => setCarritoAbierto(true)} />

      {carritoAbierto && (
        <Carrito
          items={carrito}
          onCerrar={handleCerrarCarrito}
          onSumar={handleAgregar}
          onRestar={handleRestar}
          onEliminar={handleEliminar}
          onVaciar={handleVaciar}
        />
      )}

      {productoDetalle && (
        <DetalleProducto
          producto={productoDetalle}
          cantidad={cantidadEnCarrito(carrito, productoDetalle.id)}
          onAgregar={handleAgregar}
          onCerrar={handleCerrarDetalle}
        />
      )}

      <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />
    </>
  )
}

export default App
