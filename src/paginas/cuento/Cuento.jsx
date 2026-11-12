import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, MessageCircle, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { obtenerCuento } from '../../datos/cuentos'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { detenerVoz } from '../../servicios/voz'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Cuento.css'

export function Cuento() {
  const { idSala, idCuento } = useParams()
  const cuento = obtenerCuento(idCuento)
  const sala = obtenerSala(idSala)
  const { completarActividad } = useProgreso()

  const [pagina, setPagina] = useState(0)
  const [terminado, setTerminado] = useState(false)

  useTitulo(cuento?.titulo || 'Cuento')

  useEffect(() => {
    detenerVoz()
  }, [pagina])

  useEffect(() => {
    setPagina(0)
    setTerminado(false)
  }, [cuento?.id])

  if (!cuento || !sala || cuento.salaId !== sala.id) {
    return (
      <NoEncontrada
        titulo="Este cuento está en otra sala"
        mensaje="Los cuentos viven en la sala de plantas, de sonidos y del cuerpo. Vuelve al inicio para encontrar el suyo."
      />
    )
  }

  const total = cuento.paginas.length
  const actual = cuento.paginas[pagina]
  const esUltima = pagina === total - 1

  const avanzar = () => {
    if (!esUltima) {
      setPagina((valor) => valor + 1)
      return
    }
    if (!terminado) {
      setTerminado(true)
      completarActividad(cuento.recompensaId)
    }
  }

  return (
    <MarcoActividad
      sala={sala}
      titulo={cuento.titulo}
      descripcion={cuento.resumen}
      bienvenida={cuento.bienvenida}
      className="cuento"
      acciones={
        <>
          <BotonEscuchar
            texto={cuento.paginas.map((item) => item.texto).join(' ')}
            etiqueta="Escuchar todo el cuento"
            variante="secundario"
          />
          <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
            Volver a la sala
          </Link>
        </>
      }
    >
      <div className="cuento__lector">
        <figure className="cuento__ilustracion">
          <img
            key={`${cuento.id}-${pagina}`}
            src={cuento.imagen}
            alt={`Ilustración del cuento ${cuento.titulo}, página ${pagina + 1}`}
            style={{ objectPosition: actual.posicion }}
          />
          <figcaption>
            Página {pagina + 1} de {total}
          </figcaption>
        </figure>

        <div className="cuento__texto-panel">
          <span className="cuento__marca" aria-hidden="true">
            <BookOpen size={18} strokeWidth={2.1} />
            Cuento corto
          </span>

          <p className="cuento__texto" key={pagina}>
            {actual.texto}
          </p>

          <div className="cuento__progreso" aria-hidden="true">
            <span style={{ width: `${((pagina + 1) / total) * 100}%` }} />
          </div>

          <div className="cuento__controles">
            <button
              type="button"
              className="boton boton--secundario boton--pequeno"
              onClick={() => setPagina((valor) => Math.max(0, valor - 1))}
              disabled={pagina === 0}
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Anterior
            </button>

            <ul className="cuento__puntos" aria-label="Páginas del cuento">
              {cuento.paginas.map((_, indice) => (
                <li key={indice}>
                  <button
                    type="button"
                    className={`cuento__punto${indice === pagina ? ' cuento__punto--activo' : ''}`}
                    onClick={() => setPagina(indice)}
                    aria-label={`Ir a la página ${indice + 1}`}
                    aria-current={indice === pagina ? 'page' : undefined}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="boton boton--primario boton--pequeno"
              onClick={avanzar}
              disabled={esUltima && terminado}
            >
              {esUltima ? (terminado ? 'Cuento terminado' : 'Terminé el cuento') : 'Siguiente'}
              {esUltima ? <Check size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
            </button>
          </div>

          <div className="cuento__escucha">
            <BotonEscuchar texto={actual.texto} etiqueta="Escuchar esta página" variante="fantasma" />
            <small>También puedes leerlo con un adulto o contarlo con tus palabras.</small>
          </div>
        </div>
      </div>

      <section className="cuento__preguntas" aria-labelledby="titulo-preguntas">
        <div className="cuento__preguntas-cabecera">
          <span aria-hidden="true">
            <MessageCircle size={22} strokeWidth={2} />
          </span>
          <div>
            <h2 id="titulo-preguntas">Para conversar después del cuento</h2>
            <p>No hay respuestas correctas. Son solo ideas para seguir imaginando juntos.</p>
          </div>
          <BotonEscuchar
            texto={cuento.preguntas.join(' ')}
            etiqueta="Escuchar preguntas"
            variante="secundario"
            className="cuento__preguntas-boton"
          />
        </div>

        <ul className="cuento__lista-preguntas">
          {cuento.preguntas.map((pregunta) => (
            <li key={pregunta}>{pregunta}</li>
          ))}
        </ul>
      </section>

      {terminado && (
        <div className="cuento__logro animar-escala" role="status">
          <span className="cuento__logro-icono" aria-hidden="true">
            <Sparkles size={26} strokeWidth={2} />
          </span>
          <div>
            <h2>¡Escuchaste todo el cuento!</h2>
            <p>Un sello nuevo te espera en tu colección. Puedes volver a leerlo cuando quieras.</p>
          </div>
          <Link to="/mi-rincon" className="boton boton--secundario">
            Ver mi sello
          </Link>
        </div>
      )}
    </MarcoActividad>
  )
}
