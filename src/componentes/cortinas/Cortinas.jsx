import { useState } from 'react'
import cortinaIzq from '../../activos/imagenes/cortina-izquierda.svg'
import cortinaDer from '../../activos/imagenes/cortina-derecha.svg'
import { useSonido } from '../../contextos/SonidoContexto'
import { hablar, vozDisponible } from '../../servicios/voz'
import './Cortinas.css'

const BIENVENIDA = '¡Bienvenidos al Museo Infantil Kusi!'

export function Cortinas({ imagen, alt = 'Portada del museo' }) {
  const { reproducir } = useSonido()
  const [abiertas, setAbiertas] = useState(false)

  const abrir = () => {
    if (abiertas) return
    setAbiertas(true)
    reproducir('campanita', { volumen: 0.55 })
    if (vozDisponible()) {
      window.setTimeout(() => hablar(BIENVENIDA, { velocidad: 0.9, tono: 1.05 }), 400)
    }
  }

  return (
    <div
      className={`cortinas${abiertas ? ' cortinas--abiertas' : ''}`}
      onClick={abrir}
      role="button"
      tabIndex={0}
      aria-label={abiertas ? 'Cortinas abiertas' : 'Toca para abrir las cortinas'}
      onKeyDown={(evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault()
          abrir()
        }
      }}
    >
      <img className="cortinas__fondo" src={imagen} alt={alt} />

      <div className="cortinas__velo" aria-hidden="true" />

      <img
        className="cortinas__tela cortinas__tela--izquierda"
        src={cortinaIzq}
        alt=""
        aria-hidden="true"
      />
      <img
        className="cortinas__tela cortinas__tela--derecha"
        src={cortinaDer}
        alt=""
        aria-hidden="true"
      />

      <div className="cortinas__serpentinas" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, indice) => (
          <span
            key={indice}
            className="cortinas__serpentina"
            style={{ '--indice': indice }}
          />
        ))}
      </div>

      {!abiertas && (
        <div className="cortinas__invitacion" aria-hidden="true">
          <span className="cortinas__invitacion-texto">Toca para abrir</span>
          <span className="cortinas__invitacion-icono">✦</span>
        </div>
      )}
    </div>
  )
}

