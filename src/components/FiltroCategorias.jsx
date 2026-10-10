import { CATEGORIA_TODAS } from '../utils/productos.js'

/* Botones para filtrar los videojuegos por categoría. */
function FiltroCategorias({ categorias, activa, onCambiar, deshabilitado }) {
  const opciones = [CATEGORIA_TODAS, ...categorias]

  return (
    <div className="filtro-categorias" role="group" aria-label="Filtrar videojuegos por categoría">
      <span className="filtro-titulo">Categoría:</span>
      {opciones.map(categoria => (
        <button
          key={categoria}
          type="button"
          className={`btn btn-sm ${activa === categoria ? 'btn-primary' : 'btn-outline-primary'}`}
          aria-pressed={activa === categoria}
          disabled={deshabilitado}
          onClick={() => onCambiar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  )
}

export default FiltroCategorias
