import { useEffect } from 'react'

/**
 * Cambia el título de la pestaña del navegador.
 */
export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Kusi` : 'Kusi · Museo virtual infantil'
  }, [titulo])
}
