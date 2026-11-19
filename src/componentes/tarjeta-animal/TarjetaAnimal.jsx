import { useEffect, useRef, useState } from 'react'
import { Headphones, MapPin, Pause, Play, Volume2 } from 'lucide-react'
import { hablar, detenerVoz, vozDisponible } from '../../servicios/voz'
import './TarjetaAnimal.css'

/**
 * Tarjeta de un animal.
 *
 * Recibe todo por props para ser totalmente reutilizable:
 *  - animal: { id, nombre, ubicacion, descripcion, color, colorSuave }
 *  - imagen: URL de la imagen
 *  - sonido: URL del audio del efecto de sonido del animal
 *  - descripcionAudio: URL del audio narrado de la descripción
 */
export function TarjetaAnimal({ animal, imagen, sonido, descripcionAudio }) {
  const [reproduciendo, setReproduciendo] = useState(null) // 'sonido' | 'descripcion' | null
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  const detener = () => {
    detenerVoz()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setReproduciendo(null)
  }

  useEffect(() => () => detener(), [])

  const reproducir = (tipo, url) => {
    if (reproduciendo === tipo) {
      detener()
      return
    }

    detener()
    setError('')

    // Si es descripción y hay archivo grabado, lo reproduce; si no, la lee con la voz del robot
    if (tipo === 'descripcion') {
      const textoVoz = `${animal.nombre}. ${animal.descripcion}`

      if (url) {
        const audio = new Audio(url)
        audioRef.current = audio
        audio.addEventListener('ended', () => {
          setReproduciendo(null)
          audioRef.current = null
        })
        audio.addEventListener('error', () => {
          // Si falla el archivo, respaldo con voz sintetizada
          if (vozDisponible()) {
            hablar(textoVoz, {
              onEnd: () => setReproduciendo(null),
              onError: () => setReproduciendo(null),
            })
            setReproduciendo('descripcion')
          }
        })
        audio.play().catch(() => {
          if (vozDisponible()) {
            hablar(textoVoz, {
              onEnd: () => setReproduciendo(null),
              onError: () => setReproduciendo(null),
            })
            setReproduciendo('descripcion')
          }
        })
        setReproduciendo('descripcion')
        return
      }

      if (vozDisponible()) {
        hablar(textoVoz, {
          onEnd: () => setReproduciendo(null),
          onError: () => setReproduciendo(null),
        })
        setReproduciendo('descripcion')
        return
      }

      setError('La voz no está disponible en este dispositivo.')
      return
    }

    // Si es efecto de sonido
    if (!url) {
      setError('Aún no hay sonido para este animal. Agrega el archivo en src/activos/audios/sonido/.')
      return
    }

    const audio = new Audio(url)
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
    setReproduciendo(tipo)
  }

  const color = animal.color || '#D97757'
  const colorSuave = animal.colorSuave || '#F8E1D5'

  return (
    <article
      className="tarjeta-animal"
      style={{ '--color-animal': color, '--color-suave-animal': colorSuave }}
    >
      <div className="tarjeta-animal__imagen">
        <img src={imagen} alt={animal.nombre} loading="lazy" />
        <span className="tarjeta-animal__ubicacion">
          <MapPin size={14} strokeWidth={2.4} aria-hidden="true" />
          {animal.ubicacion}
        </span>
      </div>

      <div className="tarjeta-animal__cuerpo">
        <h3 className="tarjeta-animal__nombre">{animal.nombre}</h3>
        <p className="tarjeta-animal__descripcion">{animal.descripcion}</p>

        {error && <p className="tarjeta-animal__error" role="status">{error}</p>}

        <div className="tarjeta-animal__acciones">
          <button
            type="button"
            className={`boton boton--pequeno tarjeta-animal__boton tarjeta-animal__boton--sonido${
              reproduciendo === 'sonido' ? ' tarjeta-animal__boton--activo' : ''
            }`}
            onClick={() => reproducir('sonido', sonido)}
            disabled={!sonido}
            aria-pressed={reproduciendo === 'sonido'}
            aria-label={
              reproduciendo === 'sonido'
                ? `Detener el sonido de ${animal.nombre}`
                : `Reproducir el sonido de ${animal.nombre}`
            }
          >
            {reproduciendo === 'sonido' ? (
              <Pause size={16} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Volume2 size={16} strokeWidth={2.2} aria-hidden="true" />
            )}
            Reproducir Sonido
          </button>

          <button
            type="button"
            className={`boton boton--pequeno tarjeta-animal__boton tarjeta-animal__boton--descripcion${
              reproduciendo === 'descripcion' ? ' tarjeta-animal__boton--activo' : ''
            }`}
            onClick={() => reproducir('descripcion', descripcionAudio)}
            aria-pressed={reproduciendo === 'descripcion'}
            aria-label={
              reproduciendo === 'descripcion'
                ? `Detener la descripción de ${animal.nombre}`
                : `Escuchar la descripción de ${animal.nombre}`
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
