import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { preguntasTradicion } from '../../datos/juego-tradicion'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { hablar, detenerVoz, vozDisponible } from '../../servicios/voz'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import { Volume2, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react'
import './JuegoTradicion.css'

export function JuegoTradicion() {
  const { idSala } = useParams()
  const sala = obtenerSala(idSala || 'cultura')
  const { completarActividad } = useProgreso()
  const { reproducir } = useSonido()

  const [actual, setActual] = useState(0)
  const [puntos, setPuntos] = useState(0)
  const [respondido, setRespondido] = useState(false)
  const [seleccionado, setSeleccionado] = useState(null)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const celebradoRef = useRef(false)

  useTitulo('¡Adivina la tradición!')

  const preguntaActual = preguntasTradicion[actual]

  const hablarTexto = (texto) => {
    detenerVoz()
    if (vozDisponible()) {
      hablar(texto)
    }
  }

  // Al cambiar de pregunta solo reiniciamos estado, NO habla solo
  useEffect(() => {
    if (!juegoTerminado && preguntaActual) {
      setRespondido(false)
      setSeleccionado(null)
    }
  }, [actual, juegoTerminado])

  const elegirOpcion = (indice) => {
    if (respondido) return
    setRespondido(true)
    setSeleccionado(indice)

    const esCorrecto = indice === preguntaActual.correct
    if (esCorrecto) {
      setPuntos((p) => p + 1)
      try {
        reproducir('campanita')
      } catch {}
      hablarTexto(`¡Muy bien! ${preguntaActual.why}`)
    } else {
      hablarTexto(`¡Vamos a aprender! ${preguntaActual.why}`)
    }
  }

  const avanzar = () => {
    if (!respondido) return
    if (actual < preguntasTradicion.length - 1) {
      setActual((a) => a + 1)
    } else {
      setJuegoTerminado(true)
      if (!celebradoRef.current) {
        celebradoRef.current = true
        completarActividad('pintura-cultura')
      }
    }
  }

  const reiniciar = () => {
    setActual(0)
    setPuntos(0)
    setRespondido(false)
    setSeleccionado(null)
    setJuegoTerminado(false)
    celebradoRef.current = false
  }

  if (!sala) return <NoEncontrada />

  return (
    <MarcoActividad
      sala={sala}
      titulo="¡Adivina la tradición!"
      descripcion="Observa, escucha las pistas de Kusi y descubre nuestras fiestas y costumbres."
      bienvenida="¡Hola pequeño explorador! Escucha con atención las pistas de Kusi y descubre la tradición correcta."
      className="pagina-tradicion"
      acciones={
        <>
          <button
            type="button"
            className="boton boton--secundario"
            onClick={() =>
              hablarTexto(
                '¡Adivina la tradición! Observa, escucha las pistas de Kusi y descubre nuestras fiestas y costumbres.'
              )
            }
            title="Escuchar la introducción de la actividad"
          >
            <Volume2 size={20} strokeWidth={2.4} />
            Escuchar
          </button>
          <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
            Volver a la sala
          </Link>
        </>
      }
    >
      <div className="juego-tradicion">
        {!juegoTerminado ? (
          <div className="tradicion__tarjeta">
            <span className="tradicion__etiqueta">✨ CULTURA Y TRADICIONES DEL PERÚ</span>
            <h2 className="tradicion__titulo-principal">¡Adivina la tradición!</h2>
            <p className="tradicion__sub">
              Observa, escucha las pistas de Kusi y descubre nuestras fiestas y costumbres. ¡Vamos a jugar!
            </p>

            <div className="tradicion__fila-progreso">
              <span>PREGUNTA {actual + 1} DE {preguntasTradicion.length}</span>
              <span>⭐ {puntos} {puntos === 1 ? 'punto' : 'puntos'}</span>
            </div>

            <div className="tradicion__barra-pista">
              <div
                className="tradicion__barra-llena"
                style={{ width: `${((actual + 1) / preguntasTradicion.length) * 100}%` }}
              />
            </div>

            <div className="tradicion__escena">
              <div className="tradicion__emojis">{preguntaActual.pic}</div>
              <p className="tradicion__escena-desc">{preguntaActual.scene}</p>
            </div>

            <h3 className="tradicion__pregunta">{preguntaActual.q}</h3>

            <button
              type="button"
              className="tradicion__pista tradicion__pista--interactiva"
              onClick={() => hablarTexto(`Pista de Kusi: ${preguntaActual.hint}`)}
              title="Toca para escuchar la pista"
            >
              <span>💡 <strong>Pista de Kusi:</strong> {preguntaActual.hint}</span>
              <span className="tradicion__pista-icono-voz" aria-hidden="true">
                <Volume2 size={18} strokeWidth={2.4} />
              </span>
            </button>

            <div className="tradicion__opciones">
              {preguntaActual.opts.map((opcion, i) => {
                let claseExtra = ''
                if (respondido) {
                  if (i === preguntaActual.correct) claseExtra = 'correcta'
                  else if (i === seleccionado) claseExtra = 'incorrecta'
                }
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={respondido}
                    className={`tradicion__opcion ${claseExtra}`}
                    onClick={() => elegirOpcion(i)}
                  >
                    {opcion}
                  </button>
                )
              })}
            </div>

            {respondido && (
              <div className="tradicion__retroalimentacion animar-aparecer">
                <strong>{seleccionado === preguntaActual.correct ? '🎉 ¡Muy bien!' : '💛 ¡Vamos a aprender!'}</strong>
                <p>{preguntaActual.why}</p>
              </div>
            )}

            <button
              type="button"
              className="tradicion__boton-siguiente"
              disabled={!respondido}
              onClick={avanzar}
            >
              {actual === preguntasTradicion.length - 1 ? 'Ver resultado 🏆' : 'Siguiente pregunta'}
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>
          </div>
        ) : (
          <div className="tradicion__resultado animar-aparecer">
            <div className="tradicion__trofeo">🏆</div>
            <h2>¡Terminaste!</h2>
            <p>¡Felicitaciones! Has descubierto un poquito más sobre las tradiciones del Perú.</p>
            <div className="tradicion__puntuacion-final">{puntos} de 3 puntos</div>
            <p className="tradicion__mensaje-final">
              {puntos === 3
                ? '¡Lo hiciste genial! Eres un explorador de nuestras tradiciones.'
                : puntos === 0
                ? '¡Buen intento! Puedes volver a jugar y aprender más.'
                : '¡Muy bien! Sigue descubriendo las costumbres del Perú.'}
            </p>

            <div className="tradicion__acciones-finales">
              <button type="button" className="boton boton--primario" onClick={reiniciar}>
                <RotateCcw size={18} strokeWidth={2.4} />
                Volver a jugar
              </button>
              <Link to={`/salas/${sala.id}`} className="boton boton--secundario">
                <CheckCircle2 size={18} strokeWidth={2.4} />
                Volver a la sala
              </Link>
            </div>
          </div>
        )}
      </div>
    </MarcoActividad>
  )
}
