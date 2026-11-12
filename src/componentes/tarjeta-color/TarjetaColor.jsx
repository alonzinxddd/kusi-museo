import { useEffect, useRef, useState } from 'react'
import { Headphones, MapPin, Pause, Volume2 } from 'lucide-react'
import { hablar, vozDisponible } from '../../servicios/voz'
import './TarjetaColor.css'

export function TarjetaColor({ color, sonidoColor, descripcionAudio }) {
  const [reproduciendo, setReproduciendo] = useState(null) // 'color' | 'descripcion' | null
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

  const reproducirSonidoColor = () => {
    if (sonidoColor) {
      if (reproduciendo === 'color') {
        detener()
        return
      }
      detener()
      setError('')
      const audio = new Audio(sonidoColor)
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
        setError('El navegador bloqueó el audio. Toca el color otra vez.')
        setReproduciendo(null)
        audioRef.current = null
      })
      setReproduciendo('color')
      return
    }

    if (vozDisponible()) {
      if (reproduciendo === 'color') {
        detener()
        return
      }
      detener()
      setError('')
      hablar(`¡${color.nombreCorto}!`, { velocidad: 1.05, tono: 1.1 })
      setReproduciendo('color')
      window.setTimeout(() => setReproduciendo(null), 1600)
      return
    }

    setError('Aún no hay sonido para este color.')
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

    // Respaldo con la voz del navegador: lee la descripción.
    if (vozDisponible()) {
      if (reproduciendo === 'descripcion') {
        detener()
        return
      }
      detener()
      setError('')
      hablar(color.descripcion, { velocidad: 0.92 })
      setReproduciendo('descripcion')
      window.setTimeout(() => setReproduciendo(null), 4000)
      return
    }

    setError('Aún no hay descripción narrada para este color.')
  }

  const colorHex = color.colorHex || '#D97757'
  const colorSuave = color.colorSuave || '#F8E1D5'

  return (
    <article
      className="tarjeta-color"
      style={{ '--color-tarjeta': colorHex, '--color-suave-tarjeta': colorSuave }}
    >
      <button
        type="button"
        className="tarjeta-color__bloque-boton"
        onClick={reproducirSonidoColor}
        aria-label={`Reproducir el sonido del color ${color.nombreCorto}`}
      >
        <div
          className="tarjeta-color__bloque"
          style={{ backgroundColor: colorHex }}
        >
          <span className="tarjeta-color__nombre-grande">{color.nombreCorto}</span>
        </div>
        <span className="tarjeta-color__pista">
          <Volume2 size={14} strokeWidth={2.4} aria-hidden="true" />
          Toca para oír el color
        </span>
      </button>

      <div className="tarjeta-color__cuerpo">
        <span className="tarjeta-color__ubicacion">
          <MapPin size={14} strokeWidth={2.4} aria-hidden="true" />
          {color.ubicacion}
        </span>
        <h3 className="tarjeta-color__nombre">{color.nombre}</h3>
        <p className="tarjeta-color__descripcion">{color.descripcion}</p>

        {error && <p className="tarjeta-color__error" role="status">{error}</p>}

        <div className="tarjeta-color__acciones">
          <button
            type="button"
            className={`boton boton--pequeno tarjeta-color__boton${
              reproduciendo === 'descripcion' ? ' tarjeta-color__boton--activo' : ''
            }`}
            onClick={reproducirDescripcion}
            aria-pressed={reproduciendo === 'descripcion'}
            aria-label={
              reproduciendo === 'descripcion'
                ? `Detener la descripción de ${color.nombreCorto}`
                : `Escuchar la descripción de ${color.nombreCorto}`
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
