import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Ear, Sparkles, Volume2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { obtenerModoSonido } from '../../datos/sonidos'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { Icono } from '../../componentes/icono/Icono'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Sonidos.css'

const recompensas = {
  naturaleza: 'sonidos-naturaleza',
  cuerpo: 'sonidos-cuerpo',
}

const salasEsperadas = {
  naturaleza: 'sonidos',
  cuerpo: 'cuerpo-humano',
}

export function Sonidos() {
  const { idSala, modo } = useParams()
  const config = obtenerModoSonido(modo)
  const sala = obtenerSala(idSala)
  const { completarActividad } = useProgreso()
  const { reproducir, silenciado } = useSonido()

  const [descubiertos, setDescubiertos] = useState([])
  const [sonando, setSonando] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const temporizadorRef = useRef(null)
  const celebradoRef = useRef(false)

  useTitulo(config?.nombre || 'Sonidos')

  useEffect(
    () => () => {
      clearTimeout(temporizadorRef.current)
    },
    [],
  )

  useEffect(() => {
    setDescubiertos([])
    setSonando(null)
    celebradoRef.current = false
  }, [modo])

  if (!config || !sala || salasEsperadas[config.id] !== sala.id) {
    return (
      <NoEncontrada
        titulo="Estos sonidos viven en otra sala"
        mensaje="La orquesta del bosque está en la sala de sonidos y los sonidos del cuerpo en la sala del cuerpo humano. Vuelve al inicio para encontrarlos."
      />
    )
  }

  const total = config.sonidos.length

  const escuchar = (sonido) => {
    const activo = reproducir(sonido.archivo, { volumen: 0.8 })
    setSonando(sonido.id)
    setMensaje(
      activo
        ? `${sonido.nombre}: ${sonido.descripcion}. ¿Puedes imitarlo?`
        : `${sonido.nombre}: ${sonido.descripcion}. El sonido está silenciado; puedes activarlo en la barra de arriba.`,
    )

    clearTimeout(temporizadorRef.current)
    temporizadorRef.current = setTimeout(() => setSonando(null), 2000)

    if (!descubiertos.includes(sonido.id)) {
      const nuevos = [...descubiertos, sonido.id]
      setDescubiertos(nuevos)
      if (nuevos.length === total && !celebradoRef.current) {
        celebradoRef.current = true
        setTimeout(() => completarActividad(recompensas[config.id]), 700)
      }
    }
  }

  return (
    <MarcoActividad
      sala={sala}
      titulo={config.nombre}
      descripcion={config.descripcion}
      bienvenida={config.instruccion}
      className="sonidos"
      acciones={
        <>
          <BotonEscuchar texto={config.instruccion} etiqueta="Escuchar instrucciones" variante="secundario" />
          <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
            Volver a la sala
          </Link>
        </>
      }
    >
      <div className="sonidos__barra">
        <div className="sonidos__progreso">
          <span className="sonidos__progreso-icono" aria-hidden="true">
            <Ear size={20} strokeWidth={2.2} />
          </span>
          <div>
            <p>
              <strong>
                {descubiertos.length} de {total}
              </strong>{' '}
              sonidos descubiertos
            </p>
            <div className="sonidos__barra-progreso" aria-hidden="true">
              <span style={{ width: `${(descubiertos.length / total) * 100}%` }} />
            </div>
          </div>
        </div>

        {silenciado && (
          <p className="sonidos__aviso-silencio" role="status">
            El sonido está silenciado. Actívalo con el botón de la barra superior.
          </p>
        )}
      </div>

      <ul className="sonidos__grilla">
        {config.sonidos.map((sonido, indice) => {
          const escuchado = descubiertos.includes(sonido.id)
          const activo = sonando === sonido.id
          return (
            <li key={sonido.id} className="animar-aparecer" style={{ '--retraso': `${indice * 55}ms` }}>
              <button
                type="button"
                className={`sonidos__tarjeta${activo ? ' sonidos__tarjeta--sonando' : ''}${
                  escuchado ? ' sonidos__tarjeta--escuchado' : ''
                }`}
                style={{ '--color-sonido': sonido.color }}
                onClick={() => escuchar(sonido)}
                aria-label={`Escuchar el sonido de ${sonido.nombre}`}
              >
                <span className="sonidos__tarjeta-icono" aria-hidden="true">
                  <Icono nombre={sonido.icono} tamano={34} />
                </span>

                <span className="sonidos__tarjeta-nombre">{sonido.nombre}</span>
                <span className="sonidos__tarjeta-eco">{sonido.descripcion}</span>

                <span className="sonidos__ondas" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>

                <span className="sonidos__tarjeta-estado">
                  {activo ? (
                    <>
                      <Volume2 size={14} strokeWidth={2.4} aria-hidden="true" />
                      Sonando
                    </>
                  ) : escuchado ? (
                    <>
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                      Escuchado
                    </>
                  ) : (
                    'Toca para oír'
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="sonidos__mensaje" role="status" aria-live="polite">
        <p>{mensaje || 'Toca cada tarjeta para descubrir cómo suena.'}</p>
      </div>

      {descubiertos.length === total && (
        <div className="sonidos__logro animar-escala" role="status">
          <span className="sonidos__logro-icono" aria-hidden="true">
            <Sparkles size={26} strokeWidth={2} />
          </span>
          <div>
            <h2>¡Descubriste todos los sonidos!</h2>
            <p>Tu oído curioso se ganó un sello nuevo. Puedes seguir escuchando cuando quieras.</p>
          </div>
          <Link to="/mi-rincon" className="boton boton--secundario">
            Ver mi colección
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      )}
    </MarcoActividad>
  )
}
