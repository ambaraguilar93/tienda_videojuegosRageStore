/* ------------------------------------------------------------
   Funciones reutilizables para validar formularios.
   ------------------------------------------------------------ */

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Formulario de contacto: nombre, correo y mensaje.
export function validarContacto({ nombre, email, mensaje }) {
  const errores = {}

  if (nombre.trim() === '') errores.nombre = 'El nombre es obligatorio.'
  else if (nombre.trim().length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres.'

  if (email.trim() === '') errores.email = 'El correo es obligatorio.'
  else if (!REGEX_EMAIL.test(email.trim())) errores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.com.'

  if (mensaje.trim() === '') errores.mensaje = 'El mensaje es obligatorio.'
  else if (mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

  return errores
}

// Formulario para agregar un videojuego al catálogo.
// Los precios llegan como texto desde los inputs.
export function validarProducto({ nombre, categoria, precio, precioOferta, descripcion }) {
  const errores = {}

  if (nombre.trim().length < 2) errores.nombre = 'Ingresa el nombre del videojuego (mínimo 2 caracteres).'

  if (categoria.trim() === '') errores.categoria = 'Indica una categoría.'

  const precioNumero = Number(precio)
  if (precio === '' || !Number.isFinite(precioNumero) || precioNumero <= 0) {
    errores.precio = 'Ingresa un precio mayor a 0.'
  }

  // El precio oferta es opcional, pero si se escribe debe ser válido.
  if (precioOferta !== '') {
    const ofertaNumero = Number(precioOferta)
    if (!Number.isFinite(ofertaNumero) || ofertaNumero <= 0) {
      errores.precioOferta = 'El precio oferta debe ser mayor a 0.'
    } else if (!errores.precio && ofertaNumero > precioNumero) {
      errores.precioOferta = 'El precio oferta no puede ser mayor al precio normal.'
    }
  }

  if (descripcion.trim().length < 10) errores.descripcion = 'La descripción debe tener al menos 10 caracteres.'

  return errores
}
