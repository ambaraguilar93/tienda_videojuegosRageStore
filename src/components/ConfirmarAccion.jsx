import { useEffect, useRef, useState } from 'react'

// Botón para acciones eliminar producto o vaciar carrito.
// Se muestra la pregunta "¿Seguro?" con los botones si, quitar y cancelar. 
function ConfirmarAccion({ pregunta, textoConfirmar, onConfirmar, children, claseBoton, etiqueta }) {
  // false = se muestra el botón normal / true = se muestra la pregunta
  const [confirmando, setConfirmando] = useState(false)

  const botonInicialRef = useRef(null)
  const botonCancelarRef = useRef(null)
  const volverAlBoton = useRef(false)

  // Mueve el foco según la vista.
  useEffect(() => {
    if (confirmando) {
      botonCancelarRef.current?.focus()
    } else if (volverAlBoton.current) {
      botonInicialRef.current?.focus()
      volverAlBoton.current = false
    }
  }, [confirmando])

  const cancelar = () => {
    volverAlBoton.current = true
    setConfirmando(false)
  }

  // Vista 1: botón normal
  if (!confirmando) {
    return (
      <button
        ref={botonInicialRef}
        type="button"
        className={claseBoton}
        onClick={() => setConfirmando(true)}
        aria-label={etiqueta}
      >
        {children}
      </button>
    )
  }

  // Vista 2: pregunta de confirmación
  return (
    <div className="confirmar-accion" role="group" aria-label={pregunta}>
      <span className="confirmar-pregunta">{pregunta}</span>
      <button type="button" className="btn btn-danger btn-sm" onClick={onConfirmar}>
        {textoConfirmar}
      </button>
      <button
        ref={botonCancelarRef}
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={cancelar}
      >
        Cancelar
      </button>
    </div>
  )
}

export default ConfirmarAccion
