import { useState } from 'react'
import {
  ArrowRight,
  Download,
  Images,
  Lock,
  Palette,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { coleccion } from '../../datos/coleccion'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useGaleria } from '../../contextos/GaleriaContexto'
import { formatearFecha } from '../../utilidades/ayudas'
import { useTitulo } from '../../utilidades/useTitulo'
import { Icono } from '../../componentes/icono/Icono'
import './MiRincon.css'

const nombreArchivo = (creacion) =>
  `kusi-${(creacion.titulo || 'obra').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.jpg`

export function MiRincon() {
  useTitulo('Mi rincón')

  const {
    estrellas,
    recompensas,
    cantidadSellos,
    totalSellos,
    estaDesbloqueada,
    reiniciarProgreso,
  } = useProgreso()
  const { creaciones, eliminarCreacion, maximo } = useGaleria()

  const [pestana, setPestana] = useState('coleccion')
  const [confirmarReinicio, setConfirmarReinicio] = useState(false)
  const [porEliminar, setPorEliminar] = useState(null)

  const reiniciar = () => {
    reiniciarProgreso()
    setConfirmarReinicio(false)
  }

  return (
    <div className="rincon">
      <div className="contenedor">
        <header className="rincon__cabecera animar-aparecer">
          <div className="rincon__titulo">
            <p className="etiqueta">
              <Sparkles size={15} aria-hidden="true" />
              Tu espacio personal
            </p>
            <h1>Mi rincón</h1>
            <p>
              Aquí viven tus sellos y tus dibujos. Nadie más los ve: se guardan solamente en este
              dispositivo, sin cuentas ni nombres.
            </p>
          </div>

          <div className="rincon__resumen">
            <div className="rincon__dato rincon__dato--estrella">
              <Star size={24} fill="currentColor" strokeWidth={1.6} aria-hidden="true" />
              <strong>{estrellas}</strong>
              <span>estrellitas</span>
            </div>
            <div className="rincon__dato">
              <Sparkles size={22} strokeWidth={1.9} aria-hidden="true" />
              <strong>
                {cantidadSellos}/{totalSellos}
              </strong>
              <span>sellos</span>
            </div>
            <div className="rincon__dato">
              <Images size={22} strokeWidth={1.9} aria-hidden="true" />
              <strong>
                {creaciones.length}/{maximo}
              </strong>
              <span>obras</span>
            </div>
          </div>
        </header>

        <div className="rincon__pestanas" role="tablist" aria-label="Secciones de mi rincón">
          <button
            type="button"
            role="tab"
            id="pestana-coleccion"
            aria-selected={pestana === 'coleccion'}
            aria-controls="panel-coleccion"
            className={`rincon__pestana${pestana === 'coleccion' ? ' rincon__pestana--activa' : ''}`}
            onClick={() => setPestana('coleccion')}
          >
            <Star size={19} strokeWidth={2} aria-hidden="true" />
            Mi colección
            <span className="rincon__pestana-cuenta">{cantidadSellos}</span>
          </button>
          <button
            type="button"
            role="tab"
            id="pestana-galeria"
            aria-selected={pestana === 'galeria'}
            aria-controls="panel-galeria"
            className={`rincon__pestana${pestana === 'galeria' ? ' rincon__pestana--activa' : ''}`}
            onClick={() => setPestana('galeria')}
          >
            <Palette size={19} strokeWidth={2} aria-hidden="true" />
            Mi galería
            <span className="rincon__pestana-cuenta">{creaciones.length}</span>
          </button>
        </div>

        {pestana === 'coleccion' && (
          <section
            className="rincon__panel"
            id="panel-coleccion"
            role="tabpanel"
            aria-labelledby="pestana-coleccion"
          >
            <div className="rincon__panel-cabecera">
              <div>
                <h2>Sellos de tu paseo</h2>
                <p>
                  Cada actividad deja un sello distinto. No hay puntajes ni premios por ir más
                  rápido: solo recuerdos de lo que exploraste.
                </p>
              </div>
              <div className="rincon__progreso" aria-hidden="true">
                <span style={{ width: `${(cantidadSellos / totalSellos) * 100}%` }} />
              </div>
            </div>

            <ul className="rincon__sellos">
              {coleccion.map((sello) => {
                const logrado = estaDesbloqueada(sello.id)
                const sala = obtenerSala(sello.salaId)
                return (
                  <li
                    key={sello.id}
                    className={`sello${logrado ? ' sello--logrado' : ' sello--pendiente'}`}
                    style={{
                      '--color-sello': sello.color,
                      '--color-suave-sello': sello.colorSuave,
                    }}
                  >
                    <span className="sello__circulo" aria-hidden="true">
                      {logrado ? (
                        <Icono nombre={sello.icono} tamano={32} />
                      ) : (
                        <Lock size={24} strokeWidth={1.9} />
                      )}
                    </span>
                    <div>
                      <h3>{logrado ? sello.nombre : 'Sello por descubrir'}</h3>
                      <p>{logrado ? sello.descripcion : `Te espera en la sala de ${sala?.nombreCorto?.toLowerCase() || 'el museo'}.`}</p>
                      <small>{logrado ? 'En tu colección' : 'Aún no lo tienes'}</small>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="rincon__reinicio">
              {!confirmarReinicio ? (
                <>
                  <div>
                    <h3>¿Empezar un paseo nuevo?</h3>
                    <p>
                      Puedes reiniciar las estrellitas y los sellos cuando quieras. Tus dibujos de la
                      galería se quedan guardados.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="boton boton--secundario boton--pequeno"
                    onClick={() => setConfirmarReinicio(true)}
                  >
                    <RotateCcw size={16} aria-hidden="true" />
                    Reiniciar paseo
                  </button>
                </>
              ) : (
                <div className="rincon__confirmacion" role="alertdialog" aria-label="Confirmar reinicio">
                  <p>¿Seguro que quieres empezar de nuevo? Los sellos volverán a estar vacíos.</p>
                  <div className="boton-grupo">
                    <button type="button" className="boton boton--primario boton--pequeno" onClick={reiniciar}>
                      Sí, empezar de nuevo
                    </button>
                    <button
                      type="button"
                      className="boton boton--fantasma boton--pequeno"
                      onClick={() => setConfirmarReinicio(false)}
                    >
                      Mejor no
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="rincon__privacidad">
              <ShieldCheck size={17} strokeWidth={2} aria-hidden="true" />
              Todo se guarda solo en este navegador. Si borras los datos del navegador, el progreso
              también se borra.
            </p>
          </section>
        )}

        {pestana === 'galeria' && (
          <section
            className="rincon__panel"
            id="panel-galeria"
            role="tabpanel"
            aria-labelledby="pestana-galeria"
          >
            <div className="rincon__panel-cabecera">
              <div>
                <h2>Tus obras guardadas</h2>
                <p>
                  Puedes guardar hasta {maximo} creaciones. Si la galería se llena, borra una obra
                  antigua para dejar espacio a una nueva.
                </p>
              </div>
              <Link to="/salas/plantas/pintar/jardin" className="boton boton--primario boton--pequeno">
                <Plus size={17} aria-hidden="true" />
                Pintar algo nuevo
              </Link>
            </div>

            {creaciones.length === 0 ? (
              <div className="rincon__vacio">
                <span aria-hidden="true">
                  <Palette size={40} strokeWidth={1.5} />
                </span>
                <h3>Tu galería está esperando su primera obra</h3>
                <p>Entra a la sala de plantas o de colores y pinta lo que imagines.</p>
                <Link to="/#salas" className="boton boton--secundario">
                  Explorar las salas
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <ul className="rincon__galeria">
                {creaciones.map((creacion) => {
                  const sala = obtenerSala(creacion.salaId)
                  const confirmando = porEliminar === creacion.id
                  return (
                    <li key={creacion.id} className="obra">
                      <div className="obra__imagen">
                        <img src={creacion.imagen} alt={`Obra guardada: ${creacion.titulo}`} loading="lazy" />
                      </div>
                      <div className="obra__cuerpo">
                        <h3>{creacion.titulo}</h3>
                        <p>
                          {sala?.nombreCorto || 'Museo'} · {formatearFecha(creacion.fecha)}
                        </p>

                        {confirmando ? (
                          <div className="obra__confirmacion">
                            <p>¿Borrar esta obra?</p>
                            <div className="boton-grupo">
                              <button
                                type="button"
                                className="boton boton--primario boton--pequeno"
                                onClick={() => {
                                  eliminarCreacion(creacion.id)
                                  setPorEliminar(null)
                                }}
                              >
                                Sí, borrar
                              </button>
                              <button
                                type="button"
                                className="boton boton--fantasma boton--pequeno"
                                onClick={() => setPorEliminar(null)}
                              >
                                <X size={15} aria-hidden="true" />
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="obra__acciones">
                            <a
                              className="boton boton--secundario boton--pequeno"
                              href={creacion.imagen}
                              download={nombreArchivo(creacion)}
                            >
                              <Download size={16} aria-hidden="true" />
                              Descargar
                            </a>
                            <button
                              type="button"
                              className="boton boton--fantasma boton--pequeno"
                              onClick={() => setPorEliminar(creacion.id)}
                              aria-label={`Borrar la obra ${creacion.titulo}`}
                            >
                              <Trash2 size={16} aria-hidden="true" />
                              Borrar
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
