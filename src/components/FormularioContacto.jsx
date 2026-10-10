import { useEffect, useRef, useState } from 'react'
import BotonConEspera from './BotonConEspera.jsx'
import { validarContacto } from '../utils/validaciones.js'
import { esperar, esCancelacion } from '../utils/espera.js'

const DATOS_INICIALES = { nombre: '', email: '', mensaje: '' }
// Se simula una espera.
const DEMORA_ENVIO = 1200

/* Formulario de contacto con nombre, correo y mensaje.
Antes de enviar se validan los datos, si falta información o es incorrecta
se muestran los errores y no se envía. Mientras dura, el botón
se deshabilita y muestra un spinner. Si el componente se desmonta durante
el envío, la espera se cancela con un AbortController. */
function FormularioContacto() {
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(null)
  const controladorRef = useRef(null)
  const botonRef = useRef(null)
  const devolverFoco = useRef(false)

  // Al terminar la operación el botón vuelve a habilitarse y recupera el foco,
  // para que quien usa el teclado no lo pierda mientras estaba deshabilitado.
  useEffect(() => {
    if (!enviando && devolverFoco.current) {
      botonRef.current?.focus()
      devolverFoco.current = false
    }
  }, [enviando])

  // Al desmontar el formulario se cancela un envío pendiente.
  useEffect(() => () => controladorRef.current?.abort(), [])

  const handleCambio = evento => {
    const { name, value } = evento.target
    const nuevosDatos = { ...datos, [name]: value }
    setDatos(nuevosDatos)
    setEnviado(false)
    setErrorEnvio(null)

    // Si el campo tenía un error, se revalida mientras la persona corrige.
    if (errores[name]) {
      setErrores({ ...errores, [name]: validarContacto(nuevosDatos)[name] })
    }
  }

  const handleEnviar = async evento => {
    evento.preventDefault()
    if (enviando) return

    const nuevosErrores = validarContacto(datos)
    setErrores(nuevosErrores)

    const primerCampo = Object.keys(nuevosErrores)[0]
    if (primerCampo) {
      setEnviado(false)
      evento.currentTarget.elements[primerCampo].focus()
      return
    }

    setErrorEnvio(null)
    setEnviado(false)
    setEnviando(true)
    devolverFoco.current = true
    const controlador = new AbortController()
    controladorRef.current = controlador

    try {
      await esperar(DEMORA_ENVIO, controlador.signal)
      setEnviado(true)
      setDatos(DATOS_INICIALES)
    } catch (err) {
      // Si se canceló porque el formulario se cerró, no hay nada que mostrar.
      if (esCancelacion(err)) return
      setErrorEnvio('No pudimos enviar tu mensaje. Inténtalo nuevamente.')
    } finally {
      if (!controlador.signal.aborted) setEnviando(false)
    }
  }

  const hayErrores = Object.values(errores).some(Boolean)

  const propsCampo = nombre => ({
    id: `contacto-${nombre}`,
    name: nombre,
    value: datos[nombre],
    onChange: handleCambio,
    className: `form-control ${errores[nombre] ? 'is-invalid' : ''}`,
    'aria-invalid': errores[nombre] ? 'true' : 'false',
    'aria-describedby': errores[nombre] ? `error-contacto-${nombre}` : undefined,
  })

  const mensajeError = nombre =>
    errores[nombre] && (
      <div id={`error-contacto-${nombre}`} className="invalid-feedback">
        {errores[nombre]}
      </div>
    )

  return (
    <form className="formulario-contacto" onSubmit={handleEnviar} noValidate aria-labelledby="titulo-formulario-contacto" aria-busy={enviando}>
      <h3 id="titulo-formulario-contacto" className="mt-4">Escríbenos un mensaje</h3>

      {enviado && (
        <div className="alert alert-success" role="status">
          ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
        </div>
      )}
      {errorEnvio && (
        <div className="alert alert-danger" role="alert">
          {errorEnvio}
        </div>
      )}
      {hayErrores && (
        <div className="alert alert-danger" role="alert">
          Revisa los campos marcados antes de enviar el formulario.
        </div>
      )}

      <fieldset disabled={enviando} className="border-0 p-0 m-0">
        <div className="mb-3">
          <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
          <input type="text" autoComplete="name" {...propsCampo('nombre')} />
          {mensajeError('nombre')}
        </div>

        <div className="mb-3">
          <label htmlFor="contacto-email" className="form-label">Correo electrónico</label>
          <input type="email" autoComplete="email" {...propsCampo('email')} />
          {mensajeError('email')}
        </div>

        <div className="mb-3">
          <label htmlFor="contacto-mensaje" className="form-label">Mensaje</label>
          <textarea rows="4" {...propsCampo('mensaje')} />
          {mensajeError('mensaje')}
        </div>

      </fieldset>

      <BotonConEspera ref={botonRef} type="submit" cargando={enviando} textoCargando="Enviando mensaje…">
        Enviar mensaje
      </BotonConEspera>
    </form>
  )
}

export default FormularioContacto
