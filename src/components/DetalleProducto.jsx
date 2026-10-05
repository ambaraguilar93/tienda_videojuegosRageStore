import { useRef } from 'react'
import { formatearPrecio, calcularDescuento } from '../utils/precios.js'
import { textoBotonAgregar } from '../utils/carrito.js'
import { useFocoAtrapado } from '../hooks/useFocoAtrapado.js'

// Modal con el detalle de un producto.
// Se usan las clases "modal" de Bootstrap únicamente por
// el estilo, sin el JavaScript de Bootstrap.
function DetalleProducto({ producto, cantidad, onAgregar, onCerrar }) {
  const { nombre, descripcion, precio, precioOferta, plataforma, imagen, alt, reserva } = producto
  const descuento = calcularDescuento(precio, precioOferta)
  const enCarrito = cantidad > 0

  const ventanaRef = useRef(null)
  const botonCerrarRef = useRef(null)

  useFocoAtrapado(ventanaRef, botonCerrarRef, onCerrar)

  // Cierra solo si el clic fue en el fondo oscuro, no dentro de la ventana.
  const cerrarAlHacerClicAfuera = evento => {
    if (evento.target === evento.currentTarget) onCerrar()
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" onClick={cerrarAlHacerClicAfuera}>
        <div
          ref={ventanaRef}
          className="modal-dialog modal-dialog-centered modal-lg detalle-producto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-detalle"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="titulo-detalle">{nombre}</h2>
              <button
                ref={botonCerrarRef}
                type="button"
                className="btn-close"
                aria-label="Cerrar detalle"
                onClick={onCerrar}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row g-4 align-items-center">
                <div className="col-12 col-md-5 text-center">
                  <img src={imagen} alt={alt} className="detalle-imagen" />
                </div>

                <div className="col-12 col-md-7">
                  <div className="detalle-etiquetas">
                    {reserva && <span className="badge-reserva">Reserva</span>}
                    {descuento > 0 && <span className="badge-oferta-detalle">-{descuento}%</span>}
                  </div>

                  <p className="detalle-descripcion">{descripcion}</p>
                  <p className="detalle-plataforma">
                    <strong>Plataformas:</strong> {plataforma}
                  </p>

                  <div className="precios justify-content-start">
                    <span className="precio-normal">
                      <span className="visually-hidden">Precio normal: </span>
                      {formatearPrecio(precio)}
                    </span>
                    <span className="precio-oferta">
                      <span className="visually-hidden">Precio oferta: </span>
                      {formatearPrecio(precioOferta)}
                    </span>
                  </div>
                  {descuento > 0 && (
                    <p className="detalle-ahorro">Ahorras {formatearPrecio(precio - precioOferta)}</p>
                  )}
                  {reserva && (
                    <p className="small">Precio de preventa: se paga al reservar y se despacha el día del lanzamiento.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onCerrar}>
                Seguir comprando
              </button>
              <button
                type="button"
                className={`btn ${enCarrito ? 'btn-success' : 'btn-primary'}`}
                onClick={() => onAgregar(producto)}
              >
                {textoBotonAgregar(producto, cantidad)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetalleProducto
