import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Eraser, Palette, Save, Sparkles, Undo2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { obtenerLamina } from '../../datos/laminas'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useGaleria } from '../../contextos/GaleriaContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { svgAImagen } from '../../servicios/imagen'
import { barajar } from '../../utilidades/ayudas'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Pintar.css'

const colores = [
  { valor: '#D97757', nombre: 'Terracota' },
  { valor: '#E9B44C', nombre: 'Mostaza' },
  { valor: '#E8A598', nombre: 'Coral' },
  { valor: '#F2C96B', nombre: 'Amarillo' },
  { valor: '#8FA98F', nombre: 'Salvia' },
  { valor: '#7F9B82', nombre: 'Verde bosque' },
  { valor: '#A9C6C9', nombre: 'Cielo' },
  { valor: '#3D5A6C', nombre: 'Azul profundo' },
  { valor: '#B98A63', nombre: 'Canela' },
  { valor: '#C98C63', nombre: 'Arcilla' },
  { valor: '#9B7FA8', nombre: 'Lavanda' },
  { valor: '#FBF3E4', nombre: 'Crema' },
]

const instruccion =
  'Elige un color de la paleta y toca una parte del dibujo. Puedes cambiar de color cuando quieras, deshacer el último cambio o probar la varita sorpresa. Cuando termines, guarda tu obra en tu galería.'

function nombreLegible(region) {
  return region.replace(/-/g, ' ')
}

export function Pintar() {
  const { idSala, idLamina } = useParams()
  const lamina = obtenerLamina(idLamina)
  const sala = obtenerSala(idSala)
  const { completarActividad, mostrarAviso } = useProgreso()
  const { guardarCreacion } = useGaleria()
  const { reproducir } = useSonido()

  const [colorActual, setColorActual] = useState(colores[0])
  const [guardando, setGuardando] = useState(false)
  const [guardada, setGuardada] = useState(false)
  const [anuncio, setAnuncio] = useState('')

  const lienzoRef = useRef(null)
  const originalesRef = useRef(new Map())
  const pilaRef = useRef([])

  useTitulo(lamina?.nombre || 'Pintar')

  useEffect(() => {
    const contenedor = lienzoRef.current
    if (!contenedor || !lamina?.svg) return

    contenedor.innerHTML = lamina.svg
    originalesRef.current = new Map()
    pilaRef.current = []
    setGuardada(false)
    setColorActual(colores[0])

    const regiones = contenedor.querySelectorAll('[data-region]')
    regiones.forEach((nodo) => {
      originalesRef.current.set(nodo, nodo.getAttribute('fill'))
      nodo.setAttribute('tabindex', '0')
      nodo.setAttribute('role', 'button')
      nodo.setAttribute('aria-label', `Pintar ${nombreLegible(nodo.getAttribute('data-region'))}`)
    })
  }, [lamina])

  const regionesTotales = useMemo(() => {
    if (!lamina?.svg) return 0
    return (lamina.svg.match(/data-region=/g) || []).length
  }, [lamina])

  const pintarNodo = (nodo, color) => {
    if (!nodo) return
    const anterior = nodo.getAttribute('fill')
    pilaRef.current.push({ nodo, anterior })
    if (pilaRef.current.length > 120) pilaRef.current.shift()
    nodo.setAttribute('fill', color.valor)
    setGuardada(false)
    setAnuncio(`${nombreLegible(nodo.getAttribute('data-region'))} pintado de ${color.nombre.toLowerCase()}.`)
  }

  const alTocarLienzo = (evento) => {
    const nodo = evento.target.closest('[data-region]')
    if (!nodo || !lienzoRef.current?.contains(nodo)) return
    pintarNodo(nodo, colorActual)
  }

  const alPresionarTecla = (evento) => {
    if (evento.key !== 'Enter' && evento.key !== ' ') return
    const nodo = evento.target.closest('[data-region]')
    if (!nodo) return
    evento.preventDefault()
    pintarNodo(nodo, colorActual)
  }

  const deshacer = () => {
    const ultimo = pilaRef.current.pop()
    if (!ultimo) {
      mostrarAviso('Todavía no hay cambios para deshacer.')
      return
    }
    if (ultimo.anterior === null) ultimo.nodo.removeAttribute('fill')
    else ultimo.nodo.setAttribute('fill', ultimo.anterior)
    setGuardada(false)
    setAnuncio('Deshicimos el último cambio.')
  }

  const borrarTodo = () => {
    originalesRef.current.forEach((anterior, nodo) => {
      if (anterior === null) nodo.removeAttribute('fill')
      else nodo.setAttribute('fill', anterior)
    })
    pilaRef.current = []
    setGuardada(false)
    setAnuncio('El dibujo volvió a quedar en blanco para empezar de nuevo.')
  }

  const varitaSorpresa = () => {
    const nodos = Array.from(originalesRef.current.keys())
    if (!nodos.length) return
    const mezcla = barajar(colores.filter((color) => color.valor !== '#FBF3E4'))
    nodos.forEach((nodo, indice) => {
      const color = mezcla[indice % mezcla.length]
      const anterior = nodo.getAttribute('fill')
      pilaRef.current.push({ nodo, anterior })
      nodo.setAttribute('fill', color.valor)
    })
    setGuardada(false)
    setAnuncio('¡La varita sorpresa llenó el dibujo de colores!')
    reproducir('campanita', { volumen: 0.35 })
  }

  const guardar = async () => {
    const svg = lienzoRef.current?.querySelector('svg')
    if (!svg || guardando) return

    setGuardando(true)
    try {
      const imagen = await svgAImagen(svg, { ancho: 1000, alto: 750 })
      const resultado = guardarCreacion({
        titulo: lamina.nombre,
        salaId: lamina.salaId,
        tipo: 'pintura',
        laminaId: lamina.id,
        imagen,
      })

      if (resultado.ok) {
        setGuardada(true)
        setAnuncio('Tu obra quedó guardada en tu galería.')
        mostrarAviso('¡Qué bonito! Tu obra ya está en Mi rincón.')
      } else {
        mostrarAviso(
          'Tu galería está llena (8 obras). Puedes borrar una en Mi rincón; mientras tanto, tu sello igual es tuyo.',
        )
      }

      completarActividad(lamina.recompensaId)
    } catch {
      mostrarAviso('No pudimos guardar el dibujo esta vez. Puedes intentarlo otra vez.')
    } finally {
      setGuardando(false)
    }
  }

  if (!lamina || !sala || lamina.salaId !== sala.id) {
    return (
      <NoEncontrada
        titulo="Esta lámina no está aquí"
        mensaje="Puede que la lámina pertenezca a otra sala. Vuelve al inicio y entra a la sala de plantas o de colores."
      />
    )
  }

  return (
    <MarcoActividad
      sala={sala}
      titulo={lamina.nombre}
      descripcion={lamina.descripcion}
      bienvenida={lamina.bienvenida}
      className="pintar"
      acciones={
        <>
          <BotonEscuchar texto={instruccion} etiqueta="Cómo pintar" variante="secundario" />
          <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
            Volver a la sala
          </Link>
        </>
      }
    >
      <div className="pintar__area">
        <aside className="pintar__panel" aria-label="Herramientas de pintura">
          <div className="pintar__seccion">
            <h2 className="pintar__subtitulo">
              <Palette size={18} strokeWidth={2.1} aria-hidden="true" />
              Elige un color
            </h2>

            <ul className="paleta">
              {colores.map((color) => {
                const activo = color.valor === colorActual.valor
                return (
                  <li key={color.valor}>
                    <button
                      type="button"
                      className={`paleta__color${activo ? ' paleta__color--activo' : ''}`}
                      style={{ '--color-muestra': color.valor }}
                      onClick={() => setColorActual(color)}
                      aria-pressed={activo}
                      aria-label={`Color ${color.nombre}`}
                      title={color.nombre}
                    >
                      {activo && <Check size={18} strokeWidth={3.2} aria-hidden="true" />}
                    </button>
                  </li>
                )
              })}
            </ul>

            <p className="pintar__color-nombre">
              Color elegido: <strong style={{ color: '#3b302a' }}>{colorActual.nombre}</strong>
            </p>
          </div>

          <div className="pintar__seccion">
            <h2 className="pintar__subtitulo">
              <Sparkles size={18} strokeWidth={2.1} aria-hidden="true" />
              Herramientas
            </h2>

            <div className="pintar__herramientas">
              <button type="button" className="boton boton--secundario boton--pequeno" onClick={deshacer}>
                <Undo2 size={17} strokeWidth={2.2} aria-hidden="true" />
                Deshacer
              </button>
              <button type="button" className="boton boton--secundario boton--pequeno" onClick={varitaSorpresa}>
                <Sparkles size={17} strokeWidth={2.2} aria-hidden="true" />
                Varita sorpresa
              </button>
              <button type="button" className="boton boton--fantasma boton--pequeno" onClick={borrarTodo}>
                <Eraser size={17} strokeWidth={2.2} aria-hidden="true" />
                Borrar todo
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`boton ${guardada ? 'boton--secundario' : 'boton--primario'} boton--grande pintar__guardar`}
            onClick={guardar}
            disabled={guardando}
          >
            <Save size={19} strokeWidth={2.2} aria-hidden="true" />
            {guardando ? 'Guardando…' : guardada ? 'Guardar otra copia' : 'Guardar en mi galería'}
          </button>

          <p className="pintar__pista">
            Hay {regionesTotales} partes para pintar. No hay combinaciones correctas: prueba y mira
            qué pasa.
          </p>
        </aside>

        <div className="pintar__lienzo-panel">
          <div className="pintar__marco">
            <div
              ref={lienzoRef}
              className="pintar__lienzo"
              onClick={alTocarLienzo}
              onKeyDown={alPresionarTecla}
              role="group"
              aria-label={`Lámina para colorear: ${lamina.nombre}`}
            />
          </div>
          <p className="pintar__anuncio" role="status" aria-live="polite">
            {anuncio || 'Toca una parte del dibujo para pintarla.'}
          </p>
        </div>
      </div>
    </MarcoActividad>
  )
}
