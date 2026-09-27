// Botón que abre el carrito y muestra el contador de productos.
function BotonCarrito({ cantidad, onAbrir }) {
  return (
    <button
      type="button"
      className="btn-carrito-flotante"
      onClick={onAbrir}
      aria-label={`Ver carrito de compras, ${cantidad} producto(s)`}
    >
      🛒 <span className="contador-carrito">{cantidad}</span>
    </button>
  )
}

export default BotonCarrito
