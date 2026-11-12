import { ArrowRight, ChevronLeft, Lightbulb, MessageCircle, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { actividadesPorSala } from '../../datos/actividades'
import { obtenerSala, salas } from '../../datos/salas'
import { recompensasPorSala } from '../../datos/coleccion'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { TarjetaActividad } from '../../componentes/tarjeta-actividad/TarjetaActividad'
import { TarjetaSala } from '../../componentes/tarjeta-sala/TarjetaSala'
import { SeccionAnimales } from '../../componentes/seccion-animales/SeccionAnimales'
import { SeccionPlantas } from '../../componentes/seccion-plantas/SeccionPlantas'
import { SeccionColores } from '../../componentes/seccion-colores/SeccionColores'
import { SeccionSentidos } from '../../componentes/seccion-sentidos/SeccionSentidos'
import { Icono } from '../../componentes/icono/Icono'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Sala.css'

export function Sala() {
  const { idSala } = useParams()
  const sala = obtenerSala(idSala)
  const { estaDesbloqueada } = useProgreso()

  useTitulo(sala?.nombre || 'Sala no encontrada')

  if (!sala) {
    return (
      <NoEncontrada
        titulo="Esta sala todavía no existe"
        mensaje="Quizá escribimos mal el nombre. Vuelve al inicio y elige una de las cinco salas del museo."
      />
    )
  }

  const actividades = actividadesPorSala(sala.id)
  const sellos = recompensasPorSala(sala.id)
  const logrados = sellos.filter((sello) => estaDesbloqueada(sello.id)).length
  const otrasSalas = salas.filter((otra) => otra.id !== sala.id)

  return (
    <div
      className="sala"
      style={{ '--color-sala': sala.color, '--color-suave-sala': sala.colorSuave }}
    >
      <div className="contenedor">
        <nav className="sala__volver" aria-label="Volver">
          <Link to="/" className="enlace-sutil">
            <ChevronLeft size={18} strokeWidth={2.4} aria-hidden="true" />
            Volver al inicio
          </Link>
        </nav>

        <header className="sala__portada animar-aparecer">
          <div className="sala__texto">
            <p className="etiqueta">{sala.lema}</p>
            <h1>{sala.nombre}</h1>
            <p className="sala__descripcion">{sala.descripcionLarga}</p>

            <div className="boton-grupo">
              <BotonEscuchar texto={sala.bienvenida} etiqueta="Escuchar la bienvenida" variante="primario" />
              <Link to="/mi-rincon" className="boton boton--secundario">
                Mi colección
                <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>

            <div className="sala__progreso">
              <span className="sala__progreso-icono" aria-hidden="true">
                <Icono nombre="estrella" tamano={20} />
              </span>
              <p>
                <strong>
                  {logrados} de {sellos.length} sellos
                </strong>
                <span> de esta sala ya son tuyos</span>
              </p>
              <div className="sala__progreso-barra" aria-hidden="true">
                <span style={{ width: `${sellos.length ? (logrados / sellos.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>

          <figure className="sala__imagen">
            <img src={sala.imagen} alt={`Ilustración de la sala ${sala.nombre}`} width="800" height="520" />
            <figcaption>{sala.lema}</figcaption>
          </figure>
        </header>

        <section className="sala__curiosidades" aria-label="Dato curioso y pregunta para conversar">
          <article className="curiosidad">
            <span className="curiosidad__icono" aria-hidden="true">
              <Lightbulb size={24} strokeWidth={1.9} />
            </span>
            <div>
              <h2>¿Sabías que…?</h2>
              <p>{sala.sabiasQue}</p>
            </div>
            <BotonEscuchar
              texto={sala.sabiasQue}
              etiqueta="Escuchar"
              variante="fantasma"
              className="curiosidad__boton"
            />
          </article>

          <article className="curiosidad curiosidad--pregunta">
            <span className="curiosidad__icono" aria-hidden="true">
              <MessageCircle size={24} strokeWidth={1.9} />
            </span>
            <div>
              <h2>Para conversar</h2>
              <p>{sala.pregunta}</p>
              <small>Una pregunta abierta: no hay respuestas correctas.</small>
            </div>
          </article>
        </section>

        <section className="sala__actividades" aria-labelledby="titulo-actividades">
          <div className="encabezado-seccion">
            <div>
              <p className="etiqueta">
                <Sparkles size={14} aria-hidden="true" />
                Elige tu juego
              </p>
              <h2 id="titulo-actividades">Actividades de esta sala</h2>
            </div>
            <p>
              Puedes hacerlas en cualquier orden y repetirlas cuantas veces quieras. Kusi te
              acompañará con indicaciones en voz alta si lo necesitas.
            </p>
          </div>

          <ul className="sala__lista-actividades">
            {actividades.map((actividad, indice) => (
              <li key={actividad.id} className="animar-aparecer" style={{ '--retraso': `${indice * 80}ms` }}>
                <TarjetaActividad actividad={actividad} sala={sala} />
              </li>
            ))}
          </ul>
        </section>

        {sala.id === 'animales' && <SeccionAnimales />}

        {sala.id === 'plantas' && <SeccionPlantas />}

        {sala.id === 'colores' && <SeccionColores />}

        {sala.id === 'cuerpo-humano' && <SeccionSentidos />}

        <section className="sala__otras" aria-labelledby="titulo-otras">
          <div className="encabezado-seccion">
            <div>
              <h2 id="titulo-otras">Otras salas para visitar</h2>
            </div>
            <p>Puedes cambiar de sala cuando quieras. Cada una tiene su propia voz y sus juegos.</p>
          </div>

          <div className="sala__otras-grilla">
            {otrasSalas.map((otra, indice) => (
              <TarjetaSala key={otra.id} sala={otra} retraso={indice * 60} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
