// Mensaje flotante que informa el resultado de cada operación del carrito.
function Aviso({ aviso, onCerrar }) {
  return (
    <div className="aviso-contenedor" role="status" aria-live="polite">
      {aviso && (
        <div className={`aviso aviso-${aviso.tipo}`}>
          <span>{aviso.tipo === 'error' ? '⚠️' : '✓'} {aviso.texto}</span>
          <button type="button" className="btn-close btn-close-white" aria-label="Cerrar aviso" onClick={onCerrar}></button>
        </div>
      )}
    </div>
  )
}

export default Aviso
