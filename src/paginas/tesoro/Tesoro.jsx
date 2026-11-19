import { useRef, useState } from 'react'
import { Check, Compass, Lightbulb, Search, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import bosque from '../../activos/imagenes/escenas/bosque-para-tesoro.png'
import perro from '../../activos/imagenes/objetos/perro.png'
import vaca from '../../activos/imagenes/objetos/vaca.png'
import paloma from '../../activos/imagenes/objetos/paloma.png'
import caballo from '../../activos/imagenes/objetos/caballo.png'
import gato from '../../activos/imagenes/objetos/gato.png'
import mascota from '../../activos/imagenes/marca/mascota-kusi.svg'
import { obtenerSala } from '../../datos/salas'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import { useTitulo } from '../../utilidades/useTitulo'
import { MarcoActividad } from '../../componentes/marco-actividad/MarcoActividad'
import { hablar, vozDisponible } from '../../servicios/voz'
import { NoEncontrada } from '../no-encontrada/NoEncontrada'
import './Tesoro.css'

const objetos = [
  {
    id: 'perro',
    nombre: 'perro amistoso',
    imagen: perro,
    x: 20,
    y: 81,
    tamano: 140,
    pista: 'Brilla muy cerca del primer árbol, a la izquierda del bosque.',
    color: '#E9B44C',
  },
  {
    id: 'vaca',
    nombre: 'vaca alegre',
    imagen: vaca,
    x: 86,
    y: 64,
    tamano: 180,
    pista: 'Descansa junto al árbol alto de la derecha, cerca del pasto.',
    color: '#D9A86C',
  },
  {
    id: 'paloma',
    nombre: 'paloma voladora',
    imagen: paloma,
    x: 51,
    y: 8,
    tamano: 90,
    pista: 'Vuela alto, entre las hojas y el arbol del centro.',
    color: '#A9C6C9',
  },
  {
    id: 'caballo',
    nombre: 'caballo elegante',
    imagen: caballo,
    x: 44,
    y: 58,
    tamano: 200,
    pista: 'Se esconde entre el perrito amigable y la paloma voladora.',
    color: '#E9B44C',
  },
  {
    id: 'gato',
    nombre: 'gato juguetón',
    imagen: gato,
    x: 67,
    y: 80,
    tamano: 120,
    pista: 'Cerca de la vaca alegre y cerca del pasto',
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
      const textoFinal = '¡Ya encontraste todos los animales! El bosque está muy contento.'
      setMensaje(textoFinal)
      if (vozDisponible()) {
        hablar(textoFinal)
      }
      return
    }
    setPista(siguiente.id)
    const textoPista = `Pista de Kusi: ${siguiente.pista}`
    setMensaje(textoPista)
    if (vozDisponible()) {
      hablar(siguiente.pista)
    }
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
        <Link to={`/salas/${sala.id}`} className="boton boton--fantasma">
          Volver a la sala
        </Link>
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
                className={`tesoro__objeto${hallado ? ' tesoro__objeto--hallado' : ''}${pista === objeto.id ? ' tesoro__objeto--pista' : ''
                  }`}
                style={{
                  left: `${objeto.x}%`,
                  top: `${objeto.y}%`,
                  '--color-objeto': objeto.color,
                  '--tamano-objeto': objeto.tamano ? `${objeto.tamano}px` : undefined,
                }}
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
