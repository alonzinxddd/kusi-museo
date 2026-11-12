import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { cargarPreferenciaSonido, guardarPreferenciaSonido } from '../servicios/almacenamiento'
import { reproducirArchivo } from '../servicios/audio'

const SonidoContexto = createContext(null)

export function ProveedorSonido({ children }) {
  const [silenciado, setSilenciado] = useState(() => cargarPreferenciaSonido())
  const activos = useRef(new Set())

  const detenerTodos = useCallback(() => {
    activos.current.forEach((audio) => {
      try {
        audio.pause()
        audio.currentTime = 0
      } catch {
        // Si el audio ya terminó, no hay nada que detener.
      }
    })
    activos.current.clear()
  }, [])

  const reproducir = useCallback(
    (nombre, opciones) => {
      if (silenciado) return false
      const audio = reproducirArchivo(nombre, opciones)
      if (!audio) return false
      activos.current.add(audio)
      audio.addEventListener('ended', () => activos.current.delete(audio))
      return true
    },
    [silenciado],
  )

  const alternarSonido = useCallback(() => {
    setSilenciado((anterior) => {
      const nuevo = !anterior
      guardarPreferenciaSonido(nuevo)
      if (nuevo) detenerTodos()
      return nuevo
    })
  }, [detenerTodos])

  useEffect(() => () => detenerTodos(), [detenerTodos])

  const valor = useMemo(
    () => ({ silenciado, alternarSonido, reproducir, detenerTodos }),
    [silenciado, alternarSonido, reproducir, detenerTodos],
  )

  return <SonidoContexto.Provider value={valor}>{children}</SonidoContexto.Provider>
}

export function useSonido() {
  const contexto = useContext(SonidoContexto)
  if (!contexto) throw new Error('useSonido debe usarse dentro de ProveedorSonido')
  return contexto
}
