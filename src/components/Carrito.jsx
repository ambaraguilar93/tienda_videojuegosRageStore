import { useEffect, useRef } from 'react'
import ItemCarrito from './ItemCarrito.jsx'
import TotalCarrito from './TotalCarrito.jsx'
import ConfirmarAccion from './ConfirmarAccion.jsx'
import { useFocoAtrapado } from '../hooks/useFocoAtrapado.js'

// Panel lateral del carrito.
// Se muestra u oculta desde App con estado.
function Carrito({ items, onCerrar, onSumar, onRestar, onEliminar, onVaciar }) {
  const estaVacio = items.length === 0

  const panelRef = useRef(null)
  const botonCerrarRef = useRef(null)

  useFocoAtrapado(panelRef, botonCerrarRef, onCerrar)

  // Si se elimina el producto que tenía el foco, ese botón desaparece. 
  // En ese caso el foco vuelve a "Cerrar".
  useEffect(() => {
    if (panelRef.current && !panelRef.current.contains(document.activeElement)) {
      botonCerrarRef.current?.focus()
    }
  }, [items])

  return (
    <>
      {/* Al hacer clic afuera se cierra el carrito */}
      <div className="offcanvas-backdrop fade show" onClick={onCerrar}></div>

      <aside
        ref={panelRef}
        className="offcanvas offcanvas-end show carrito-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-carrito"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title h5" id="titulo-carrito">Tu carrito</h2>
          <button
            ref={botonCerrarRef}
            type="button"
            className="btn-close"
            aria-label="Cerrar carrito"
            onClick={onCerrar}
          ></button>
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
                <ItemCarrito
                  key={item.id}
                  item={item}
                  onSumar={onSumar}
                  onRestar={onRestar}
                  onEliminar={onEliminar}
                />
              ))}
            </ul>
          )}

          <TotalCarrito items={items} />

          {/* Vaciar solo aparece con productos y pide confirmación */}
          {!estaVacio && (
            <div className="mt-2">
              <ConfirmarAccion
                pregunta="¿Vaciar todo el carrito?"
                textoConfirmar="Sí, vaciar"
                onConfirmar={onVaciar}
                claseBoton="btn btn-outline-danger btn-sm w-100"
              >
                Vaciar carrito
              </ConfirmarAccion>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Carrito
