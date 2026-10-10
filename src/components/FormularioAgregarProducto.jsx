import { useEffect, useRef, useState } from 'react'
import BotonConEspera from './BotonConEspera.jsx'
import { validarProducto } from '../utils/validaciones.js'
import { crearProducto } from '../utils/productos.js'
import { esperar, esCancelacion } from '../utils/espera.js'

// Simula el tiempo que tardaría en guardarse el producto en un servidor.
const DEMORA_GUARDADO = 800

const DATOS_INICIALES = {
  nombre: '',
  categoria: '',
  precio: '',
  precioOferta: '',
  plataforma: '',
  descripcion: '',
}

/* Formulario para agregar un videojuego al catálogo.
Es un formulario controlado: cada input guarda su valor en el estado
"datos" con onChange. 
Si el componente se desmonta, la espera se cancela con un AbortController. */
function FormularioAgregarProducto({ categorias, onAgregar }) {
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState(null)
  const controladorRef = useRef(null)
  const botonRef = useRef(null)
  const devolverFoco = useRef(false)

  // Al terminar la operación el botón vuelve a habilitarse y recupera el foco,
  // para que quien usa el teclado no lo pierda mientras estaba deshabilitado.
  useEffect(() => {
    if (!guardando && devolverFoco.current) {
      botonRef.current?.focus()
      devolverFoco.current = false
    }
  }, [guardando])

  // Al desmontar el formulario se cancela un guardado pendiente.
  useEffect(() => () => controladorRef.current?.abort(), [])

  const handleCambio = evento => {
    const { name, value } = evento.target
    const nuevosDatos = { ...datos, [name]: value }
    setDatos(nuevosDatos)

    // Si el campo tenía un error, se revalida mientras la persona corrige.
    if (errores[name]) {
      setErrores({ ...errores, [name]: validarProducto(nuevosDatos)[name] })
    }
  }

  const handleEnviar = async evento => {
    evento.preventDefault()
    if (guardando) return

    const nuevosErrores = validarProducto(datos)
    setErrores(nuevosErrores)

    const primerCampo = Object.keys(nuevosErrores)[0]
    if (primerCampo) {
      // Lleva el foco al primer campo con error.
      evento.currentTarget.elements[primerCampo].focus()
      return
    }

    setErrorGuardado(null)
    setGuardando(true)
    devolverFoco.current = true
    const controlador = new AbortController()
    controladorRef.current = controlador

    try {
      await esperar(DEMORA_GUARDADO, controlador.signal)
      onAgregar(crearProducto(datos))
      setDatos(DATOS_INICIALES)
    } catch (err) {
      if (esCancelacion(err)) return
      setErrorGuardado('No pudimos guardar el videojuego. Inténtalo nuevamente.')
    } finally {
      if (!controlador.signal.aborted) setGuardando(false)
    }
  }

  // Props comunes de cada input para marcar el error de forma accesible.
  const propsCampo = nombre => ({
    id: `producto-${nombre}`,
    name: nombre,
    value: datos[nombre],
    onChange: handleCambio,
    className: `form-control ${errores[nombre] ? 'is-invalid' : ''}`,
    'aria-invalid': errores[nombre] ? 'true' : 'false',
    'aria-describedby': errores[nombre] ? `error-producto-${nombre}` : undefined,
  })

  const mensajeError = nombre =>
    errores[nombre] && (
      <div id={`error-producto-${nombre}`} className="invalid-feedback">
        {errores[nombre]}
      </div>
    )

  return (
    <section id="agregar" className="panel panel-formulario" aria-labelledby="titulo-agregar">
      <h2 id="titulo-agregar">Agregar un videojuego</h2>
      <p>Completa los datos para sumar un nuevo título al catálogo.</p>

      <form onSubmit={handleEnviar} noValidate aria-busy={guardando}>
        {errorGuardado && (
          <div className="alert alert-danger" role="alert">
            {errorGuardado}
          </div>
        )}
        <fieldset disabled={guardando} className="border-0 p-0 m-0">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="producto-nombre" className="form-label">Nombre</label>
              <input type="text" {...propsCampo('nombre')} />
              {mensajeError('nombre')}
            </div>

            <div className="col-md-6">
              <label htmlFor="producto-categoria" className="form-label">Categoría</label>
              <input type="text" list="categorias-existentes" {...propsCampo('categoria')} />
              <datalist id="categorias-existentes">
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria} />
                ))}
              </datalist>
              {mensajeError('categoria')}
            </div>

            <div className="col-md-4">
              <label htmlFor="producto-precio" className="form-label">Precio normal ($)</label>
              <input type="number" min="0" {...propsCampo('precio')} />
              {mensajeError('precio')}
            </div>

            <div className="col-md-4">
              <label htmlFor="producto-precioOferta" className="form-label">Precio oferta ($, opcional)</label>
              <input type="number" min="0" {...propsCampo('precioOferta')} />
              {mensajeError('precioOferta')}
            </div>

            <div className="col-md-4">
              <label htmlFor="producto-plataforma" className="form-label">Plataformas (opcional)</label>
              <input type="text" {...propsCampo('plataforma')} />
            </div>

            <div className="col-12">
              <label htmlFor="producto-descripcion" className="form-label">Descripción</label>
              <textarea rows="3" {...propsCampo('descripcion')} />
              {mensajeError('descripcion')}
            </div>

            <div className="col-12">
              <BotonConEspera ref={botonRef} type="submit" cargando={guardando} textoCargando="Guardando videojuego…">
                Agregar al catálogo
              </BotonConEspera>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default FormularioAgregarProducto
