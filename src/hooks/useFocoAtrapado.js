import { useEffect } from 'react'

// Elementos que pueden recibir foco con la tecla Tab.
const SELECTOR_ENFOCABLES =
  'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/* ------------------------------------------------------------
   Hook personalizado para ventanas que se abren sobre la página. 

   1. Al abrir, guarda dónde estaba el foco y lo pasa a focoInicialRef.
   2. Escape cierra la ventana.
   3. Tab y Shift+Tab dan la vuelta dentro de la ventana.
   4. Bloquea el scroll de la página de fondo mientras está abierta.
   5. Al cerrar, devuelve el foco al botón que la abrió.
   ------------------------------------------------------------ */
export function useFocoAtrapado(contenedorRef, focoInicialRef, onCerrar) {
  // Pasos 1, 4 y 5: se ejecutan al abrir y la limpieza al cerrar.
  useEffect(() => {
    const elementoPrevio = document.activeElement
    focoInicialRef.current?.focus()
    document.body.classList.add('sin-scroll')

    return () => {
      document.body.classList.remove('sin-scroll')
      elementoPrevio?.focus()
    }
  }, [focoInicialRef])

  // Pasos 2 y 3: escucha el teclado mientras la ventana está abierta.
  useEffect(() => {
    const manejarTeclado = evento => {
      if (evento.key === 'Escape') {
        onCerrar()
        return
      }
      if (evento.key !== 'Tab' || !contenedorRef.current) return

      const enfocables = contenedorRef.current.querySelectorAll(SELECTOR_ENFOCABLES)
      if (enfocables.length === 0) return
      const primero = enfocables[0]
      const ultimo = enfocables[enfocables.length - 1]
      const focoFuera = !contenedorRef.current.contains(document.activeElement)

      if (evento.shiftKey && (document.activeElement === primero || focoFuera)) {
        evento.preventDefault()
        ultimo.focus()
      } else if (!evento.shiftKey && (document.activeElement === ultimo || focoFuera)) {
        evento.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', manejarTeclado)
    return () => document.removeEventListener('keydown', manejarTeclado)
  }, [contenedorRef, onCerrar])
}
