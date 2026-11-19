/**
 * Datos y configuración para la Sala de Arte (fusión con Colores y telares)
 *
 * Estructurado dinámicamente:
 * - pinturas: Cuadros/obras de arte
 * - videos: Videos de arte preparados para añadir archivos mp4/webm o URLs de YouTube
 *
 * Puedes agregar imágenes en: `src/activos/imagenes/arte/{id}.(png|jpg|webp|svg)`
 * Audios de narración en: `src/activos/audios/arte/{id}-descripcion.(mp3|wav|ogg)`
 * Videos en: `src/activos/videos/arte/{id}.(mp4|webm)` o pasarle un enlace `videoUrl`
 */
const imagenesArte = import.meta.glob('../activos/imagenes/arte/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const audiosArte = import.meta.glob('../activos/audios/arte/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const archivosVideosArte = import.meta.glob('../activos/videos/arte/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function buscarImagenArte(id) {
  const clave = Object.keys(imagenesArte).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? imagenesArte[clave] : null
}

function buscarAudioArte(id) {
  const clave = Object.keys(audiosArte).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id || nombre === `${id}-descripcion` || nombre === `${id}_descripcion`
  })
  return clave ? audiosArte[clave] : null
}

function buscarVideoArte(id) {
  const clave = Object.keys(archivosVideosArte).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? archivosVideosArte[clave] : null
}

export const pinturas = [
  {
    id: 'noche-estrellada',
    titulo: 'La Noche Estrellada',
    autor: 'Vincent van Gogh',
    tecnica: 'Óleo sobre lienzo',
    descripcion: 'Un cielo azul y dorado lleno de remolinos brillantes y estrellas que parecen bailar.',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  {
    id: 'mural-campestre',
    titulo: 'Paisaje y Colores del Campo',
    autor: 'Arte Andino y Costeño',
    tecnica: 'Pintura y pigmentos naturales',
    descripcion: 'Casitas de colores, cerros verdes y un sol brillante que abriga a los valles.',
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
  {
    id: 'mar-de-paita',
    titulo: 'Balsillas en el Mar de Paita',
    autor: 'Pintores del Norte',
    tecnica: 'Acuarela marina',
    descripcion: 'Pescadores navegando sobre aguas celestes al atardecer, con gaviotas en el cielo.',
    color: '#7E9DA1',
    colorSuave: '#E4EEEE',
  },
  {
    id: 'el-besito',
    titulo: 'El beso',
    autor: 'Gustav Klimt',
    tecnica: 'Óleo y pan de oro sobre lienzo',
    descripcion: 'Obra maestra del modernismo vienés que retrata a una pareja abrazada envuelta en túnicas decoradas con patrones geométricos dorados.',
    color: '#D97757',
    colorSuave: '#FAE5D4',
  },
]

export const videosArte = [
  {
    id: 'mezclando-colores',
    titulo: '¿Cómo nacen los colores mágicos?',
    duracion: '3 min',
    descripcion: 'Descubre qué pasa cuando mezclamos rojo, amarillo y azul con pinceles suaves.',
    videoUrl: '', // Puedes poner una URL local o externa (ej. YouTube embed)
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'pinceladas-divertidas',
    titulo: 'Pinceladas y trazos felices',
    duracion: '2 min',
    descripcion: 'Aprende a jugar con el agua, las témperas y los dedos para crear formas divertidas.',
    videoUrl: '',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'artesania-peruana',
    titulo: 'Manos creadoras del Perú',
    duracion: '4 min',
    descripcion: 'Un viaje para ver cómo las artesanas y artesanos dan vida a hermosas obras con barro e hilos.',
    videoUrl: '',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
]

export const pinturasListas = pinturas.map((p) => ({
  ...p,
  imagen: p.imagen || buscarImagenArte(p.id),
  descripcionAudio: p.descripcionAudio || buscarAudioArte(p.id),
}))

export const videosArteListos = videosArte.map((v) => ({
  ...v,
  archivoVideo: v.videoUrl || buscarVideoArte(v.id),
  portada: buscarImagenArte(v.id),
}))
