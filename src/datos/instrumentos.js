/**
 * Instrumentos musicales de la sala de Sonidos y música.
 *
 * Carga dinámica de imágenes y audios:
 * - Imágenes: src/activos/imagenes/sonidos/{id}.png (o jpg, webp, svg)
 * - Audios de sonido/efecto: src/activos/audios/instrumentos/{id}-sonido.(wav|mp3|ogg) o {id}.(wav|mp3|ogg)
 * - Audios de descripción narrada: src/activos/audios/instrumentos/{id}-descripcion.(wav|mp3|ogg)
 *
 * Si no hay audio de sonido, se simula con Web Audio API o mensaje.
 * Si no hay audio de descripción, la voz sintética del robot/Kusi la narra en voz alta automáticamente.
 */
const imagenesInstrumentos = import.meta.glob(
  '../activos/imagenes/sonidos/*.{svg,png,jpg,jpeg,webp}',
  {
    eager: true,
    import: 'default',
  },
)

const audiosInstrumentos = import.meta.glob(
  '../activos/audios/instrumentos/*.{wav,mp3,MP3,ogg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

function buscarImagen(id) {
  const clave = Object.keys(imagenesInstrumentos).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? imagenesInstrumentos[clave] : null
}

function buscarAudio(id, tipo) {
  const clave = Object.keys(audiosInstrumentos).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === `${id}-${tipo}` || nombre === `${id}_${tipo}` || (tipo === 'sonido' && nombre === id)
  })
  return clave ? audiosInstrumentos[clave] : null
}

export const instrumentos = [
  {
    id: 'piano',
    nombre: 'El Piano',
    familia: 'Cuerda percutida',
    descripcion:
      'El piano es un instrumento musical armónico y de cuerda percutida que produce sonido al golpear cuerdas de acero con macillos forrados de fieltro accionados mediante un teclado.',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  {
    id: 'tambor',
    nombre: 'El Tambor',
    familia: 'Percusión membranófono',
    descripcion:
      'El tambor es un instrumento musical de percusión membranófono que produce sonido al golpear una membrana tensada, llamada parche, sujeta a una caja de resonancia hueca llamada casco. Es uno de los instrumentos más antiguos y universales de la humanidad, utilizado para marcar el ritmo, en rituales, comunicación y música militar.',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'guitarra',
    nombre: 'La Guitarra',
    familia: 'Cuerda pulsada',
    descripcion:
      'La guitarra es un instrumento musical de cuerda pulsada compuesto por una caja de resonancia, un mástil con trastes y seis cuerdas que vibran para producir el sonido. Es uno de los instrumentos más populares, versátiles y accesibles del mundo.',
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'flauta',
    nombre: 'La Flauta',
    familia: 'Viento madera / metal',
    descripcion:
      'La flauta es un instrumento musical de viento que produce sonido mediante la vibración del aire en su interior, sin necesidad de usar cañas (como el clarinete) ni cuerdas. Es uno de los instrumentos más antiguos del mundo, valorado por su sonido brillante, ágil y melódico.',
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
]

export const instrumentosListos = instrumentos.map((item) => ({
  ...item,
  imagen: item.imagen || buscarImagen(item.id),
  sonido: item.sonido || buscarAudio(item.id, 'sonido'),
  descripcionAudio: item.descripcionAudio || buscarAudio(item.id, 'descripcion'),
}))
