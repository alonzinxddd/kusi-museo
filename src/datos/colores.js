/**
 * Colores de la sala "Colores y telares".
 *
 * Cada entrada describe un color. Los archivos se buscan automáticamente
 * por el `id`:
 *
 *   src/activos/imagenes/colores/{id}.svg (o .png/.jpg/.webp)
 *   src/activos/audios/colores/{id}-color.wav  (o .mp3/.ogg)  -> dice el nombre
 *   src/activos/audios/colores/{id}-descripcion.wav (o .mp3/.ogg) -> narración
 *
 * Si no existe un archivo, se usa el marcador de posición y el botón queda
 * deshabilitado (o se usa la voz del navegador como respaldo). Para agregar
 * un color nuevo suma una entrada aquí y deja los archivos con el mismo `id`.
 */
const imagenes = import.meta.glob('../activos/imagenes/colores/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const audios = import.meta.glob('../activos/audios/colores/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const placeholder = imagenes['../activos/imagenes/colores/placeholder.svg']

function buscarImagen(id) {
  const clave = Object.keys(imagenes).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? imagenes[clave] : placeholder
}

function buscarAudio(id, sufijo) {
  const clave = Object.keys(audios).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === `${id}-${sufijo}` || nombre === `${id}_${sufijo}`
  })
  return clave ? audios[clave] : null
}

export const colores = [
  // --- Primarios ---
  {
    id: 'rojo',
    categoria: 'primario',
    nombre: 'El Rojo Alegre',
    ubicacion: 'Primario',
    descripcion: 'El color de las manzanas dulces y los bomberos valientes.',
    colorHex: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'amarillo',
    categoria: 'primario',
    nombre: 'El Amarillo Sol',
    ubicacion: 'Primario',
    descripcion: 'El color del sol brillante y las flores de girasol.',
    colorHex: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'azul',
    categoria: 'primario',
    nombre: 'El Azul Cielo',
    ubicacion: 'Primario',
    descripcion: 'El color del cielo despejado y el mar tranquilo.',
    colorHex: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  // --- Comunes ---
  {
    id: 'verde',
    categoria: 'comun',
    nombre: 'El Verde Hoja',
    ubicacion: 'Común',
    descripcion: 'El color de las hojas, el césped y las ranas saltarinas.',
    colorHex: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
  {
    id: 'naranja',
    categoria: 'comun',
    nombre: 'El Naranja Zanahoria',
    ubicacion: 'Común',
    descripcion: 'El color de las zanahorias, las naranjas y los atardeceres.',
    colorHex: '#D97757',
    colorSuave: '#FCE8DD',
  },
  {
    id: 'morado',
    categoria: 'comun',
    nombre: 'El Morado Uva',
    ubicacion: 'Común',
    descripcion: 'El color de las uvas, las berenjenas y las noches estrelladas.',
    colorHex: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
  {
    id: 'rosado',
    categoria: 'comun',
    nombre: 'El Rosado Flor',
    ubicacion: 'Común',
    descripcion: 'El color de las flores de cerezo y los flamencos elegantes.',
    colorHex: '#E8A598',
    colorSuave: '#FBE4DE',
  },
  {
    id: 'celeste',
    categoria: 'comun',
    nombre: 'El Celeste Agua',
    ubicacion: 'Común',
    descripcion: 'El color del agua clara y el cielo por la mañana.',
    colorHex: '#7E9DA1',
    colorSuave: '#E4EEEE',
  },
  {
    id: 'marron',
    categoria: 'comun',
    nombre: 'El Marrón Tierra',
    ubicacion: 'Común',
    descripcion: 'El color de la tierra, los árboles y el chocolate.',
    colorHex: '#8A6552',
    colorSuave: '#F0E4DA',
  },
  {
    id: 'blanco',
    categoria: 'comun',
    nombre: 'El Blanco Nube',
    ubicacion: 'Común',
    descripcion: 'El color de las nubes, la nieve y los conejitos suaves.',
    colorHex: '#ffffff',
    colorSuave: '#91a389',
  },
  {
    id: 'negro',
    categoria: 'comun',
    nombre: 'El Negro Noche',
    ubicacion: 'Común',
    descripcion: 'El color de la noche, los gatos y las pizarras para dibujar.',
    colorHex: '#3B302A',
    colorSuave: '#E8E2DD',
  },
  {
    id: 'gris',
    categoria: 'comun',
    nombre: 'El Gris Elefante',
    ubicacion: 'Común',
    descripcion: 'El color de los elefantes, las piedras y los días nublados.',
    colorHex: '#8A9B94',
    colorSuave: '#EAEFEC',
  },
]

export function enriquecerColor(color) {
  const nombreCorto = color.nombre.replace(/^El |^La |^Los |^Las /, '').split(' ')[0]
  return {
    ...color,
    imagen: color.imagen || buscarImagen(color.id),
    sonidoColor: color.sonidoColor || buscarAudio(color.id, 'color'),
    descripcionAudio: color.descripcionAudio || buscarAudio(color.id, 'descripcion'),
    nombreCorto,
  }
}

export const coloresListos = colores.map(enriquecerColor)
export const obtenerColor = (id) => coloresListos.find((color) => color.id === id)
export const obtenerColores = () => coloresListos
export const coloresPorCategoria = (categoria) =>
  coloresListos.filter((color) => color.categoria === categoria)
export const categoriasColor = [
  { id: 'primario', nombre: 'Colores primarios', descripcion: 'Los colores que no se pueden crear mezclando otros.' },
  { id: 'comun', nombre: 'Colores comunes', descripcion: 'Los colores que vemos todos los días en la naturaleza.' },
]
