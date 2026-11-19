import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { desafiosBurbujas } from '../../datos/juego-burbujas'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { hablar, detenerVoz, vozDisponible } from '../../servicios/voz'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import { Volume2, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react'
import './JuegoBurbujas.css'

export function JuegoBurbujas() {
  const { idSala } = useParams()
  const sala = obtenerSala(idSala)
  const { completarActividad } = useProgreso()
  const { reproducir } = useSonido()

  const [indiceRonda, setIndiceRonda] = useState(0)
  const [aciertosRonda, setAciertosRonda] = useState(0)
  const [burbujas, setBurbujas] = useState([])
  const [salpicaduras, setSalpicaduras] = useState([])
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [mensajeRetro, setMensajeRetro] = useState('')

  const idBurbujaRef = useRef(1)
  const celebradoRef = useRef(false)
  const areaRef = useRef(null)

  useTitulo('Burbujas Mágicas de Colores')

  const rondaActual = desafiosBurbujas[indiceRonda]

  const hablarTexto = (texto) => {
    detenerVoz()
    if (vozDisponible()) {
      hablar(texto)
    }
  }

  // Reproduce sonido synth pop si no hay wav
  const reproducirPop = () => {
    try {
      reproducir('campanita')
    } catch {
      // Ignorar si falla
    }
  }

  // Locución cuando cambia la ronda
  useEffect(() => {
    if (!juegoTerminado && rondaActual) {
      setAciertosRonda(0)
      setMensajeRetro(rondaActual.pregunta)
      const t = setTimeout(() => {
        hablarTexto(rondaActual.pregunta)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [indiceRonda, juegoTerminado])

  // Generador continuo de burbujas flotantes
  useEffect(() => {
    if (juegoTerminado) return

    const crearBurbuja = (esObjetivoForzado = false) => {
      let colorElegido
      if (esObjetivoForzado) {
        colorElegido = rondaActual
      } else {
        // Garantizar al menos 60% de probabilidad de que sea el color pedido
        const esObjetivo = Math.random() < 0.65
        if (esObjetivo) {
          colorElegido = rondaActual
        } else {
          const otros = desafiosBurbujas.filter((d) => d.id !== rondaActual.id)
          colorElegido = otros[Math.floor(Math.random() * otros.length)]
        }
      }

      // Tamaño grande y visible para deditos de 3-5 años
      const tamano = Math.floor(Math.random() * 30) + 85
      const posX = Math.floor(Math.random() * 75) + 12
      const duracion = (Math.random() * 2 + 5.5).toFixed(1)

      return {
        id: idBurbujaRef.current++,
        colorId: colorElegido.id,
        colorHex: colorElegido.colorHex,
        colorGradiente: colorElegido.colorGradiente,
        colorSombra: colorElegido.colorSombra,
        icono: colorElegido.icono,
        nombreColor: colorElegido.nombreColor,
        tamano,
        posX,
        duracion,
        reventada: false,
      }
    }

    const generarBurbuja = () => {
      setBurbujas((prev) => {
        if (prev.length >= 8) return prev

        // Si actualmente en pantalla NO hay ninguna burbuja del color pedido, forzarla de inmediato
        const hayDelColorPedido = prev.some((b) => b.colorId === rondaActual.id && !b.reventada)
        const nueva = crearBurbuja(!hayDelColorPedido)

        return [...prev, nueva]
      })
    }

    // Intervalo constante de aparición (cada 900ms para que nunca quede vacío)
    const interval = setInterval(generarBurbuja, 900)

    // De inicio lanzamos 3 burbujas (al menos dos del color objetivo)
    setBurbujas([crearBurbuja(true), crearBurbuja(true), crearBurbuja(false)])

    return () => clearInterval(interval)
  }, [rondaActual, juegoTerminado])

  // Manejar toque en burbuja
  const tocarBurbuja = (e, b) => {
    if (b.reventada || juegoTerminado) return

    reproducirPop()

    // Registrar salpicadura en coordenadas del contenedor
    if (areaRef.current) {
      const rect = areaRef.current.getBoundingClientRect()
      const clickX = e.clientX ? e.clientX - rect.left : (rect.width * b.posX) / 100
      const clickY = e.clientY ? e.clientY - rect.top : rect.height / 2

      const nuevaSalpicadura = {
        id: Date.now() + Math.random(),
        x: clickX,
        y: clickY,
        color: b.colorHex,
        tamano: b.tamano * 1.2,
      }

      setSalpicaduras((prev) => [...prev.slice(-12), nuevaSalpicadura])
    }

    // Marcar reventada para animación
    setBurbujas((prev) =>
      prev.map((item) => (item.id === b.id ? { ...item, reventada: true } : item))
    )

    // Eliminar tras animación
    setTimeout(() => {
      setBurbujas((prev) => prev.filter((item) => item.id !== b.id))
    }, 450)

    // Verificar si es del color pedido
    if (b.colorId === rondaActual.id) {
      const nuevosAciertos = aciertosRonda + 1
      setAciertosRonda(nuevosAciertos)

      if (nuevosAciertos >= rondaActual.meta) {
        // Completó este color
        setMensajeRetro(rondaActual.fraseCompletado)
        hablarTexto(`¡Bien! ${rondaActual.fraseCompletado}`)

        if (indiceRonda + 1 < desafiosBurbujas.length) {
          // Pasa a siguiente color tras breve pausa festiva
          setTimeout(() => {
            setIndiceRonda((r) => r + 1)
          }, 1800)
        } else {
          // Juego completo
          setJuegoTerminado(true)
          if (!celebradoRef.current) {
            celebradoRef.current = true
            completarActividad('puzzle-colores')
          }
        }
      } else {
        setMensajeRetro(`¡Bien! Llevas ${nuevosAciertos} de ${rondaActual.meta}.`)
        hablarTexto('¡Bien!')
      }
    } else {
      // Tocó otra burbuja
      setMensajeRetro(`¡Sigue intentando! Busca la burbuja ${rondaActual.nombreColor}.`)
      hablarTexto('¡Sigue intentando!')
    }
  }

  const reiniciarJuego = () => {
    setIndiceRonda(0)
    setAciertosRonda(0)
    setSalpicaduras([])
    setJuegoTerminado(false)
    celebradoRef.current = false
    setBurbujas([])
  }

  if (!sala) return <NoEncontrada />

  return (
    <MarcoActividad
      sala={sala}
      titulo="Burbujas Mágicas de Colores"
      descripcion="Revienta las burbujas del color que te pide Kusi. ¡Tócalas todas!"
      bienvenida="¡Hola pequeño artista! Escucha la voz de Kusi y toca las burbujas del color que te pida para llenar el lienzo de colores."
      className="pagina-burbujas"
      acciones={
        <>
          <button
            type="button"
            className="boton boton--secundario"
            onClick={() => hablarTexto(rondaActual ? rondaActual.pregunta : '¡Juguemos!')}
            title="Escuchar indicación"
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
      <div className="juego-burbujas">
        {/* Banner de objetivo para niños de inicial */}
        {!juegoTerminado && rondaActual && (
          <header className="burbujas__panel-objetivo" style={{ borderColor: rondaActual.colorHex }}>
            <div className="burbujas__muestra-color" style={{ background: rondaActual.colorGradiente }}>
              <span className="burbujas__muestra-icono">{rondaActual.icono}</span>
            </div>
            <div className="burbujas__info-meta">
              <span className="burbujas__etiqueta">Busca el color:</span>
              <h2 className="burbujas__nombre-color" style={{ color: rondaActual.colorHex }}>
                {rondaActual.nombreVisual}
              </h2>
              <p className="burbujas__instruccion-voz">{mensajeRetro}</p>
            </div>

            <div className="burbujas__progreso-estrellas">
              {Array.from({ length: rondaActual.meta }).map((_, idx) => (
                <div
                  key={idx}
                  className={`burbujas__estrella-hito ${idx < aciertosRonda ? 'activa' : ''}`}
                  style={{ backgroundColor: idx < aciertosRonda ? rondaActual.colorHex : '#E2E8F0' }}
                >
                  ⭐
                </div>
              ))}
            </div>
          </header>
        )}

        {/* Zona de juego donde flotan las burbujas */}
        <div className="burbujas__estanque" ref={areaRef}>
          {/* Manchas de salpicadura de pintura en el lienzo */}
          {salpicaduras.map((s) => (
            <div
              key={s.id}
              className="burbujas__salpicadura"
              style={{
                left: `${s.x}px`,
                top: `${s.y}px`,
                width: `${s.tamano}px`,
                height: `${s.tamano}px`,
                backgroundColor: s.color,
              }}
            />
          ))}

          {/* Burbujas flotantes */}
          {!juegoTerminado &&
            burbujas.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`burbuja-globo ${b.reventada ? 'reventada' : ''}`}
                style={{
                  left: `${b.posX}%`,
                  width: `${b.tamano}px`,
                  height: `${b.tamano}px`,
                  background: b.colorGradiente,
                  boxShadow: `0 8px 24px ${b.colorSombra}, inset 0 -4px 10px rgba(0,0,0,0.15), inset 0 6px 12px rgba(255,255,255,0.8)`,
                  animationDuration: `${b.duracion}s`,
                }}
                onClick={(e) => tocarBurbuja(e, b)}
                aria-label={`Burbuja ${b.nombreColor}`}
              >
                <span className="burbuja-brillo" />
                <span className="burbuja-icono">{b.icono}</span>
              </button>
            ))}

          {/* Modal / Pantalla de victoria alegre */}
          {juegoTerminado && (
            <div className="burbujas__victoria">
              <div className="burbujas__victoria-icono">🎨✨</div>
              <h2 className="burbujas__victoria-titulo">¡Eres un Súper Artista!</h2>
              <p className="burbujas__victoria-desc">
                Reventaste todas las burbujas y llenaste el lienzo de colores mágicos. ¡Ganaste tu sello de arte!
              </p>
              <div className="burbujas__victoria-acciones">
                <button type="button" className="boton boton--primario" onClick={reiniciarJuego}>
                  <RotateCcw size={18} strokeWidth={2.4} />
                  Jugar otra vez
                </button>
                <Link to={`/salas/${sala.id}`} className="boton boton--secundario">
                  <CheckCircle2 size={18} strokeWidth={2.4} />
                  Ver mis actividades
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </MarcoActividad>
  )
}
