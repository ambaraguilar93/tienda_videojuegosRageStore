import { formatearPrecio } from '../utils/precios.js'

// Fila del carrito con botones para sumar, restar y eliminar.
function CartItem({ item, onSumar, onRestar, onEliminar }) {
  const { id, nombre, imagen, precioOferta, cantidad, reserva } = item

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
            onClick={() => onRestar(id)}
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

      <button
        type="button"
        className="btn-quitar-carrito"
        onClick={() => onEliminar(id)}
        aria-label={`Eliminar ${nombre} del carrito`}
      >
        ✕
      </button>
    </li>
  )
}

export default CartItem
