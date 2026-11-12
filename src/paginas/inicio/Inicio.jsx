import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import mascota from '../../activos/imagenes/marca/mascota-kusi.svg'
import { salas } from '../../datos/salas'
import { tiposActividad } from '../../datos/actividades'
import { coleccion } from '../../datos/coleccion'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { Cortinas } from '../../componentes/cortinas/Cortinas'
import { TarjetaSala } from '../../componentes/tarjeta-sala/TarjetaSala'
import { Icono } from '../../componentes/icono/Icono'
import './Inicio.css'

const archivosPortada = import.meta.glob('../../activos/imagenes/portada.*', { eager: true, import: 'default' })
const portada =
  archivosPortada['../../activos/imagenes/portada.png'] ||
  archivosPortada['../../activos/imagenes/portada.jpg'] ||
  archivosPortada['../../activos/imagenes/portada.jpeg'] ||
  archivosPortada['../../activos/imagenes/portada.webp'] ||
  archivosPortada['../../activos/imagenes/portada.svg']

const saludo =
  '¡Hola! Soy Kusi, una llama curiosa. Te invito a recorrer cinco salas con animales, plantas, colores, sonidos y tu cuerpo. Aquí puedes mirar, escuchar y crear sin prisa. ¿Empezamos?'

const pasos = [
  {
    icono: 'compass',
    titulo: 'Elige una sala',
    texto: 'Cada sala tiene su propia voz, sus imágenes y sus juegos.',
  },
  {
    icono: 'manos',
    titulo: 'Juega a tu ritmo',
    texto: 'Puedes repetir, deshacer y volver cuando quieras. No hay prisa.',
  },
  {
    icono: 'estrella',
    titulo: 'Guarda un recuerdo',
    texto: 'Cada actividad deja un sello en tu colección, solo para ti.',
  },
]

export function Inicio() {
  useTitulo('Museo virtual infantil')

  const { cantidadSellos, totalSellos, estrellas } = useProgreso()

  return (
    <>
      <section className="hero">
        <div className="contenedor hero__contenido">
          <div className="hero__texto animar-aparecer">
            <p className="etiqueta">
              <Sparkles size={15} aria-hidden="true" />
              Para explorar de 3 a 5 años
            </p>

            <h1>
              Hola, soy Kusi.
              <span> ¿Exploramos juntos?</span>
            </h1>

            <p className="hero__descripcion">
              Un museo virtual pensado para mirar despacio, escuchar con atención y crear con las
              manos. Cinco salas, cinco formas de jugar y una colección que crece contigo.
            </p>

            <div className="hero__acciones">
              <a href="#salas" className="boton boton--primario boton--grande">
                Entrar a las salas
                <ArrowRight size={20} strokeWidth={2.4} aria-hidden="true" />
              </a>
              <BotonEscuchar texto={saludo} etiqueta="Escuchar a Kusi" variante="secundario" grande />
            </div>

            <dl className="hero__datos">
              <div>
                <dt>Salas</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>Actividades</dt>
                <dd>10</dd>
              </div>
              <div>
                <dt>Sellos</dt>
                <dd>{coleccion.length}</dd>
              </div>
            </dl>
          </div>

          <div className="hero__imagen animar-escala">
            <Cortinas imagen={portada} alt="Kusi comparte un jardín de flores con dos niños que leen y pintan" />

            <div className="hero__burbuja">
              <img src={mascota} alt="" width="52" height="58" />
              <p>Todo lo que hagas se queda en este dispositivo.</p>
            </div>

            <span className="hero__estrella hero__estrella--1" aria-hidden="true">
              <Star size={26} fill="currentColor" strokeWidth={1.2} />
            </span>
            <span className="hero__estrella hero__estrella--2" aria-hidden="true">
              <Star size={18} fill="currentColor" strokeWidth={1.2} />
            </span>
          </div>
        </div>
      </section>

      <section className="seccion pasos" aria-labelledby="titulo-pasos">
        <div className="contenedor">
          <h2 id="titulo-pasos" className="solo-lectores">
            Cómo funciona
          </h2>
          <ul className="pasos__lista">
            {pasos.map((paso, indice) => (
              <li key={paso.titulo} className={`pasos__item animar-aparecer retraso-${indice + 1}`}>
                <span className="pasos__icono" aria-hidden="true">
                  <Icono nombre={paso.icono} tamano={26} />
                </span>
                <div>
                  <h3>{paso.titulo}</h3>
                  <p>{paso.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion salas-inicio" id="salas" aria-labelledby="titulo-salas">
        <div className="contenedor">
          <div className="encabezado-seccion">
            <div>
              <p className="etiqueta">Las salas del museo</p>
              <h2 id="titulo-salas">¿Por dónde queremos empezar?</h2>
            </div>
            <p>
              Todas las salas están abiertas. Puedes entrar a la que te llame la atención y volver
              las veces que quieras: nada se cierra y nadie se queda atrás.
            </p>
          </div>

          <div className="salas-inicio__grilla">
            {salas.map((sala, indice) => (
              <TarjetaSala key={sala.id} sala={sala} retraso={indice * 70} />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion tipos" aria-labelledby="titulo-tipos">
        <div className="contenedor">
          <div className="tipos__panel">
            <div className="encabezado-seccion tipos__encabezado">
              <div>
                <p className="etiqueta">Cinco formas de jugar</p>
                <h2 id="titulo-tipos">Cada actividad, una manera distinta de mirar</h2>
              </div>
              <p>
                Pintar, armar, buscar, escuchar y hacer sonidos. Todas se pueden repetir y ninguna
                tiene tiempo límite.
              </p>
            </div>

            <ul className="tipos__lista">
              {tiposActividad.map((tipo, indice) => (
                <li key={tipo.tipo} className="animar-aparecer" style={{ '--retraso': `${indice * 60}ms` }}>
                  <Link
                    to={tipo.ruta}
                    className="tipo"
                    style={{ '--color-tipo': tipo.color, '--color-suave-tipo': tipo.colorSuave }}
                  >
                    <span className="tipo__icono" aria-hidden="true">
                      <Icono nombre={tipo.tipo} tamano={30} />
                    </span>
                    <strong>{tipo.nombre}</strong>
                    <span>{tipo.descripcion}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="seccion recompensas" aria-labelledby="titulo-recompensas">
        <div className="contenedor">
          <div className="recompensas__panel">
            <div className="recompensas__texto">
              <p className="etiqueta">
                <Star size={15} aria-hidden="true" />
                Recompensas suaves
              </p>
              <h2 id="titulo-recompensas">Estrellitas para recordar, no para ganar</h2>
              <p>
                Al terminar una actividad recibes un sello nuevo y tres estrellitas. No hay puntajes,
                relojes ni comparaciones: cada colección es única y avanza a su propio paso.
              </p>

              <ul className="recompensas__lista">
                <li>
                  <span aria-hidden="true">✦</span>
                  Cada sello cuenta una actividad vivida.
                </li>
                <li>
                  <span aria-hidden="true">✦</span>
                  Repetir una actividad nunca quita nada.
                </li>
                <li>
                  <span aria-hidden="true">✦</span>
                  Tus dibujos se guardan en tu galería personal.
                </li>
              </ul>

              <div className="boton-grupo">
                <Link to="/mi-rincon" className="boton boton--primario">
                  Ver mi rincón
                  <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
                </Link>
                <Link to="/para-acompanantes" className="boton boton--secundario">
                  Guía para acompañantes
                </Link>
              </div>
            </div>

            <div className="recompensas__medidor">
              <div className="recompensas__circulo">
                <strong>{cantidadSellos}</strong>
                <span>de {totalSellos} sellos</span>
              </div>
              <p>
                {cantidadSellos === 0
                  ? 'Tu colección está lista para el primer sello.'
                  : cantidadSellos >= totalSellos
                    ? '¡Completaste toda la colección! Puedes seguir jugando.'
                    : `Llevas ${estrellas} estrellitas guardadas.`}
              </p>
              <div className="recompensas__barra" aria-hidden="true">
                <span style={{ width: `${(cantidadSellos / totalSellos) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion acompanantes-cta">
        <div className="contenedor">
          <div className="acompanantes-cta__panel">
            <div className="acompanantes-cta__iconos" aria-hidden="true">
              <HeartHandshake size={30} strokeWidth={1.8} />
              <ShieldCheck size={30} strokeWidth={1.8} />
            </div>
            <div>
              <h2>Un museo para disfrutar acompañados</h2>
              <p>
                Encontrarás ideas para conversar, preguntas abiertas y recomendaciones de uso
                equilibrado de las pantallas. Sin cuentas, sin publicidad y sin datos personales.
              </p>
            </div>
            <Link to="/para-acompanantes" className="boton boton--secundario">
              Leer la guía
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
