import { BookHeart, Eye, Handshake, MessageCircle, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import mascota from '../../activos/imagenes/marca/mascota-kusi.svg'
import { useTitulo } from '../../utilidades/useTitulo'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import './ParaAcompanantes.css'

const acompanar =
  'Acompañar a los niños en Kusi es tan importante como el juego. Siéntate cerca, escucha sus ideas y haz preguntas abiertas. No hay respuestas correctas: lo valioso es la conversación.'

const conversacion = [
  '¿Qué te gustó más de esta sala y por qué?',
  '¿Qué animal, planta o sonido te sorprendió?',
  'Si pudieras agregar algo al museo, ¿qué sería?',
  '¿Cómo se siente tu cuerpo cuando respiras despacio?',
  '¿Qué color elegiste y qué significa para ti?',
]

const tipsPantalla =
  'Se recomienda usar la pantalla en sesiones cortas, con un adulto cerca y en un lugar tranquilo. Después de jugar, invita a conversar, dibujar en papel o salir a mirar el entorno. El museo virtual es un punto de partida, no un fin.'

export function ParaAcompanantes() {
  useTitulo('Para acompañantes')

  return (
    <div className="acompanantes">
      <div className="contenedor">
        <header className="acompanantes__hero animar-aparecer">
          <div className="acompanantes__texto">
            <p className="etiqueta">
              <Handshake size={14} aria-hidden="true" />
              Guía para familias y docentes
            </p>
            <h1>Para acompañantes</h1>
            <p>
              Kusi está pensado para niñas y niños de 3 a 5 años. La pantalla es una puerta de
              entrada, pero el aprendizaje ocurre cuando un adulto acompaña, escucha y conversa.
            </p>
            <div className="boton-grupo">
              <BotonEscuchar texto={acompanar} etiqueta="Escuchar esta guía" variante="primario" />
              <Link to="/#salas" className="boton boton--secundario">
                Ver las salas
              </Link>
            </div>
          </div>

          <img src={mascota} alt="" className="acompanantes__mascota" width="150" height="168" />
        </header>

        <section className="acompanantes__bloque" aria-labelledby="titulo-acompanar">
          <div className="acompanantes__cabecera">
            <span aria-hidden="true">
              <Handshake size={22} strokeWidth={2} />
            </span>
            <div>
              <h2 id="titulo-acompanar">Cómo acompañar</h2>
              <p>
                Ideas sencillas para convertir cada juego en una experiencia compartida. No se
                trata de enseñar, sino de estar presentes.
              </p>
            </div>
            <BotonEscuchar texto={acompanar} etiqueta="Escuchar" variante="secundario" className="acompanantes__boton-cabecera" />
          </div>

          <ul className="acompanantes__tarjetas">
            <li>
              <h3>Siéntate a su lado</h3>
              <p>La proximidad física transmite calma. El niño se siente seguro y puede explorar con más confianza.</p>
            </li>
            <li>
              <h3>Haz preguntas abiertas</h3>
              <p>Prefiere preguntas que empiezan con «¿qué…?», «¿cómo…?» y «¿por qué…?». No corrijas sus respuestas.</p>
            </li>
            <li>
              <h3>Nombra lo que ve</h3>
              <p>Describe colores, formas y sonidos en voz alta. Ayuda a ampliar el vocabulario de manera natural.</p>
            </li>
            <li>
              <h3>Celebra el intento</h3>
              <p>Valora el proceso, no el resultado. Un dibujo «desordenado» también es un logro.</p>
            </li>
            <li>
              <h3>Deja tiempo de silencio</h3>
              <p>No llenes todos los vacíos con instrucciones. El silencio también enseña a observar.</p>
            </li>
            <li>
              <h3>Conecta con el entorno</h3>
              <p>Después de jugar, busca en la casa o el patio algo que recuerde a lo visto en el museo.</p>
            </li>
          </ul>
        </section>

        <section className="acompanantes__bloque" aria-labelledby="titulo-conversar">
          <div className="acompanantes__cabecera">
            <span aria-hidden="true">
              <MessageCircle size={22} strokeWidth={2} />
            </span>
            <div>
              <h2 id="titulo-conversar">Preguntas para conversar</h2>
              <p>Puedes leerlas una a una y dejar que el niño responda con dibujos, gestos o palabras.</p>
            </div>
            <BotonEscuchar
              texto={conversacion.join(' ')}
              etiqueta="Escuchar preguntas"
              variante="secundario"
              className="acompanantes__boton-cabecera"
            />
          </div>

          <ul className="acompanantes__preguntas">
            {conversacion.map((pregunta) => (
              <li key={pregunta}>{pregunta}</li>
            ))}
          </ul>
        </section>

        <section className="acompanantes__bloque" aria-labelledby="titulo-pantallas">
          <div className="acompanantes__cabecera">
            <span aria-hidden="true">
              <MonitorSmartphone size={22} strokeWidth={2} />
            </span>
            <div>
              <h2 id="titulo-pantallas">Uso equilibrado de pantallas</h2>
              <p>La pantalla acompaña, no reemplaza la experiencia directa con el mundo.</p>
            </div>
            <BotonEscuchar texto={tipsPantalla} etiqueta="Escuchar" variante="secundario" className="acompanantes__boton-cabecera" />
          </div>

          <ul className="acompanantes__lista-consejos">
            <li>
              <strong>Sesiones cortas:</strong> entre 10 y 15 minutos son suficientes para esta edad.
            </li>
            <li>
              <strong>Con adulto cerca:</strong> el acompañamiento vale más que el tiempo solo frente a la pantalla.
            </li>
            <li>
              <strong>Un lugar tranquilo:</strong> evita ruido fuerte y mucha luz para favorecer la atención.
            </li>
            <li>
              <strong>Después del juego:</strong> conversa, dibuja en papel o sal a mirar el entorno.
            </li>
            <li>
              <strong>Sin relojes ni puntajes:</strong> aquí no hay metas que cumplir, solo descubrir.
            </li>
          </ul>
        </section>

        <section className="acompanantes__bloque acompanantes__bloque--doble" aria-labelledby="titulo-privacidad">
          <article>
            <span className="acompanantes__icono-grande" aria-hidden="true">
              <ShieldCheck size={26} strokeWidth={1.8} />
            </span>
            <h2 id="titulo-privacidad">Privacidad y datos</h2>
            <p>
              Kusi no pide registro, nombres ni correos. No muestra publicidad ni envía información a
              servidores. El progreso, las estrellitas y los dibujos se guardan únicamente en este
              dispositivo, en el almacenamiento local del navegador.
            </p>
            <p className="acompanantes__nota">
              Si se borran los datos del navegador, el progreso se borra también. Para guardar un
              dibujo de forma permanente, usa el botón «Descargar» de Mi rincón.
            </p>
          </article>

          <article>
            <span className="acompanantes__icono-grande" aria-hidden="true">
              <Eye size={26} strokeWidth={1.8} />
            </span>
            <h2>Accesibilidad</h2>
            <p>
              La aplicación usa botones grandes, contraste suficiente y navegación por teclado. La
              guía por voz funciona con la voz del navegador y puede desactivarse en cualquier
              momento. También respeta la preferencia de movimiento reducido del sistema.
            </p>
            <p className="acompanantes__nota">
              Los audios propios son archivos ligeros en formato WAV, creados para este proyecto.
            </p>
          </article>
        </section>

        <section className="acompanantes__bloque" aria-labelledby="titulo-aprendizajes">
          <div className="acompanantes__cabecera">
            <span aria-hidden="true">
              <BookHeart size={22} strokeWidth={2} />
            </span>
            <div>
              <h2 id="titulo-aprendizajes">Qué se busca con Kusi</h2>
              <p>Objetivos pedagógicos suaves, pensados para el juego y la exploración.</p>
            </div>
          </div>

          <ul className="acompanantes__aprendizajes">
            <li>Reconocer animales, plantas y colores de la región con curiosidad.</li>
            <li>Desarrollar la atención auditiva y la coordinación motriz fina.</li>
            <li>Expresar ideas a través del dibujo y la creación libre.</li>
            <li>Practicar la respiración y la conciencia corporal.</li>
            <li>Vivir experiencias de logro sin competencia ni comparación.</li>
            <li>Compartir conversaciones en familia o en el aula.</li>
          </ul>
        </section>

        <div className="acompanantes__volver">
          <Link to="/" className="boton boton--secundario">
            Volver al inicio
          </Link>
          <Link to="/mi-rincon" className="boton boton--primario">
            Ir a mi rincón
          </Link>
        </div>
      </div>
    </div>
  )
}
