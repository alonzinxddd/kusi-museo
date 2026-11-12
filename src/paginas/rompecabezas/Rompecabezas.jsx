import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Check, Eye, EyeOff, Puzzle, RefreshCw, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { obtenerRompecabezas } from '../../datos/rompecabezas'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { barajar } from '../../utilidades/ayudas'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Rompecabezas.css'

const instruccion =
  'Toca una pieza y luego otra para cambiarlas de lugar. Si quieres una ayuda, abre la imagen completa. No hay tiempo límite: puedes mirar, probar y volver a empezar.'

function crearOrden(lado) {
  const total = lado * lado
  const base = Array.from({ length: total }, (_, indice) => indice)

  for (let intento = 0; intento < 12; intento += 1) {
    const mezcla = barajar(base)
    const yaEstaResuelto = mezcla.every((valor, posicion) => valor === posicion)
    if (!yaEstaResuelto) return mezcla
  }

  return [...base.slice(1), base[0]]
}

export function Rompecabezas() {
  const { idSala, idPuzzle } = useParams()
  const config = obtenerRompecabezas(idPuzzle)
  const sala = obtenerSala(idSala)
  const { completarActividad } = useProgreso()
  const { reproducir } = useSonido()

  const [lado, setLado] = useState(config?.piezasIniciales === 9 ? 3 : 2)
  const [orden, setOrden] = useState(() => crearOrden(config?.piezasIniciales === 9 ? 3 : 2))
  const [seleccion, setSeleccion] = useState(null)
  const [resuelto, setResuelto] = useState(false)
  const [verGuia, setVerGuia] = useState(false)
  const completadoRef = useRef(false)

  useTitulo(config?.nombre || 'Rompecabezas')

  const total = lado * lado

  const reiniciar = useCallback((nuevoLado = lado) => {
    setOrden(crearOrden(nuevoLado))
    setSeleccion(null)
    setResuelto(false)
    completadoRef.current = false
  }, [lado])

  const cambiarDificultad = (nuevoLado) => {
    if (nuevoLado === lado) return
    setLado(nuevoLado)
    setOrden(crearOrden(nuevoLado))
    setSeleccion(null)
    setResuelto(false)
    completadoRef.current = false
  }

  const elegirPieza = (posicion) => {
    if (resuelto) return

    if (seleccion === null) {
      setSeleccion(posicion)
      return
    }

    if (seleccion === posicion) {
      setSeleccion(null)
      return
    }

    const nueva = [...orden]
    ;[nueva[seleccion], nueva[posicion]] = [nueva[posicion], nueva[seleccion]]
    setOrden(nueva)
    setSeleccion(null)
    reproducir('chasquido', { volumen: 0.45 })
  }

  useEffect(() => {
    const completo = orden.every((valor, posicion) => valor === posicion)
    if (!completo) {
      if (resuelto) setResuelto(false)
      return
    }

    setResuelto(true)
    if (!completadoRef.current && config) {
      completadoRef.current = true
      completarActividad(config.recompensaId)
    }
  }, [orden, config, completarActividad, resuelto])

  useEffect(() => {
    if (config) reiniciar()
    // Al cambiar de rompecabezas se reinicia el tablero.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.id])

  const piezas = useMemo(() => {
    if (!config) return []
    return orden.map((pieza, posicion) => {
      const columna = pieza % lado
      const fila = Math.floor(pieza / lado)
      return {
        posicion,
        pieza,
        columna,
        fila,
        estilo: {
          backgroundImage: `url(${config.imagen})`,
          backgroundSize: `${lado * 100}% ${lado * 100}%`,
          backgroundPosition: `${(columna / (lado - 1)) * 100}% ${(fila / (lado - 1)) * 100}%`,
        },
      }
    })
  }, [orden, lado, config])

  if (!config || !sala || config.salaId !== sala.id) {
    return (
      <NoEncontrada
        titulo="Este rompecabezas no está aquí"
        mensaje="Puede que pertenezca a otra sala. Vuelve al inicio y busca el rompecabezas desde la sala de animales o de colores."
      />
    )
  }

  return (
    <MarcoActividad
      sala={sala}
      titulo={config.nombre}
      descripcion={config.descripcion}
      bienvenida={config.bienvenida}
      className="rompecabezas"
      acciones={
        <>
          <BotonEscuchar texto={instruccion} etiqueta="Cómo jugar" variante="secundario" />
          <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
            Volver a la sala
          </Link>
        </>
      }
    >
      <div className="rompecabezas__barra">
        <div className="rompecabezas__dificultad" role="group" aria-label="Cantidad de piezas">
          <span>Piezas:</span>
          <button
            type="button"
            className={`boton boton--pequeno ${lado === 2 ? 'boton--primario' : 'boton--secundario'}`}
            onClick={() => cambiarDificultad(2)}
            aria-pressed={lado === 2}
          >
            4 piezas
          </button>
          <button
            type="button"
            className={`boton boton--pequeno ${lado === 3 ? 'boton--primario' : 'boton--secundario'}`}
            onClick={() => cambiarDificultad(3)}
            aria-pressed={lado === 3}
          >
            9 piezas
          </button>
        </div>

        <div className="rompecabezas__acciones">
          <button
            type="button"
            className="boton boton--secundario boton--pequeno"
            onClick={() => setVerGuia((valor) => !valor)}
            aria-expanded={verGuia}
          >
            {verGuia ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
            {verGuia ? 'Ocultar guía' : 'Ver imagen completa'}
          </button>
          <button type="button" className="boton boton--fantasma boton--pequeno" onClick={() => reiniciar()}>
            <RefreshCw size={17} aria-hidden="true" />
            Mezclar otra vez
          </button>
        </div>
      </div>

      <div className={`rompecabezas__area${verGuia ? ' rompecabezas__area--con-guia' : ''}`}>
        <div className="rompecabezas__tablero-panel">
          <div
            className={`rompecabezas__tablero${resuelto ? ' rompecabezas__tablero--resuelto' : ''}`}
            style={{ '--lado': lado }}
            aria-label={`Rompecabezas de ${total} piezas`}
          >
            {piezas.map(({ posicion, pieza, estilo }) => (
              <button
                type="button"
                key={posicion}
                className={`rompecabezas__pieza${seleccion === posicion ? ' rompecabezas__pieza--elegida' : ''}${
                  resuelto ? ' rompecabezas__pieza--fija' : ''
                }`}
                style={estilo}
                onClick={() => elegirPieza(posicion)}
                aria-pressed={seleccion === posicion}
                aria-label={`Pieza ${pieza + 1} de ${total}`}
                disabled={resuelto}
              />
            ))}
          </div>

          <p className="rompecabezas__pista" role="status" aria-live="polite">
            {resuelto
              ? '¡La imagen está completa! Puedes mezclarla y jugar otra vez.'
              : seleccion === null
                ? 'Toca una pieza para empezar.'
                : 'Ahora toca otra pieza para cambiarlas de lugar.'}
          </p>
        </div>

        {verGuia && (
          <aside className="rompecabezas__guia">
            <h2>
              <Puzzle size={18} strokeWidth={2.1} aria-hidden="true" />
              Imagen completa
            </h2>
            <img src={config.imagen} alt={`Guía del rompecabezas: ${config.nombre}`} />
            <p>Mira las formas y los colores para descubrir dónde va cada pieza.</p>
          </aside>
        )}
      </div>

      {resuelto && (
        <div className="rompecabezas__logro animar-escala" role="status">
          <span className="rompecabezas__logro-icono" aria-hidden="true">
            <Check size={26} strokeWidth={3} />
          </span>
          <div>
            <h2>¡Lo lograste!</h2>
            <p>Cada pieza encontró su lugar. Tu sello ya está en la colección.</p>
          </div>
          <Link to="/mi-rincon" className="boton boton--secundario">
            <Sparkles size={18} aria-hidden="true" />
            Ver mi sello
          </Link>
        </div>
      )}
    </MarcoActividad>
  )
}
