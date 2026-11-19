import llamaImg from '../activos/imagenes/rompecabeza/llama.png'
import selvaImg from '../activos/imagenes/rompecabeza/animales.png'
import coloresImg from '../activos/imagenes/rompecabeza/colores.png'

const imagenesRompecabeza = import.meta.glob(
  '../activos/imagenes/rompecabeza/*.{png,jpg,jpeg,webp,svg}',
  {
    eager: true,
    import: 'default',
  },
)

function buscarImagenRompecabeza(id, porDefecto) {
  const clave = Object.keys(imagenesRompecabeza).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? imagenesRompecabeza[clave] : porDefecto
}

export const rompecabezas = [
  {
    id: 'llama',
    nombre: 'La llama y sus amigos',
    descripcion: 'Una tarde tranquila con la llama y los amigos de la naturaleza.',
    imagen: buscarImagenRompecabeza('llama', llamaImg),
    imagenesDisponibles: [
      { id: 'llama', nombre: 'Amigos del campo', imagen: buscarImagenRompecabeza('llama', llamaImg) },
      { id: 'selva', nombre: 'Amigos en la selva', imagen: buscarImagenRompecabeza('animales', selvaImg) },
    ],
    salaId: 'animales',
    recompensaId: 'puzzle-animales',
    piezasIniciales: 4,
    bienvenida:
      'Toca una pieza y luego otra para cambiarlas de lugar. Puedes elegir la imagen que quieras armar y cambiar entre cuatro o nueve piezas.',
  },
  {
    id: 'manta',
    nombre: 'Piezas de colores',
    descripcion: 'El rincón de arte de Kusi, lleno de pinceles y telas.',
    imagen: buscarImagenRompecabeza('colores', coloresImg),
    salaId: 'colores',
    recompensaId: 'puzzle-colores',
    piezasIniciales: 4,
    bienvenida:
      'Mira bien la imagen completa y busca dónde va cada pieza. Toca dos piezas para intercambiarlas.',
  },
]

export const obtenerRompecabezas = (id) => rompecabezas.find((item) => item.id === id)
