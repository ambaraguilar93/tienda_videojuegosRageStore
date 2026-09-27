import promo from '../assets/img/promo.png'

// Sección de bienvenida con la promoción de temporada.
function Hero() {
  return (
    <section className="panel panel-promo" aria-labelledby="titulo-promo">
      <h2 id="titulo-promo">Ofertas de temporada</h2>
      <img
        src={promo}
        alt="Banner con las ofertas de temporada de Rage Store"
        width="200"
        height="200"
      />
      <div className="promo-text">
        <p>
          Todos nuestros videojuegos tienen <strong>precio oferta</strong> este mes, y los
          próximos lanzamientos se pueden reservar con precio de preventa.
        </p>
        <p>
          Las compras superiores a $30.000 tienen despacho gratuito dentro de la
          Región Metropolitana.
        </p>
        <a href="#catalogo" className="btn btn-primary">
          Ver catálogo
        </a>
      </div>
    </section>
  )
}

export default Hero
