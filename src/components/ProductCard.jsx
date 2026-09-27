import { formatearPrecio, calcularDescuento } from '../utils/precios.js'

// Tarjeta de un producto con imagen, nombre, descripción, precio normal
// y precio oferta. Recibe todo por props, sirve para cualquier producto.
function ProductCard({ producto, cantidad, onAgregar }) {
  const { nombre, descripcion, precio, precioOferta, plataforma, imagen, alt, reserva } = producto
  const descuento = calcularDescuento(precio, precioOferta)
  const enCarrito = cantidad > 0

  // Texto del botón según si es reserva y si ya está en el carrito
  let textoBoton = reserva ? 'Reservar' : 'Agregar al carrito'
  if (enCarrito) {
    textoBoton = reserva ? `✓ Reservado (${cantidad})` : `✓ En el carrito (${cantidad})`
  }

  return (
    <article className="col">
      <div className={`card product-card h-100 ${enCarrito ? 'en-carrito' : ''}`}>
        {/* La etiqueta solo aparece si hay descuento */}
        {descuento > 0 && <span className="badge-oferta">-{descuento}%</span>}

        <img src={imagen} alt={alt} className="card-img-top" width="100" height="100" />

        <div className="card-body d-flex flex-column">
          {reserva && <span className="badge-reserva">Reserva</span>}

          <h3 className="card-title h5">{nombre}</h3>
          <p className="card-text">{descripcion}</p>
          <p className="plataforma">{plataforma}</p>

          <div className="precios mt-auto">
            <span className="precio-normal">
              <span className="visually-hidden">Precio normal: </span>
              {formatearPrecio(precio)}
            </span>
            <span className="precio-oferta">
              <span className="visually-hidden">Precio oferta: </span>
              {formatearPrecio(precioOferta)}
            </span>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className={`btn btn-sm ${enCarrito ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onAgregar(producto)}
            >
              {textoBoton}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
