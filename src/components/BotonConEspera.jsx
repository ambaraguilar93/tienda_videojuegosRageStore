/* Botón para acciones asíncronas.
Mientras "cargando" es true se deshabilita,
muestra un spinner y cambia el texto para indicar que la acción sigue en
curso. */
function BotonConEspera({ cargando, textoCargando, children, className = 'btn btn-primary', type = 'button', ...resto }) {
  return (
    <button type={type} className={className} disabled={cargando} aria-busy={cargando} {...resto}>
      {cargando && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
      {cargando ? textoCargando : children}
    </button>
  )
}

export default BotonConEspera
