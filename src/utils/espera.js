/* ------------------------------------------------------------
   Utilidades para operaciones asíncronas cancelables
   - esperar(): pausa simulada que se puede cancelar con un AbortSignal
   - esCancelacion(): distingue una cancelación de un error real
   ------------------------------------------------------------ */

// Crea el error que lanza una operación cancelada.
function crearErrorCancelacion() {
  return new DOMException('La operación fue cancelada.', 'AbortError')
}

// Devuelve una promesa que se resuelve después de "ms" milisegundos.
export function esperar(ms, signal) {
  return new Promise((resolver, rechazar) => {
    if (signal?.aborted) {
      rechazar(crearErrorCancelacion())
      return
    }

    const temporizador = setTimeout(() => {
      signal?.removeEventListener('abort', alCancelar)
      resolver()
    }, ms)

    function alCancelar() {
      clearTimeout(temporizador)
      rechazar(crearErrorCancelacion())
    }

    signal?.addEventListener('abort', alCancelar, { once: true })
  })
}

// Una cancelación no es un fallo, no debe mostrarse como error en pantalla.
export function esCancelacion(error) {
  return error?.name === 'AbortError'
}
