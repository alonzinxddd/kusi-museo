import animales from '../activos/imagenes/salas/animales.png'
import colores from '../activos/imagenes/salas/colores.svg'

export const rompecabezas = [
  {
    id: 'llama',
    nombre: 'La llama y sus amigos',
    descripcion: 'Una tarde tranquila en el bosque nuboso.',
    imagen: animales,
    salaId: 'animales',
    recompensaId: 'puzzle-animales',
    piezasIniciales: 4,
    bienvenida:
      'Toca una pieza y luego otra para cambiarlas de lugar. Puedes empezar con cuatro piezas y añadir más cuando quieras.',
  },
  {
    id: 'manta',
    nombre: 'Piezas de colores',
    descripcion: 'El rincón de arte de Kusi, lleno de pinceles y telas.',
    imagen: colores,
    salaId: 'colores',
    recompensaId: 'puzzle-colores',
    piezasIniciales: 4,
    bienvenida:
      'Mira bien la imagen completa y busca dónde va cada pieza. Toca dos piezas para intercambiarlas.',
  },
]

export const obtenerRompecabezas = (id) => rompecabezas.find((item) => item.id === id)
