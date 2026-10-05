/* ------------------------------------------------------------
   Funciones reutilizables para los productos
   - cargarProductos(): obtiene el catálogo desde el archivo JSON
   - filtrarPorNombre(): filtra una lista según el texto buscado
   ------------------------------------------------------------ */

// BASE_URL lo entrega Vite: en local es "/tienda_videojuegosRageStore/"
// y en GitHub Pages es la misma ruta.
const BASE_URL = import.meta.env.BASE_URL
const URL_PRODUCTOS = `${BASE_URL}data/productos.json`
const DEMORA_SIMULADA = 700

// Devuelve una promesa que se resuelve después de "ms" milisegundos.
function esperar(ms) {
  return new Promise(resolver => setTimeout(resolver, ms))
}

// Las imágenes localesnecesitan la ruta base. 
// Las URLs externas se dejan tal cual.
function agregarRutaImagen(producto) {
  const esExterna = producto.imagen.startsWith('http')
  return { ...producto, imagen: esExterna ? producto.imagen : `${BASE_URL}${producto.imagen}` }
}

// Carga el catálogo y los próximos lanzamientos desde el JSON.
// Si la respuesta no es correcta, lanza un error para que el
// componente lo muestre en pantalla.
export async function cargarProductos() {
  await esperar(DEMORA_SIMULADA)

  const respuesta = await fetch(URL_PRODUCTOS)
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
