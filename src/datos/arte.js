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
    id: 'mona-lisa',
    titulo: 'La Gioconda (Mona Lisa)',
    autor: 'Leonardo da Vinci',
    tecnica: 'Óleo sobre tabla de álamo (Sfumato)',
    descripcion: 'Retrato enigmático de sonrisa sutil frente a un paisaje lejano de valles, ríos y montañas difuminadas.',
    color: '#7A6845',
    colorSuave: '#EAE3D2',
  },
  {
    id: 'el-grito',
    titulo: 'El grito (Skrik)',
    autor: 'Edvard Munch',
    tecnica: 'Óleo, temple y pastel sobre cartón',
    descripcion: 'Figura angustiada llevándose las manos al rostro frente a un fiordo bajo un cielo remolinado de tonos rojos y naranjas intensos.',
    color: '#C85A32',
    colorSuave: '#F5E1D8',
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
    titulo: '¿Qué es el arte?',
    duracion: '1.5 min',
    descripcion: 'El arte es jugar con colores, formas y sonidos para mostrar lo que sentimos por dentro',
    videoUrl: '', // Puedes poner una URL local o externa (ej. YouTube embed)
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'pinceladas-divertidas',
    titulo: 'Colores en Museo Kusi',
    duracion: '2.29  min',
    descripcion: 'Ven y diviertete con los colores en su visita al museo Kusi',
    videoUrl: '',
    color: '#D97757',
    colorSuave: '#F8E1D5',
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
