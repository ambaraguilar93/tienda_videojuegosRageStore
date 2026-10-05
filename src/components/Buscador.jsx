/* Buscador de productos por nombre.
Corresponde al input que filtra los productos al escribir.
Usamos onChange como input controlado.
Usamos onClick en limpiar.
Renderizado condicional del mensaje:
  - "Buscando…" mientras se procesa lo que se escribe
  - cantidad de resultados, o aviso si no hubo coincidencias */

function Buscador({ valor, onCambiar, totalResultados, buscando, deshabilitado }) {
  const hayBusqueda = valor.trim() !== ''

  // Elige el mensaje según el estado de la búsqueda
  let mensaje = ''
  if (hayBusqueda && buscando) {
    mensaje = 'Buscando…'
  } else if (hayBusqueda) {
    mensaje =
      totalResultados === 0
        ? `No se encontraron videojuegos para "${valor.trim()}".`
        : `${totalResultados} resultado(s) para "${valor.trim()}".`
  }

  return (
    <div className="buscador" role="search">
      <label htmlFor="busqueda-input" className="visually-hidden">
        Buscar videojuego por nombre
      </label>
      <div className="form-busqueda">
        <input
          type="search"
          id="busqueda-input"
          className="form-control"
          // Mientras el catálogo carga (o si falló) no se puede buscar
          placeholder={deshabilitado ? 'El buscador se activa al cargar el catálogo' : 'Buscar por nombre de videojuego...'}
          value={valor}
          disabled={deshabilitado}
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
        {mensaje}
      </p>
    </div>
  )
}

export default Buscador
