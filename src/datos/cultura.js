/**
 * Datos para la sala "Cultura y Tradiciones"
 *
 * Categorías:
 * - Danzas típicas del Perú
 * - Fiestas tradicionales
 *
 * Cada elemento busca automáticamente sus recursos por su `id`:
 *  - Imagen: src/activos/imagenes/cultura/{id}.(png|jpg|webp|svg)
 *  - Sonido/Música: src/activos/audios/cultura/{id}-sonido.(mp3|wav|ogg)
 *  - Descripción narrada: src/activos/audios/cultura/{id}-descripcion.(mp3|wav|ogg)
 */
const imagenesCultura = import.meta.glob('../activos/imagenes/cultura/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const audiosCultura = import.meta.glob('../activos/audios/cultura/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const videosCultura = import.meta.glob('../activos/videos/cultura/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function buscarImagenCultura(id) {
  const clave = Object.keys(imagenesCultura).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? imagenesCultura[clave] : null
}

function buscarAudioCultura(id, tipo) {
  const clave = Object.keys(audiosCultura).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === `${id}-${tipo}` || nombre === `${id}_${tipo}` || nombre === id
  })
  return clave ? audiosCultura[clave] : null
}

function buscarVideoCultura(id) {
  const clave = Object.keys(videosCultura).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? videosCultura[clave] : null
}

export const categoriasCultura = [
  {
    id: 'danzas',
    nombre: 'Danzas Típicas del Perú',
    descripcion: 'Bailes llenos de ritmo, colores, trajes hermosos y alegría de nuestras tres regiones.',
    icono: 'musica',
  },
  {
    id: 'fiestas',
    nombre: 'Fiestas Tradicionales',
    descripcion: 'Celebraciones mágicas donde las familias y pueblos comparten música, comida y gratitud.',
    icono: 'fiesta',
  },
]

export const elementosCultura = [
  // --- Danzas típicas ---
  {
    id: 'marinera-nortena',
    categoria: 'danzas',
    nombre: 'La Marinera Norteña',
    origen: 'Costa peruana (Trujillo y Piura)',
    descripcion: 'Una danza elegante y alegre donde las parejas bailan con pañuelos al aire, sonrisas y zapateo coqueto.',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'huayno-valicha',
    categoria: 'danzas',
    nombre: 'El Huaylas y Huayno',
    origen: 'Sierra central y sur andino',
    descripcion: 'Danza de fuerza, energía y zapateo alegre con polleras coloridas bordadas a mano.',
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
  {
    id: 'danza-de-la-anaconda',
    categoria: 'danzas',
    nombre: 'Danza de la Selva',
    origen: 'Amazonía peruana',
    descripcion: 'Ritmos vivos con tambores y sonajas que celebran la naturaleza, los ríos y los espíritus del bosque.',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  {
    id: 'tondero-piurano',
    categoria: 'danzas',
    nombre: 'El Tondero Piurano',
    origen: 'Piura y Morropón',
    descripcion: 'Bailado descalzos sobre la arena al son de la guitarra y el cajón, evocando el vuelo de las aves.',
    color: '#B07D3E',
    colorSuave: '#F6E4C6',
  },

  // --- Fiestas tradicionales ---
  {
    id: 'carnavales',
    categoria: 'fiestas',
    nombre: 'Los Carnavales (Fiesta de la Alegría)',
    origen: 'Cajamarca',
    descripcion: 'La celebración más colorida y alegre del año, llena de comparsas, música, danzas tradicionales, yunzas y juegos con agua y pintura.',
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'fiesta-de-la-candelaria',
    categoria: 'fiestas',
    nombre: 'Fiesta de la Candelaria',
    origen: 'Puno y el Lago Titicaca',
    descripcion: 'Miles de músicos y danzantes con trajes brillantes y máscaras llenan las calles de fiesta y devoción.',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
  {
    id: 'fiesta-de-san-juan',
    categoria: 'fiestas',
    nombre: 'La Fiesta de San Juan',
    origen: 'Toda la Selva Peruana',
    descripcion: 'Se celebra junto al río comiendo deliciosos juanes, con cantos, baños de purificación y fogatas alegres.',
    color: '#5F7A63',
    colorSuave: '#E6EFE2',
  },
  {
    id: 'senor-cautivo-ayabaca',
    categoria: 'fiestas',
    nombre: 'Señor Cautivo de Ayabaca',
    origen: 'Sierra de Piura',
    descripcion: 'Peregrinos caminan con fe entre montañas andinas para celebrar entre flores, cantos y campanas.',
    color: '#8A6552',
    colorSuave: '#F0E4DA',
  },
]

export const elementosCulturaListos = elementosCultura.map((item) => ({
  ...item,
  imagen: item.imagen || buscarImagenCultura(item.id),
  sonido: item.sonido || buscarAudioCultura(item.id, 'sonido'),
  videoUrl: item.videoUrl || buscarVideoCultura(item.id),
  descripcionAudio: item.descripcionAudio || buscarAudioCultura(item.id, 'descripcion'),
}))

export const obtenerCulturaPorCategoria = (catId) =>
  elementosCulturaListos.filter((elem) => elem.categoria === catId)
