import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  cargarGaleria,
  guardarGaleria,
  MAXIMO_GALERIA,
} from '../servicios/almacenamiento'
import { generarId } from '../utilidades/ayudas'

const GaleriaContexto = createContext(null)

export function ProveedorGaleria({ children }) {
  const [creaciones, setCreaciones] = useState(() => cargarGaleria())
  const creacionesRef = useRef(creaciones)

  useEffect(() => {
    creacionesRef.current = creaciones
  }, [creaciones])

  const guardarCreacion = useCallback((datos) => {
    const actual = creacionesRef.current
    if (actual.length >= MAXIMO_GALERIA) {
      return { ok: false, motivo: 'lleno' }
    }
    const nueva = {
      id: generarId(),
      fecha: new Date().toISOString(),
      ...datos,
    }
    const lista = [nueva, ...actual]
    if (!guardarGaleria(lista)) {
      return { ok: false, motivo: 'almacenamiento' }
    }
    creacionesRef.current = lista
    setCreaciones(lista)
    return { ok: true, creacion: nueva }
  }, [])

  const eliminarCreacion = useCallback((id) => {
    const lista = creacionesRef.current.filter((creacion) => creacion.id !== id)
    guardarGaleria(lista)
    creacionesRef.current = lista
    setCreaciones(lista)
  }, [])

  const borrarGaleria = useCallback(() => {
    guardarGaleria([])
    creacionesRef.current = []
    setCreaciones([])
  }, [])

  const valor = useMemo(
    () => ({
      creaciones,
      guardarCreacion,
      eliminarCreacion,
      borrarGaleria,
      maximo: MAXIMO_GALERIA,
    }),
    [creaciones, guardarCreacion, eliminarCreacion, borrarGaleria],
  )

  return <GaleriaContexto.Provider value={valor}>{children}</GaleriaContexto.Provider>
}

export function useGaleria() {
  const contexto = useContext(GaleriaContexto)
  if (!contexto) throw new Error('useGaleria debe usarse dentro de ProveedorGaleria')
  return contexto
}
