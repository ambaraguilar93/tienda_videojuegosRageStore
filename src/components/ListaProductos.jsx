import TarjetaProducto from './TarjetaProducto.jsx'
import { cantidadEnCarrito } from '../utils/carrito.js'

// Sección con un listado de productos. Se reutiliza para
// el catálogo y para los próximos lanzamientos.
function ListaProductos({ id, titulo, descripcion, productos, carrito, onAgregar, onVerDetalle, claseAcento }) {
  return (
    <section id={id} className={`panel ${claseAcento}`}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>

      {/* Se muestra un mensaje si el buscador no dejó productos */}
      {productos.length === 0 ? (
        <p className="mensaje-vacio">No hay productos que coincidan con tu búsqueda en esta sección.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {productos.map(producto => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              cantidad={cantidadEnCarrito(carrito, producto.id)}
              onAgregar={onAgregar}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ListaProductos
