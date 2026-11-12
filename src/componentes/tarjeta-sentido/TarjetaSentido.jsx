import { useEffect, useRef, useState } from 'react'
import { Ear, Headphones, MapPin, Pause, Volume2 } from 'lucide-react'
import { hablar, vozDisponible } from '../../servicios/voz'
import './TarjetaSentido.css'

export function TarjetaSentido({ sentido, imagen, sonidoNombre, descripcionAudio }) {
  const [reproduciendo, setReproduciendo] = useState(null) // 'nombre' | 'descripcion' | null
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  const detener = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setReproduciendo(null)
  }

  useEffect(() => () => detener(), [])

  const reproducirNombre = () => {
    if (sonidoNombre) {
      if (reproduciendo === 'nombre') {
        detener()
        return
      }
      detener()
      setError('')
      const audio = new Audio(sonidoNombre)
      audioRef.current = audio
      audio.addEventListener('ended', () => {
        setReproduciendo(null)
        audioRef.current = null
      })
      audio.addEventListener('error', () => {
        setError('No pudimos reproducir este audio. Revisa el archivo.')
        setReproduciendo(null)
        audioRef.current = null
      })
      audio.play().catch(() => {
        setError('El navegador bloqueó el audio. Toca la imagen otra vez.')
        setReproduciendo(null)
        audioRef.current = null
      })
      setReproduciendo('nombre')
      return
    }

    if (vozDisponible()) {
      if (reproduciendo === 'nombre') {
        detener()
        return
      }
      detener()
      setError('')
      hablar(sentido.nombre, { velocidad: 1.0, tono: 1.08 })
      setReproduciendo('nombre')
      window.setTimeout(() => setReproduciendo(null), 2000)
      return
    }

    setError('Aún no hay sonido para este sentido.')
  }

  const reproducirDescripcion = () => {
    if (descripcionAudio) {
      if (reproduciendo === 'descripcion') {
        detener()
        return
      }
      detener()
      setError('')
      const audio = new Audio(descripcionAudio)
      audioRef.current = audio
      audio.addEventListener('ended', () => {
        setReproduciendo(null)
        audioRef.current = null
      })
      audio.addEventListener('error', () => {
        setError('No pudimos reproducir este audio. Revisa el archivo.')
        setReproduciendo(null)
        audioRef.current = null
      })
      audio.play().catch(() => {
        setError('El navegador bloqueó el audio. Toca el botón otra vez.')
        setReproduciendo(null)
        audioRef.current = null
      })
      setReproduciendo('descripcion')
      return
    }

    if (vozDisponible()) {
      if (reproduciendo === 'descripcion') {
        detener()
        return
      }
      detener()
      setError('')
      hablar(sentido.descripcion, { velocidad: 0.92 })
      setReproduciendo('descripcion')
      window.setTimeout(() => setReproduciendo(null), 4000)
      return
    }

    setError('Aún no hay descripción narrada para este sentido.')
  }

  const color = sentido.color || '#E8A598'
  const colorSuave = sentido.colorSuave || '#FBE4DE'

  return (
    <article
      className="tarjeta-sentido"
      style={{ '--color-sentido': color, '--color-suave-sentido': colorSuave }}
    >
      <button
        type="button"
        className="tarjeta-sentido__imagen-boton"
        onClick={reproducirNombre}
        aria-label={`Reproducir el nombre del sentido ${sentido.nombre}`}
      >
        <div className="tarjeta-sentido__imagen">
          <img src={imagen} alt={sentido.nombre} loading="lazy" />
        </div>
        <span className="tarjeta-sentido__pista">
          <Volume2 size={14} strokeWidth={2.4} aria-hidden="true" />
          Toca para oír el sentido
        </span>
      </button>

      <div className="tarjeta-sentido__cuerpo">
        <span className="tarjeta-sentido__organo">
          <Ear size={14} strokeWidth={2.4} aria-hidden="true" />
          {sentido.organo}
        </span>
        <h3 className="tarjeta-sentido__nombre">{sentido.nombre}</h3>
        <p className="tarjeta-sentido__descripcion">{sentido.descripcion}</p>

        {error && <p className="tarjeta-sentido__error" role="status">{error}</p>}

        <div className="tarjeta-sentido__acciones">
          <button
            type="button"
            className={`boton boton--pequeno tarjeta-sentido__boton${
              reproduciendo === 'descripcion' ? ' tarjeta-sentido__boton--activo' : ''
            }`}
            onClick={reproducirDescripcion}
            aria-pressed={reproduciendo === 'descripcion'}
            aria-label={
              reproduciendo === 'descripcion'
                ? `Detener la descripción de ${sentido.nombre}`
                : `Escuchar la descripción de ${sentido.nombre}`
            }
          >
            {reproduciendo === 'descripcion' ? (
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
