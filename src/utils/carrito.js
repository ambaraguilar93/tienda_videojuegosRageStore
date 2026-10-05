/* ------------------------------------------------------------
   Funciones reutilizables del carrito
   Reciben el carrito actual y devuelven un carrito nuevo, 
   sin modificar el original.
   ------------------------------------------------------------ */

// Se cambió la clave en la Semana 8 porque ahora se guarda el item completo.
const CARRITO_KEY = 'ragestore-carrito'

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

// Resta un producto.
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

// Cantidad de un producto en el carrito.
export function cantidadEnCarrito(carrito, id) {
  return carrito.find(item => item.id === id)?.cantidad ?? 0
}

// Texto del botón "Agregar" según si es reserva y si ya está en el carrito.
export function textoBotonAgregar(producto, cantidad) {
  if (cantidad > 0) {
    return producto.reserva ? `✓ Reservado (${cantidad})` : `✓ En el carrito (${cantidad})`
  }
  return producto.reserva ? 'Reservar' : 'Agregar al carrito'
}

/* ------------------------------------------------------------
   Persistencia en localStorage
   El carrito se guarda completo (con nombre, precio e imagen) para
   poder mostrarlo apenas abre la página, sin esperar a que termine
   la carga del catálogo.
   ------------------------------------------------------------ */

// Revisa que un item guardado tenga los datos mínimos para mostrarse.
function esItemValido(item) {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.nombre === 'string' &&
    typeof item.precioOferta === 'number' &&
    Number.isInteger(item.cantidad) &&
    item.cantidad > 0
  )
}

// Lee el carrito guardado. Si no hay nada o los datos están dañados,
// devuelve un carrito vacío.
export function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CARRITO_KEY)
    const datos = guardado ? JSON.parse(guardado) : []
    return Array.isArray(datos) ? datos.filter(esItemValido) : []
  } catch (error) {
    console.error('No se pudo leer el carrito guardado:', error)
    return []
  }
}

// Guarda el carrito. Devuelve true si se pudo guardar y false si
// el navegador lo impidió (por ejemplo, almacenamiento lleno o bloqueado).
export function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito))
    return true
  } catch (error) {
    console.error('No se pudo guardar el carrito:', error)
    return false
  }
}
