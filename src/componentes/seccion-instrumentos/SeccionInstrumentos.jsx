import { useState, useRef, useEffect } from 'react'
import { instrumentosListos } from '../../datos/instrumentos'
import { Headphones, Volume2, Pause, Music, Sparkles } from 'lucide-react'
import { hablar, detenerVoz, vozDisponible } from '../../servicios/voz'
import './SeccionInstrumentos.css'

export function SeccionInstrumentos() {
  const [reproduciendo, setReproduciendo] = useState(null) // { id, tipo: 'sonido' | 'descripcion' }
  const [error, setError] = useState(null)
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

  // Síntesis de notas musicales con Web Audio si no hay archivo de audio aún
  const reproducirSintetizado = (id) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      const frecuencias = {
        piano: [261.63, 329.63, 392.0, 523.25], // Do Mi Sol Do (acorde)
        guitarra: [196.0, 246.94, 329.63, 392.0],
        flauta: [523.25, 587.33, 659.25, 783.99],
        tambor: [110, 85, 60],
      }

      const freqs = frecuencias[id] || [440, 554, 659]

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = id === 'flauta' ? 'sine' : id === 'tambor' ? 'triangle' : 'triangle'
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12)

        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.8)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + i * 0.12)
        osc.stop(ctx.currentTime + i * 0.12 + 0.85)
      })

      setTimeout(() => {
        setReproduciendo(null)
      }, 1200)
    } catch {
      setReproduciendo(null)
    }
  }

  const reproducirAudio = (instrumento, tipo) => {
    if (reproduciendo?.id === instrumento.id && reproduciendo?.tipo === tipo) {
      detener()
      return
    }

    detener()
    setError(null)

    if (tipo === 'descripcion') {
      const textoVoz = `${instrumento.nombre}. ${instrumento.descripcion}`

      if (instrumento.descripcionAudio) {
        const audio = new Audio(instrumento.descripcionAudio)
        audioRef.current = audio
        audio.addEventListener('ended', () => {
          setReproduciendo(null)
          audioRef.current = null
        })
        audio.addEventListener('error', () => {
          if (vozDisponible()) {
            hablar(textoVoz, { onEnd: () => setReproduciendo(null) })
            setReproduciendo({ id: instrumento.id, tipo: 'descripcion' })
          }
        })
        audio.play().catch(() => {
          if (vozDisponible()) {
            hablar(textoVoz, { onEnd: () => setReproduciendo(null) })
            setReproduciendo({ id: instrumento.id, tipo: 'descripcion' })
          }
        })
        setReproduciendo({ id: instrumento.id, tipo: 'descripcion' })
        return
      }

      if (vozDisponible()) {
        hablar(textoVoz, {
          onEnd: () => setReproduciendo(null),
          onError: () => setReproduciendo(null),
        })
        setReproduciendo({ id: instrumento.id, tipo: 'descripcion' })
        return
      }

      setError('No se pudo reproducir la narración en este momento.')
      return
    }

    // Si es sonido del instrumento
    if (instrumento.sonido) {
      const audio = new Audio(instrumento.sonido)
      audioRef.current = audio
      audio.addEventListener('ended', () => {
        setReproduciendo(null)
        audioRef.current = null
      })
      audio.addEventListener('error', () => {
        reproducirSintetizado(instrumento.id)
      })
      audio.play().catch(() => {
        reproducirSintetizado(instrumento.id)
      })
      setReproduciendo({ id: instrumento.id, tipo: 'sonido' })
    } else {
      setReproduciendo({ id: instrumento.id, tipo: 'sonido' })
      reproducirSintetizado(instrumento.id)
    }
  }

  return (
    <section className="seccion-instrumentos" aria-labelledby="titulo-instrumentos">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">
            <Music size={14} aria-hidden="true" />
            Conoce los instrumentos
          </p>
          <h2 id="titulo-instrumentos">Instrumentos musicales</h2>
        </div>
        <p>
          Toca cada tarjeta para escuchar cómo suena o para que la voz te cuente su historia y
          características.
        </p>
      </div>

      <div className="seccion-instrumentos__grilla animar-aparecer">
        {instrumentosListos.map((inst) => {
          const sonandoSonido = reproduciendo?.id === inst.id && reproduciendo?.tipo === 'sonido'
          const sonandoDesc = reproduciendo?.id === inst.id && reproduciendo?.tipo === 'descripcion'

          return (
            <article
              key={inst.id}
              className="tarjeta-instrumento"
              style={{
                '--color-instrumento': inst.color,
                '--color-suave-instrumento': inst.colorSuave,
              }}
            >
              <div className="tarjeta-instrumento__imagen">
                {inst.imagen ? (
                  <img src={inst.imagen} alt={inst.nombre} loading="lazy" />
                ) : (
                  <div className="tarjeta-instrumento__placeholder">
                    <Music size={42} strokeWidth={1.8} aria-hidden="true" />
                    <span>{inst.nombre}</span>
                  </div>
                )}
                <span className="tarjeta-instrumento__familia">
                  <Music size={13} strokeWidth={2.4} aria-hidden="true" />
                  {inst.familia}
                </span>
              </div>

              <div className="tarjeta-instrumento__cuerpo">
                <h3 className="tarjeta-instrumento__nombre">{inst.nombre}</h3>
                <p className="tarjeta-instrumento__descripcion">{inst.descripcion}</p>

                <div className="tarjeta-instrumento__acciones">
                  <button
                    type="button"
                    className={`boton boton--pequeno tarjeta-instrumento__boton tarjeta-instrumento__boton--sonido${sonandoSonido ? ' tarjeta-instrumento__boton--activo' : ''
                      }`}
                    onClick={() => reproducirAudio(inst, 'sonido')}
                    aria-label={`Reproducir sonido de ${inst.nombre}`}
                  >
                    {sonandoSonido ? (
                      <Pause size={16} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                      <Volume2 size={16} strokeWidth={2.2} aria-hidden="true" />
                    )}
                    Reproducir Sonido
                  </button>

                  <button
                    type="button"
                    className={`boton boton--pequeno tarjeta-instrumento__boton tarjeta-instrumento__boton--descripcion${sonandoDesc ? ' tarjeta-instrumento__boton--activo' : ''
                      }`}
                    onClick={() => reproducirAudio(inst, 'descripcion')}
                    aria-label={`Escuchar descripción de ${inst.nombre}`}
                  >
                    {sonandoDesc ? (
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
        })}
      </div>
    </section>
  )
}
