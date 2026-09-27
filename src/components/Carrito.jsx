import { useEffect } from 'react'
import CartItem from './CartItem.jsx'
import CartTotal from './CartTotal.jsx'

// Panel lateral del carrito. 
// Se muestra u oculta desde App con estado.
function Carrito({ items, onCerrar, onSumar, onRestar, onEliminar, onVaciar }) {
  const estaVacio = items.length === 0

  // Mientras el panel está abierto, la tecla Esc lo cierra.
  // La función de limpieza quita el listener cuando el panel se cierra.
  useEffect(() => {
    const cerrarConEscape = evento => {
      if (evento.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', cerrarConEscape)
    return () => document.removeEventListener('keydown', cerrarConEscape)
  }, [onCerrar])

  return (
    <>
      {/* Al hacer clic afuera se cierra el carrito */}
      <div className="offcanvas-backdrop fade show" onClick={onCerrar}></div>

      <aside
        className="offcanvas offcanvas-end show carrito-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-carrito"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title h5" id="titulo-carrito">Tu carrito</h2>
          <button type="button" className="btn-close" aria-label="Cerrar carrito" onClick={onCerrar}></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {/* Muestra mensaje de carrito vacío o lista de productos */}
          {estaVacio ? (
            <p className="carrito-vacio">
              Tu carrito está vacío. ¡Agrega algún videojuego del catálogo!
            </p>
          ) : (
            <ul className="lista-carrito">
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onSumar={onSumar}
                  onRestar={onRestar}
                  onEliminar={onEliminar}
                />
              ))}
            </ul>
          )}

          <CartTotal items={items} />

          {!estaVacio && (
            <button type="button" className="btn btn-outline-danger btn-sm mt-2" onClick={onVaciar}>
              Vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </>
  )
}

export default Carrito
