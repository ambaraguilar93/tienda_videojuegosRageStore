/* ------------------------------------------------------------
   Funciones reutilizables para precios
   ------------------------------------------------------------ */

// Da formato de peso chileno -> $22.990
export function formatearPrecio(numero) {
  return `$${numero.toLocaleString('es-CL')}`
}

// Calcula el porcentaje de descuento redondeado
export function calcularDescuento(precio, precioOferta) {
  if (!precio || precioOferta >= precio) return 0
  return Math.round(((precio - precioOferta) / precio) * 100)
}
