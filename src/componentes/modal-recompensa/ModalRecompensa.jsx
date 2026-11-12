import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, X } from 'lucide-react'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { Icono } from '../icono/Icono'
import './ModalRecompensa.css'

export function ModalRecompensa() {
  const { recompensaNueva, cerrarRecompensa, estrellas } = useProgreso()
  const { reproducir } = useSonido()
  const navegar = useNavigate()
  const dialogoRef = useRef(null)

  useEffect(() => {
    const dialogo = dialogoRef.current
    if (!dialogo) return undefined
    if (recompensaNueva) {
      if (!dialogo.open) {
        dialogo.showModal()
        reproducir('campanita', { volumen: 0.6 })
      }
      document.body.classList.add('sin-desplazamiento')
    } else if (dialogo.open) {
      dialogo.close()
    }
    return () => document.body.classList.remove('sin-desplazamiento')
  }, [recompensaNueva, reproducir])

  useEffect(
    () => () => {
      document.body.classList.remove('sin-desplazamiento')
    },
    [],
  )

  const irAMiRincon = () => {
    cerrarRecompensa()
    navegar('/mi-rincon')
  }

  return (
    <dialog
      ref={dialogoRef}
      className="modal-recompensa"
      aria-labelledby="titulo-recompensa"
      onClose={cerrarRecompensa}
      onClick={(evento) => {
        if (evento.target === dialogoRef.current) cerrarRecompensa()
      }}
    >
      {recompensaNueva && (
        <div className="modal-recompensa__caja">
          <div className="modal-recompensa__destellos" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, indice) => (
              <Star
                key={indice}
                size={18}
                fill="currentColor"
                strokeWidth={1.4}
                style={{ '--indice': indice }}
              />
            ))}
          </div>

          <button
            type="button"
            className="modal-recompensa__cerrar"
            onClick={cerrarRecompensa}
            aria-label="Cerrar la recompensa"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <p className="modal-recompensa__sobre">Nueva estrella en tu colección</p>

          <div
            className="modal-recompensa__sello animar-latido"
            style={{
              '--color-sello': recompensaNueva.color,
              '--color-suave-sello': recompensaNueva.colorSuave,
            }}
          >
            <Icono nombre={recompensaNueva.icono} tamano={52} />
          </div>

          <h2 id="titulo-recompensa">{recompensaNueva.nombre}</h2>
          <p className="modal-recompensa__descripcion">{recompensaNueva.descripcion}</p>

          <div className="modal-recompensa__puntos">
            <Star size={20} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
            <strong>+3 estrellitas</strong>
            <span>Ahora tienes {estrellas}</span>
          </div>

          <div className="modal-recompensa__acciones">
            <button type="button" className="boton boton--primario" onClick={cerrarRecompensa}>
              Seguir explorando
            </button>
            <button type="button" className="boton boton--secundario" onClick={irAMiRincon}>
              Ver mi rincón
            </button>
          </div>

          <p className="modal-recompensa__nota">Sin competencia: este sello es solo tuyo.</p>
        </div>
      )}
    </dialog>
  )
}
