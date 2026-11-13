import animales from '../activos/imagenes/salas/animales.png'
import plantas from '../activos/imagenes/salas/plantas.png'
import colores from '../activos/imagenes/salas/colores.png'
import sonidos from '../activos/imagenes/salas/sonidos.png'
import cuerpoHumano from '../activos/imagenes/salas/cuerpo-humano.png'

/**
 * Cada sala es una entrada del museo.
 * Si se agrega una sala nueva, también hay que añadirla en este arreglo
 * y crear sus actividades en `datos/actividades.js`.
 */
export const salas = [
  {
    id: 'animales',
    nombre: 'Animales de la región',
    nombreCorto: 'Animales',
    lema: 'Patas, plumas y sorpresas',
    descripcion: 'Una llama, un oso de anteojos y un tucán te esperan entre las nubes.',
    descripcionLarga:
      'En esta sala conocerás animales que viven en nuestra región Piura. Mira sus formas, escucha sus historias y descubre por qué son tan especiales.',
    color: '#D97757',
    colorSuave: '#F8E1D5',
    imagen: animales,
    sabiasQue:
      'El caballo peruano de paso vive en los campos de Piura y es famoso porque camina bailando de lado a lado con mucha elegancia.',
    pregunta: '¿Qué animal te gustaría ver de cerca?',
    bienvenida:
      'Hola, soy Kusi. En esta sala conocerás animales que viven en nuestra región Piura. Mira sus formas, escucha sus historias y descubre por qué son tan especiales.',
  },
  {
    id: 'plantas',
    nombre: 'Plantas y semillas',
    nombreCorto: 'Plantas',
    lema: 'Crecer con paciencia',
    descripcion: 'Flores, hojas y semillas que crecen despacito, con agua y cariño.',
    descripcionLarga:
      'Las plantas son vecinas muy importantes. En esta sala verás cantutas, maíz, cacao y helechos. También podrás pintar un jardín y escuchar un cuento sobre una semilla.',
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
    imagen: plantas,
    sabiasQue:
      'La cantuta es la flor nacional del Perú. Crece en los Andes y sus flores pueden ser rojas, rosadas o amarillas.',
    pregunta: '¿Qué semilla te gustaría plantar?',
    bienvenida:
      'Hola, soy Kusi. Bienvenido a la sala de las plantas. Respira suave y mira cuántos verdes diferentes hay.',
  },
  {
    id: 'colores',
    nombre: 'Colores y telares',
    nombreCorto: 'Colores',
    lema: 'Un mundo de tonos',
    descripcion: 'Telares, pinceles y mezclas para imaginar sin miedo a equivocarse.',
    descripcionLarga:
      'Los colores pueden contar historias. Aquí encontrarás un caballete, pinturas y un telar andino. Elige tus tonos favoritos y crea algo que sea muy tuyo.',
    color: '#D97757',
    colorSuave: '#FAE5D4',
    imagen: colores,
    sabiasQue:
      'Muchos telares andinos cuentan historias con figuras y colores. Cada comunidad tiene sus propios diseños.',
    pregunta: '¿Cuál es tu color favorito y por qué?',
    bienvenida:
      'Hola, soy Kusi. Esta sala está llena de colores. No hay una forma correcta de pintar: tu forma es la mejor.',
  },
  {
    id: 'sonidos',
    nombre: 'Sonidos y música',
    nombreCorto: 'Sonidos',
    lema: 'Escuchar con orejas curiosas',
    descripcion: 'Instrumentos, aves y ritmos del bosque para escuchar y jugar.',
    descripcionLarga:
      'Cierra los ojos por un momento y escucha. En esta sala hay sonidos de la naturaleza y del cuerpo. Puedes tocar cada tarjeta y descubrir cómo suena.',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
    imagen: sonidos,
    sabiasQue:
      'La zampoña está hecha de tubos de distintos largos. Cada tubo produce una nota diferente.',
    pregunta: '¿Qué sonido te gustaría imitar?',
    bienvenida:
      'Hola, soy Kusi. Esta es la sala de los sonidos. Escucha con atención y toca cada tarjeta cuando quieras.',
  },
  {
    id: 'cuerpo-humano',
    nombre: 'Cuerpo humano',
    nombreCorto: 'Cuerpo',
    lema: 'Sentir, respirar, latir',
    descripcion: 'Sentidos, respiración y latidos que nos acompañan todos los días.',
    descripcionLarga:
      'Tu cuerpo es una casita que siente, respira y se mueve. Aquí podrás descubrir los sentidos, hacer sonidos con tu cuerpo y escuchar un cuento para respirar con calma.',
    color: '#E8A598',
    colorSuave: '#FBE4DE',
    imagen: cuerpoHumano,
    sabiasQue:
      'Tu corazón late sin descansar, incluso cuando duermes. Puedes sentirlo si pones una mano suave sobre tu pecho.',
    pregunta: '¿Qué parte de tu cuerpo sientes cuando respiras?',
    bienvenida:
      'Hola, soy Kusi. Esta es la sala del cuerpo. Ponte cómodo y respira conmigo. Sin apuro.',
  },
]

export const obtenerSala = (idSala) => salas.find((sala) => sala.id === idSala)

export const salasPorId = Object.fromEntries(salas.map((sala) => [sala.id, sala]))
