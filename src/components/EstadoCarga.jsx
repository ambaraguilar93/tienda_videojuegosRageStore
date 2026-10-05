// Muestra el estado de la carga del catálogo:
// - mientras carga el catalogo se muestra spinner y texto "Cargando videojuegos…"
// - si hay error se muestra mensaje con el detalle y botón para reintentar
function EstadoCarga({ cargando, error, onReintentar }) {
  if (cargando) {
    return (
      <div className="estado-carga panel" role="status">
        <div className="spinner-border text-primary" aria-hidden="true"></div>
        <p className="mt-3 mb-0">Cargando videojuegos…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="estado-carga panel" role="alert">
        <p className="estado-error mb-2">No pudimos cargar el catálogo.</p>
        <p className="small">Detalle: {error}</p>
        <button type="button" className="btn btn-primary" onClick={onReintentar}>
          Reintentar
        </button>
      </div>
    )
  }

  return null
}

export default EstadoCarga
