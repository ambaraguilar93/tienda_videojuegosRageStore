/* ------------------------------------------------------------
   Funciones reutilizables para los productos
   - cargarProductos(): obtiene el catálogo desde el archivo JSON
   - filtrarPorNombre(): filtra una lista según el texto
   - filtrarPorCategoria(): filtra una lista según la categoría
   - obtenerCategorias(): lista las categorías que existen en los productos
   - crearProducto(): arma un producto nuevo a partir de los datos del formulario
   ------------------------------------------------------------ */

// BASE_URL lo entrega Vite: en local es "/tienda_videojuegosRageStore/"
// y en GitHub Pages es la misma ruta.
import { esperar } from './espera.js'

const BASE_URL = import.meta.env.BASE_URL
const URL_PRODUCTOS = `${BASE_URL}data/productos.json`
const DEMORA_SIMULADA = 700

// Las imágenes locales necesitan la ruta base. 
// Las URLs externas se dejan tal cual.
function agregarRutaImagen(producto) {
  const esExterna = producto.imagen.startsWith('http')
  return { ...producto, imagen: esExterna ? producto.imagen : `${BASE_URL}${producto.imagen}` }
}

// Carga el catálogo y los próximos lanzamientos desde el JSON.
export async function cargarProductos(signal) {
  await esperar(DEMORA_SIMULADA, signal)

  const respuesta = await fetch(URL_PRODUCTOS, { signal })
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió con el código ${respuesta.status}`)
  }

  const datos = await respuesta.json()
  return {
    catalogo: datos.catalogo.map(agregarRutaImagen),
    lanzamientos: datos.lanzamientos.map(agregarRutaImagen),
  }
}

// Devuelve solo los productos cuyo nombre contiene el texto buscado.
export function filtrarPorNombre(productos, texto) {
  const termino = texto.trim().toLowerCase()
  if (termino === '') return productos
  return productos.filter(producto => producto.nombre.toLowerCase().includes(termino))
}

// Nombre de la opción que muestra todos los productos.
export const CATEGORIA_TODAS = 'Todas'

// Devuelve solo los productos de la categoría elegida.
export function filtrarPorCategoria(productos, categoria) {
  if (categoria === CATEGORIA_TODAS) return productos
  return productos.filter(producto => producto.categoria === categoria)
}

// Devuelve las categorías sin repetir (en orden alfabético) a partir de
// una o más listas de productos.
export function obtenerCategorias(...listas) {
  const categorias = new Set(listas.flat().map(producto => producto.categoria))
  return [...categorias].sort((a, b) => a.localeCompare(b, 'es'))
}

// Arma un producto nuevo con la misma forma que los del JSON.
export function crearProducto({ nombre, categoria, precio, precioOferta, plataforma, descripcion }) {
  const nombreLimpio = nombre.trim()
  const precioNumero = Number(precio)

  return {
    id: `agregado-${Date.now()}`,
    nombre: nombreLimpio,
    descripcion: descripcion.trim(),
    categoria: categoria.trim(),
    precio: precioNumero,
    precioOferta: precioOferta === '' ? precioNumero : Number(precioOferta),
    plataforma: plataforma.trim() || 'Por definir',
    imagen: `${BASE_URL}img/sin-imagen.svg`,
    alt: `Portada genérica del videojuego ${nombreLimpio}`,
    reserva: false,
  }
}
