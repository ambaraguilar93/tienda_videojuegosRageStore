/* ------------------------------------------------------------
   Funciones reutilizables del carrito
   Reciben el carrito actual y devuelven un carrito nuevo, 
   sin modificar el original.
   ------------------------------------------------------------ */

const CARRITO_KEY = 'ragestore-carrito-react'

// Agrega un producto. Si ya está, suma 1 a la cantidad.
export function agregarItem(carrito, producto) {
  const existe = carrito.some(item => item.id === producto.id)

  if (existe) {
    return carrito.map(item =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
    )
  }
  return [...carrito, { ...producto, cantidad: 1 }]
}

// Resta un producto. Si llega a 0, el producto sale del carrito.
export function restarItem(carrito, id) {
  return carrito
    .map(item => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
    .filter(item => item.cantidad > 0)
}

// Elimina el producto completo, sin importar la cantidad.
export function eliminarItem(carrito, id) {
  return carrito.filter(item => item.id !== id)
}

// Total de unidades en el carrito.
export function contarUnidades(carrito) {
  return carrito.reduce((suma, item) => suma + item.cantidad, 0)
}

// Total a pagar, considerando el precio de oferta.
export function calcularTotal(carrito) {
  return carrito.reduce((suma, item) => suma + item.precioOferta * item.cantidad, 0)
}

// Ahorro comparado con el precio normal.
export function calcularAhorro(carrito) {
  return carrito.reduce(
    (suma, item) => suma + (item.precio - item.precioOferta) * item.cantidad,
    0
  )
}

// Cantidad de un producto en el carrito (0 si no hay).
export function cantidadEnCarrito(carrito, id) {
  return carrito.find(item => item.id === id)?.cantidad ?? 0
}

/* Persistencia en localStorage */

// El carrito solo guarda { id, cantidad }. El resto
// de los datos se toma de la lista de productos.
export function leerCarritoGuardado(productos) {
  try {
    const guardado = localStorage.getItem(CARRITO_KEY)
    const datos = guardado ? JSON.parse(guardado) : []
    if (!Array.isArray(datos)) return []

    return datos
      .map(({ id, cantidad }) => {
        const producto = productos.find(p => p.id === id)
        return producto && cantidad > 0 ? { ...producto, cantidad } : null
      })
      .filter(Boolean)
  } catch (error) {
    console.error('No se pudo leer el carrito guardado:', error)
    return []
  }
}

export function guardarCarrito(carrito) {
  try {
    const resumen = carrito.map(({ id, cantidad }) => ({ id, cantidad }))
    localStorage.setItem(CARRITO_KEY, JSON.stringify(resumen))
  } catch (error) {
    console.error('No se pudo guardar el carrito:', error)
  }
}
