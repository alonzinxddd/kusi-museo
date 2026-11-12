import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { cargarProgreso, guardarProgreso, PROGRESO_INICIAL } from '../servicios/almacenamiento'
import { coleccion, obtenerRecompensa } from '../datos/coleccion'

const ProgresoContexto = createContext(null)

function progresoInicial() {
  const datos = cargarProgreso()
  const recompensas = datos.recompensas.filter((id) => Boolean(obtenerRecompensa(id)))
  return {
    ...datos,
    recompensas,
    estrellas: Math.max(datos.estrellas, recompensas.length * 3),
  }
}

export function ProveedorProgreso({ children }) {
  const [progreso, setProgreso] = useState(progresoInicial)
  const [recompensaNueva, setRecompensaNueva] = useState(null)
  const [aviso, setAviso] = useState(null)
  const progresoRef = useRef(progreso)
  const temporizadorAviso = useRef(null)

  useEffect(() => {
    progresoRef.current = progreso
  }, [progreso])

  useEffect(() => () => clearTimeout(temporizadorAviso.current), [])

  const mostrarAviso = useCallback((mensaje) => {
    clearTimeout(temporizadorAviso.current)
    setAviso({ id: Date.now(), mensaje })
    temporizadorAviso.current = setTimeout(() => setAviso(null), 4800)
  }, [])

  const cerrarAviso = useCallback(() => {
    clearTimeout(temporizadorAviso.current)
    setAviso(null)
  }, [])

  const completarActividad = useCallback(
    (recompensaId) => {
      const recompensa = obtenerRecompensa(recompensaId)
      if (!recompensa) return false
      const actual = progresoRef.current
      if (actual.recompensas.includes(recompensaId)) {
        mostrarAviso(`«${recompensa.nombre}» ya está en tu colección. ¡Qué lindo volver a jugar!`)
        return false
      }
      const nuevo = {
        ...actual,
        estrellas: actual.estrellas + 3,
        recompensas: [...actual.recompensas, recompensaId],
      }
      progresoRef.current = nuevo
      setProgreso(nuevo)
      guardarProgreso(nuevo)
      setRecompensaNueva(recompensa)
      return true
    },
    [mostrarAviso],
  )

  const cerrarRecompensa = useCallback(() => setRecompensaNueva(null), [])

  const reiniciarProgreso = useCallback(() => {
    const nuevo = { ...PROGRESO_INICIAL, recompensas: [] }
    progresoRef.current = nuevo
    setProgreso(nuevo)
    guardarProgreso(nuevo)
    setRecompensaNueva(null)
    mostrarAviso('Tu paseo vuelve a empezar. Las estrellas están listas para otra aventura.')
  }, [mostrarAviso])

  const valor = useMemo(
    () => ({
      estrellas: progreso.estrellas,
      recompensas: progreso.recompensas,
      cantidadSellos: progreso.recompensas.length,
      totalSellos: coleccion.length,
      recompensaNueva,
      aviso,
      completarActividad,
      cerrarRecompensa,
      mostrarAviso,
      cerrarAviso,
      reiniciarProgreso,
      estaDesbloqueada: (id) => progreso.recompensas.includes(id),
    }),
    [progreso, recompensaNueva, aviso, completarActividad, cerrarRecompensa, mostrarAviso, cerrarAviso, reiniciarProgreso],
  )

  return <ProgresoContexto.Provider value={valor}>{children}</ProgresoContexto.Provider>
}

export function useProgreso() {
  const contexto = useContext(ProgresoContexto)
  if (!contexto) throw new Error('useProgreso debe usarse dentro de ProveedorProgreso')
  return contexto
}
