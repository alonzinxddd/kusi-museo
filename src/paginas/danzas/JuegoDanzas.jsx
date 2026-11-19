import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { danzasDelJuego } from '../../datos/juego-danzas'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { hablar, detenerVoz, vozDisponible } from '../../servicios/voz'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import { Volume2, CheckCircle2, RotateCcw, Sparkles, MapPin } from 'lucide-react'
import './JuegoDanzas.css'

export function JuegoDanzas() {
  const { idSala } = useParams()
  const sala = obtenerSala(idSala)
  const { completarActividad } = useProgreso()
  const { reproducir } = useSonido()

  const [indiceObjetivo, setIndiceObjetivo] = useState(0) // Índice de la danza que la voz pide buscar
  const [aciertos, setAciertos] = useState([]) // IDs de danzas acertadas
  const [retroalimentacion, setRetroalimentacion] = useState('')
  const [animacionError, setAnimacionError] = useState(null)
  const celebradoRef = useRef(false)

  useTitulo('Escucha y Descubre las Danzas')

  const objetivoActual = danzasDelJuego[indiceObjetivo]
  const juegoCompleto = aciertos.length === danzasDelJuego.length

  const decirObjetivo = (danza) => {
    if (!danza) return
    const texto = `¿Dónde está: ${danza.nombre}? ${danza.frase}`
    setRetroalimentacion(`Escucha: ¿Dónde está ${danza.nombre}?`)
    detenerVoz()
    if (vozDisponible()) {
      hablar(texto)
    }
  }

  // Al cargar o cambiar de objetivo
  useEffect(() => {
    if (!juegoCompleto && objetivoActual) {
      const timer = setTimeout(() => {
        decirObjetivo(objetivoActual)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [indiceObjetivo, juegoCompleto])

  const manejarClickDanza = (danza) => {
    if (juegoCompleto) return
    detenerVoz()

    if (danza.id === objetivoActual.id) {
      // ¡Acierto!
      const nuevosAciertos = [...aciertos, danza.id]
      setAciertos(nuevosAciertos)
      reproducir('campanita', { volumen: 0.55 })

      if (nuevosAciertos.length === danzasDelJuego.length) {
        setRetroalimentacion(`¡Excelente! ¡Encontraste todas las danzas del Perú!`)
        if (vozDisponible()) {
          hablar(`¡Felicitaciones! ¡Reconociste la Marinera, la Anaconda y el Huayno! ¡Eres genial!`)
        }
        if (!celebradoRef.current) {
          celebradoRef.current = true
          setTimeout(() => completarActividad('cuento-cultura'), 600)
        }
      } else {
        setRetroalimentacion(`¡Muy bien! ¡Es ${danza.nombre}!`)
        if (vozDisponible()) {
          hablar(`¡Muy bien! ¡Es ${danza.nombre}!`)
        }
        setTimeout(() => {
          setIndiceObjetivo((prev) => prev + 1)
        }, 1600)
      }
    } else {
      // Intento incorrecto
      setAnimacionError(danza.id)
      setTimeout(() => setAnimacionError(null), 700)
      setRetroalimentacion(`Esa es ${danza.nombre}. ¡Inténtalo de nuevo!`)
      if (vozDisponible()) {
        hablar(`Esa es ${danza.nombre}. Busca: ${objetivoActual.nombre}`)
      }
    }
  }

  const reiniciarJuego = () => {
    detenerVoz()
    setAciertos([])
    setIndiceObjetivo(0)
    celebradoRef.current = false
    setRetroalimentacion('')
    setTimeout(() => {
      decirObjetivo(danzasDelJuego[0])
    }, 300)
  }

  if (!sala || (sala.id !== 'cultura' && sala.id !== 'colores')) {
    return (
      <NoEncontrada
        titulo="Esta actividad está en la sala de Cultura y Tradiciones"
        mensaje="Vuelve al inicio para explorar las danzas típicas."
      />
    )
  }

  return (
    <MarcoActividad
      sala={sala}
      titulo="Escucha y Descubre las Danzas"
      descripcion="Kusi mencionará una danza típica en voz alta. ¡Mira bien las 3 imágenes y toca la correcta!"
      bienvenida="¡Hola! Escucha con mucha atención la voz de Kusi y toca la imagen de la danza que te pida."
      className="juego-danzas"
      acciones={
        <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
          Volver a la sala
        </Link>
      }
    >
      <div className="juego-danzas__contenedor">
        {/* Panel del locutor / Voz */}
        <div className="juego-danzas__panel-voz">
          <div className="juego-danzas__indicador">
            <span className="juego-danzas__icono-onda" aria-hidden="true">
              <Volume2 size={24} strokeWidth={2.4} />
            </span>
            <div className="juego-danzas__instruccion">
              {!juegoCompleto ? (
                <>
                  <p className="juego-danzas__turno">
                    Danza {indiceObjetivo + 1} de {danzasDelJuego.length}
                  </p>
                  <h2>
                    Busca: <span>{objetivoActual?.nombre}</span>
                  </h2>
                </>
              ) : (
                <h2>¡Completaste las 3 Danzas! 🎉</h2>
              )}
              {retroalimentacion && (
                <p className="juego-danzas__subtexto">{retroalimentacion}</p>
              )}
            </div>
          </div>

          <div className="juego-danzas__acciones-voz">
            {!juegoCompleto && (
              <button
                type="button"
                className="boton boton--secundario boton--pequeno"
                onClick={() => decirObjetivo(objetivoActual)}
              >
                <Volume2 size={16} strokeWidth={2.4} aria-hidden="true" />
                Repetir la voz
              </button>
            )}
            <button
              type="button"
              className="boton boton--fantasma boton--pequeno"
              onClick={reiniciarJuego}
            >
              <RotateCcw size={16} strokeWidth={2.2} aria-hidden="true" />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Las 3 imágenes de danzas */}
        <div className="juego-danzas__grilla">
          {danzasDelJuego.map((danza) => {
            const yaAcertada = aciertos.includes(danza.id)
            const esError = animacionError === danza.id

            return (
              <button
                key={danza.id}
                type="button"
                className={`tarjeta-danza-juego${
                  yaAcertada ? ' tarjeta-danza-juego--acertada' : ''
                }${esError ? ' tarjeta-danza-juego--error' : ''}`}
                onClick={() => manejarClickDanza(danza)}
                disabled={yaAcertada}
                style={{
                  '--color-danza': danza.color,
                  '--color-suave-danza': danza.colorSuave,
                }}
                aria-label={`Danza ${danza.nombre}`}
              >
                <div className="tarjeta-danza-juego__marco-foto">
                  <img src={danza.imagen} alt={danza.nombre} />
                  <span className="tarjeta-danza-juego__etiqueta">
                    <MapPin size={13} strokeWidth={2.4} aria-hidden="true" />
                    {danza.region}
                  </span>
                  {yaAcertada && (
                    <div className="tarjeta-danza-juego__check-overlay animar-escala">
                      <CheckCircle2 size={54} strokeWidth={2.5} />
                      <span>¡Correcto!</span>
                    </div>
                  )}
                </div>

                <div className="tarjeta-danza-juego__pie">
                  <h3>{danza.nombre}</h3>
                </div>
              </button>
            )
          })}
        </div>

        {juegoCompleto && (
          <div className="juego-danzas__logro animar-escala">
            <Sparkles size={36} strokeWidth={2} />
            <div>
              <h3>¡Sello de Cultura Desbloqueado!</h3>
              <p>Reconociste con éxito la Marinera, la Danza de la Anaconda y el Huayno.</p>
            </div>
            <Link to="/mi-rincon" className="boton boton--primario">
              Ver mi colección
            </Link>
          </div>
        )}
      </div>
    </MarcoActividad>
  )
}
