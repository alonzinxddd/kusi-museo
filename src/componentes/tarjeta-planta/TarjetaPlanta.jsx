import { useEffect, useRef, useState } from 'react'
import { Headphones, MapPin, Pause, Play } from 'lucide-react'
import './TarjetaPlanta.css'

export function TarjetaPlanta({ planta, imagen, descripcionAudio }) {
  const [reproduciendo, setReproduciendo] = useState(false)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  const detener = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setReproduciendo(false)
  }

  useEffect(() => () => detener(), [])

  const alternar = () => {
    if (!descripcionAudio) {
      setError('Aún no hay descripción narrada. Agrega el archivo en src/activos/audios/descripcion-plantas/.')
      return
    }

    if (reproduciendo) {
      detener()
      return
    }

    setError('')
    const audio = new Audio(descripcionAudio)
    audioRef.current = audio
    audio.addEventListener('ended', () => {
      setReproduciendo(false)
      audioRef.current = null
    })
    audio.addEventListener('error', () => {
      setError('No pudimos reproducir este audio. Revisa el archivo.')
      setReproduciendo(false)
      audioRef.current = null
    })
    audio.play().catch(() => {
      setError('El navegador bloqueó el audio. Toca el botón otra vez.')
      setReproduciendo(false)
      audioRef.current = null
    })
    setReproduciendo(true)
  }

  const color = planta.color || '#6E8A70'
  const colorSuave = planta.colorSuave || '#E2EBDD'

  return (
    <article
      className="tarjeta-planta"
      style={{ '--color-planta': color, '--color-suave-planta': colorSuave }}
    >
      <div className="tarjeta-planta__imagen">
        <img src={imagen} alt={planta.nombre} loading="lazy" />
        <span className="tarjeta-planta__ubicacion">
          <MapPin size={14} strokeWidth={2.4} aria-hidden="true" />
          {planta.ubicacion}
        </span>
      </div>

      <div className="tarjeta-planta__cuerpo">
        <h3 className="tarjeta-planta__nombre">{planta.nombre}</h3>
        <p className="tarjeta-planta__descripcion">{planta.descripcion}</p>

        {error && <p className="tarjeta-planta__error" role="status">{error}</p>}

        <div className="tarjeta-planta__acciones">
          <button
            type="button"
            className={`boton boton--pequeno tarjeta-planta__boton${
              reproduciendo ? ' tarjeta-planta__boton--activo' : ''
            }`}
            onClick={alternar}
            disabled={!descripcionAudio}
            aria-pressed={reproduciendo}
            aria-label={
              reproduciendo
                ? `Detener la descripción de ${planta.nombre}`
                : `Escuchar la descripción de ${planta.nombre}`
            }
          >
            {reproduciendo ? (
              <Pause size={16} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Headphones size={16} strokeWidth={2.2} aria-hidden="true" />
            )}
            Escuchar Descripción
          </button>
        </div>
      </div>
    </article>
  )
}
