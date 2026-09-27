// Seccion de contacto y sucursales
const sucursales = [
  'Santiago Centro — Paseo Ahumada 85 (Salida Metro Estación Universidad de Chile).',
  'Maipú — Avenida Pajaritos 5678, local 3.',
  'Puente Alto — Concha y Toro 910, local 21.',
]

function Contacto() {
  return (
    <section id="contacto" className="panel panel-channels">
      <h2>Contacto</h2>
      <p>Puedes comunicarte con nosotros por cualquiera de estos medios:</p>

      <ul className="contact-list">
        <li>Teléfono: <a href="tel:+56221234567">+56 2 2123 4567</a></li>
        <li>Correo de ventas: <a href="mailto:ventas@ragestore.cl">ventas@ragestore.cl</a></li>
        <li>Correo de soporte: <a href="mailto:soporte@ragestore.cl">soporte@ragestore.cl</a></li>
        <li>
          Comunidad en{' '}
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">Discord</a>
        </li>
      </ul>

      <h3 className="mt-4">Nuestras sucursales</h3>
      <ol className="branch-list">
        {sucursales.map(sucursal => (
          <li key={sucursal}>{sucursal}</li>
        ))}
      </ol>
    </section>
  )
}

export default Contacto
