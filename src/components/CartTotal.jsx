import { formatearPrecio } from '../utils/precios.js'
import { contarUnidades, calcularTotal, calcularAhorro } from '../utils/carrito.js'

// Resumen del carrito que incluye cantidad de productos, ahorro y total a pagar.
function CartTotal({ items }) {
  const unidades = contarUnidades(items)
  const total = calcularTotal(items)
  const ahorro = calcularAhorro(items)

  return (
    <div className="carrito-total mt-auto">
      <p>
        Productos en el carrito: <strong>{unidades}</strong>
      </p>
      {/* El ahorro solo se muestra si es mayor a 0 */}
      {ahorro > 0 && (
        <p className="carrito-ahorro">Ahorras {formatearPrecio(ahorro)} con las ofertas</p>
      )}
      <p className="carrito-total-precio">
        Total: <strong>{formatearPrecio(total)}</strong>
      </p>
    </div>
  )
}

export default CartTotal
