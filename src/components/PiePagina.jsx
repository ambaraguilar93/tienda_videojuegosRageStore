// Pie de página con dirección, redes sociales y horario.
// El año es automatico.
const redes = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/' },
  { nombre: 'YouTube', url: 'https://www.youtube.com/' },
  { nombre: 'Discord', url: 'https://discord.com/' },
]

function PiePagina() {
  const anioActual = new Date().getFullYear()

  return (
    <footer className="pie-sitio">
      <h2>Información de contacto</h2>

      <address>
        Rage Store SpA<br />
        Paseo Ahumada 85 (Salida Metro Estación Universidad de Chile), Santiago, Chile<br />
        Teléfono: <a href="tel:+56221234567">+56 2 2123 4567</a><br />
        Correo: <a href="mailto:contacto@ragestore.cl">contacto@ragestore.cl</a>
      </address>

      <h3>Síguenos en redes sociales</h3>
      <ul className="redes-sociales">
        {redes.map(red => (
          <li key={red.nombre}>
            <a href={red.url} target="_blank" rel="noopener noreferrer">{red.nombre}</a>
          </li>
        ))}
      </ul>

      <p>Horario de atención: lunes a viernes de 10:00 a 19:00 h.</p>
      <p>Copyright &copy; {anioActual} Rage Store. Todos los derechos reservados.</p>
    </footer>
  )
}

export default PiePagina
