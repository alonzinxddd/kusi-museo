import { useRef, useState } from 'react'
import { Check, Compass, Lightbulb, Search, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import bosque from '../../activos/imagenes/escenas/bosque-para-tesoro.svg'
import estrella from '../../activos/imagenes/objetos/estrella.svg'
import llave from '../../activos/imagenes/objetos/llave.svg'
import mariposa from '../../activos/imagenes/objetos/mariposa.svg'
import caracol from '../../activos/imagenes/objetos/caracol.svg'
import seta from '../../activos/imagenes/objetos/seta.svg'
import mascota from '../../activos/imagenes/marca/mascota-kusi.svg'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { BotonEscuchar } from '../../componentes/boton-escuchar/BotonEscuchar'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Tesoro.css'

const objetos = [
  {
    id: 'estrella',
    nombre: 'Estrella dorada',
    imagen: estrella,
    x: 15,
    y: 81,
    pista: 'Brilla muy cerca de las piedras grandes, a la izquierda del bosque.',
    color: '#E9B44C',
  },
  {
    id: 'llave',
    nombre: 'Llave antigua',
    imagen: llave,
    x: 86,
    y: 64,
    pista: 'Descansa junto al árbol alto de la derecha, cerca del agua.',
    color: '#D9A86C',
  },
  {
    id: 'mariposa',
    nombre: 'Mariposa',
    imagen: mariposa,
    x: 51,
    y: 16,
    pista: 'Vuela alto, entre las hojas y la rama del centro.',
    color: '#A9C6C9',
  },
  {
    id: 'caracol',
    nombre: 'Caracol',
    imagen: caracol,
    x: 34,
    y: 75,
    pista: 'Se esconde entre las flores del arbusto del centro.',
    color: '#E9B44C',
  },
  {
    id: 'seta',
    nombre: 'Seta de lunares',
    imagen: seta,
    x: 64,
    y: 86,
    pista: 'Crece entre el pasto alto, a la derecha del sendero.',
    color: '#D97757',
  },
]

const bienvenida =
  '¡Hola! En este bosque hay cinco objetos escondidos. Toca donde creas que están. Si necesitas ayuda, pide una pista y yo te digo dónde mirar. No hay tiempo: busca con calma.'

export function Tesoro() {
  const { idSala } = useParams()
  const sala = obtenerSala(idSala)
  const { completarActividad } = useProgreso()
  const { reproducir } = useSonido()

  const [encontrados, setEncontrados] = useState([])
  const [pista, setPista] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const celebradoRef = useRef(false)

  useTitulo('El tesoro del bosque')

  const encontrar = (objeto) => {
    if (encontrados.includes(objeto.id)) return

    const nuevos = [...encontrados, objeto.id]
    setEncontrados(nuevos)
    setPista(null)
    setMensaje(`¡Encontraste ${objeto.nombre.toLowerCase()}! Míralo con calma y sigue buscando.`)
    reproducir('campanita', { volumen: 0.5 })

    if (nuevos.length === objetos.length && !celebradoRef.current) {
      celebradoRef.current = true
      setTimeout(() => completarActividad('tesoro-animales'), 500)
    }
  }

  const pedirPista = () => {
    const siguiente = objetos.find((objeto) => !encontrados.includes(objeto.id))
    if (!siguiente) {
      setMensaje('¡Ya encontraste todos los objetos! El bosque está muy contento.')
      return
    }
    setPista(siguiente.id)
    setMensaje(`Pista de Kusi: ${siguiente.pista}`)
  }

  if (!sala || sala.id !== 'animales') {
    return (
      <NoEncontrada
        titulo="Este tesoro está en otra sala"
        mensaje="El tesoro del bosque pertenece a la sala de animales de la región. Vuelve por ahí para empezar la búsqueda."
      />
    )
  }

  const completo = encontrados.length === objetos.length

  return (
    <MarcoActividad
      sala={sala}
      titulo="El tesoro del bosque"
      descripcion="Cinco objetos se escondieron entre árboles, piedras y flores. ¿Puedes encontrar todos?"
      bienvenida={bienvenida}
      className="tesoro"
      acciones={
        <>
          <BotonEscuchar texto={bienvenida} etiqueta="Escuchar pista inicial" variante="secundario" />
          <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
            Volver a la sala
          </Link>
        </>
      }
    >
      <div className="tesoro__barra">
        <div className="tesoro__contador" aria-live="polite">
          <span className="tesoro__contador-icono" aria-hidden="true">
            <Search size={19} strokeWidth={2.3} />
          </span>
          <p>
            <strong>
              {encontrados.length} de {objetos.length}
            </strong>{' '}
            objetos encontrados
          </p>
        </div>

        <button type="button" className="boton boton--secundario boton--pequeno" onClick={pedirPista}>
          <Lightbulb size={17} strokeWidth={2.2} aria-hidden="true" />
          Pedir una pista
        </button>
      </div>

      <div className="tesoro__escena">
        <img
          src={bosque}
          alt="Claro de bosque con árboles, un arroyo, piedras, flores y escondites"
          className="tesoro__fondo"
        />

        <div className="tesoro__objetos">
          {objetos.map((objeto) => {
            const hallado = encontrados.includes(objeto.id)
            return (
              <button
                type="button"
                key={objeto.id}
                className={`tesoro__objeto${hallado ? ' tesoro__objeto--hallado' : ''}${
                  pista === objeto.id ? ' tesoro__objeto--pista' : ''
                }`}
                style={{ left: `${objeto.x}%`, top: `${objeto.y}%`, '--color-objeto': objeto.color }}
                onClick={() => encontrar(objeto)}
                aria-label={hallado ? `${objeto.nombre}, ya encontrado` : `Buscar en este lugar`}
                aria-pressed={hallado}
              >
                <img src={objeto.imagen} alt="" />
                {hallado && (
                  <span className="tesoro__objeto-marca" aria-hidden="true">
                    <Check size={14} strokeWidth={3.4} />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {completo && (
          <div className="tesoro__brillo" aria-hidden="true">
            <Sparkles size={40} strokeWidth={1.4} />
          </div>
        )}
      </div>

      <div className="tesoro__mensaje">
        <img src={mascota} alt="" width="56" height="62" />
        <p role="status" aria-live="polite">
          {mensaje || 'Toca un lugar del bosque donde sospeches que hay algo escondido.'}
        </p>
      </div>

      <div className="tesoro__cesta" aria-label="Objetos del tesoro">
        {objetos.map((objeto) => {
          const hallado = encontrados.includes(objeto.id)
          return (
            <div
              key={objeto.id}
              className={`tesoro__cesta-item${hallado ? ' tesoro__cesta-item--hallado' : ''}`}
            >
              <span className="tesoro__cesta-icono" aria-hidden="true">
                {hallado ? <img src={objeto.imagen} alt="" /> : <Compass size={20} strokeWidth={1.8} />}
              </span>
              <span>{hallado ? objeto.nombre : 'Por descubrir'}</span>
            </div>
          )
        })}
      </div>

      {completo && (
        <div className="tesoro__logro animar-escala" role="status">
          <span className="tesoro__logro-icono" aria-hidden="true">
            <Sparkles size={26} strokeWidth={2} />
          </span>
          <div>
            <h2>¡Encontraste todo el tesoro!</h2>
            <p>Tus ojos de explorador ya tienen un sello nuevo en la colección.</p>
          </div>
          <Link to="/mi-rincon" className="boton boton--secundario">
            Ver mi colección
          </Link>
        </div>
      )}
    </MarcoActividad>
  )
}
