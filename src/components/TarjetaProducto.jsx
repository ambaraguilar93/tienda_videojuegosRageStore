import { formatearPrecio, calcularDescuento } from '../utils/precios.js'
import { textoBotonAgregar } from '../utils/carrito.js'

// Tarjeta de un producto. Recibe todo por props, sirve para cualquier producto.
// "Ver detalle" avisa a App qué producto mostrar en el modal.
function TarjetaProducto({ producto, cantidad, onAgregar, onVerDetalle }) {
  const { nombre, descripcion, precio, precioOferta, plataforma, imagen, alt, reserva } = producto
  const descuento = calcularDescuento(precio, precioOferta)
  const enCarrito = cantidad > 0


  return (
    <article className="col">
      <div className={`card tarjeta-producto h-100 ${enCarrito ? 'en-carrito' : ''}`}>
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

          <div className="acciones-tarjeta">
            <button
              type="button"
              className={`btn btn-sm ${enCarrito ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onAgregar(producto)}
            >
              {textoBotonAgregar(producto, cantidad)}
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm btn-ver-detalle"
              onClick={() => onVerDetalle(producto)}
              aria-label={`Ver detalle de ${nombre}`}
            >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TarjetaProducto
