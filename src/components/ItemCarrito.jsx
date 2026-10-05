import { formatearPrecio } from '../utils/precios.js'
import ConfirmarAccion from './ConfirmarAccion.jsx'

// Fila del carrito con botones para sumar, restar y eliminar.
// Eliminar pide confirmación para evitar borrar un producto por accidente.
function ItemCarrito({ item, onSumar, onRestar, onEliminar }) {
  const { nombre, imagen, precioOferta, cantidad, reserva } = item

  return (
    <li className="item-carrito">
      <img src={imagen} alt="" width="48" height="48" />

      <div className="item-info">
        <span className="item-nombre">
          {nombre}
          {reserva && <span className="badge-reserva ms-1">Reserva</span>}
        </span>
        <span className="item-precio">
          {formatearPrecio(precioOferta)} c/u · Subtotal {formatearPrecio(precioOferta * cantidad)}
        </span>

        <div className="item-controles">
          <button
            type="button"
            className="btn-cantidad"
            onClick={() => onRestar(item)}
            // Con 1 unidad se desactiva: para sacar el producto se usa ✕ (con confirmación)
            disabled={cantidad === 1}
            aria-label={`Quitar una unidad de ${nombre}`}
          >
            −
          </button>
          <span className="item-cantidad" aria-label="Cantidad">{cantidad}</span>
          <button
            type="button"
            className="btn-cantidad"
            onClick={() => onSumar(item)}
            aria-label={`Agregar una unidad de ${nombre}`}
          >
            +
          </button>
        </div>
      </div>

      <ConfirmarAccion
        pregunta={`¿Quitar ${nombre}?`}
        textoConfirmar="Sí, quitar"
        onConfirmar={() => onEliminar(item)}
        claseBoton="btn-quitar-carrito"
        etiqueta={`Eliminar ${nombre} del carrito`}
      >
        ✕
      </ConfirmarAccion>
    </li>
  )
}

export default ItemCarrito
