import animales from '../activos/imagenes/salas/animales.png'
import colores from '../activos/imagenes/salas/colores.png'
import sonidos from '../activos/imagenes/salas/sonidos.png'
import cultura from '../activos/imagenes/salas/cultura.png'
/**
 * Cada sala es una entrada del museo.
 * Salas actuales:
 *  - animales: Animales de la región
 *  - colores: Sala de Arte y Colores (Pinturas, Videos y Colores)
 *  - cultura: Cultura y Tradiciones (Danzas típicas del Perú y Fiestas tradicionales)
 *  - sonidos: Sonidos y música
 */
export const salas = [
  {
    id: 'animales',
    nombre: 'Animales de la región',
    nombreCorto: 'Animales',
    lema: 'Patas, plumas y sorpresas',
    descripcion: 'Un burrito, una vaca lechera y animales de la granja te esperan entre algarrobales.',
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
    id: 'colores',
    nombre: 'Sala de Arte',
    nombreCorto: 'Arte',
    lema: 'Pinturas, vídeos y colores mágicos',
    descripcion: 'Pinturas, vídeos de arte, caballete y mezclas para imaginar y crear sin límites.',
    descripcionLarga:
      'El arte nos ayuda a sentir y expresar lo que llevamos en el corazón. Aquí descubrirás hermosas pinturas, vídeos de arte para aprender técnicas divertidas y un rincón de colores para experimentar.',
    color: '#D97757',
    colorSuave: '#FAE5D4',
    imagen: colores,
    sabiasQue:
      'Muchos artistas usan los colores de la naturaleza para pintar: tierras rojas, flores amarillas y hojas verdes como pigmentos.',
    pregunta: '¿Qué colores usarías para pintar cómo te sientes hoy?',
    bienvenida:
      'Hola, soy Kusi. ¡Bienvenido a la Sala de Arte! Mira las pinturas, disfruta los vídeos y deja volar tu imaginación con los colores.',
  },
  {
    id: 'cultura',
    nombre: 'Cultura y Tradiciones',
    nombreCorto: 'cultura',
    lema: 'Danzas y fiestas de nuestra tierra',
    descripcion: 'Danzas típicas del Perú, trajes festivos y las fiestas tradicionales más hermosas.',
    descripcionLarga:
      'El Perú es un país lleno de ritmos, colores y celebraciones mágicas. En esta sala podrás descubrir danzas típicas de la costa, sierra y selva, y revivir nuestras fiestas tradicionales.',
    color: '#B07D3E',
    colorSuave: '#F6E4C6',
    imagen: cultura,
    sabiasQue:
      'En la marinera y el tondero, el pañuelo blanco en la mano representa elegancia y respeto, mientras que los pies descalzos sienten la calidez de la tierra.',
    pregunta: '¿Cuál es la fiesta o danza que más te gusta celebrar en familia?',
    bienvenida:
      'Hola, soy Kusi. Te invito a celebrar la riqueza de nuestra cultura peruana. ¡Escucha los ritmos y siente la alegría de nuestras tradiciones!',
  },
  {
    id: 'sonidos',
    nombre: 'Sonidos y música',
    nombreCorto: 'Sonidos',
    lema: 'Escuchar con orejas curiosas',
    descripcion: 'Instrumentos, aves y ritmos del bosque para escuchar y jugar.',
    descripcionLarga:
      'Cierra los ojos por un momento y escucha. En esta sala hay sonidos de la naturaleza y del bosque. Puedes tocar cada tarjeta y descubrir cómo suena.',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
    imagen: sonidos,
    sabiasQue:
      'La zampoña está hecha de tubos de distintos largos. Cada tubo produce una nota diferente.',
    pregunta: '¿Qué sonido te gustaría imitar?',
    bienvenida:
      'Hola, soy Kusi. Esta es la sala de los sonidos. Escucha con atención y toca cada tarjeta cuando quieras.',
  },
]

export const obtenerSala = (idSala) => salas.find((sala) => sala.id === idSala)

export const salasPorId = Object.fromEntries(salas.map((sala) => [sala.id, sala]))
