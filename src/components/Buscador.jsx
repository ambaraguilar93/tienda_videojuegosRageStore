// Buscador de productos por nombre.
// Corresponde al input que filtra los productos al escribir.
// Usamos onChange como input controlado.
// Usamos onClick en limpiar.
function Buscador({ valor, onCambiar, totalResultados }) {
  const hayBusqueda = valor.trim() !== ''

  return (
    <div className="buscador" role="search">
      <label htmlFor="busqueda-input" className="visually-hidden">
        Buscar videojuego por nombre
      </label>
      <div className="search-form">
        <input
          type="search"
          id="busqueda-input"
          className="form-control"
          placeholder="Buscar por nombre de videojuego..."
          value={valor}
          onChange={evento => onCambiar(evento.target.value)}
        />
        {/* El botón limpiar solo aparece si hay texto */}
        {hayBusqueda && (
          <button type="button" className="btn btn-outline-secondary" onClick={() => onCambiar('')}>
            Limpiar
          </button>
        )}
      </div>

      <p className="busqueda-mensaje" aria-live="polite">
        {hayBusqueda &&
          (totalResultados === 0
            ? `No se encontraron videojuegos para "${valor.trim()}".`
            : `${totalResultados} resultado(s) para "${valor.trim()}".`)}
      </p>
    </div>
  )
}

export default Buscador
