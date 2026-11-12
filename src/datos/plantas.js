/**
 * Plantas de la sala "Plantas y semillas", agrupadas por región.
 *
 * Cada entrada describe una planta y cada región tiene su audio automático por ID:
 *
 *   src/activos/imagenes/plantas/{id}.svg (o .png/.jpg/.webp)
 *   src/activos/audios/descripcion-plantas/{id}.mp3 (o .wav/.ogg)
 *   src/activos/audios/regiones/{id}.mp3 (o .wav/.ogg para los botones de región)
 */
const imagenes = import.meta.glob('../activos/imagenes/plantas/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const audiosPlantas = import.meta.glob('../activos/audios/descripcion-plantas/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const audiosRegiones = import.meta.glob('../activos/audios/regiones/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const placeholder = imagenes['../activos/imagenes/plantas/placeholder.svg']

function buscarImagen(id) {
  const clave = Object.keys(imagenes).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? imagenes[clave] : placeholder
}

function buscarAudio(id) {
  const clave = Object.keys(audiosPlantas).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? audiosPlantas[clave] : null
}

function buscarAudioRegion(id) {
  const clave = Object.keys(audiosRegiones).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '')
    return nombre === id
  })
  return clave ? audiosRegiones[clave] : null
}

export const regiones = [
  { 
    id: 'costa', 
    nombre: 'Costa', 
    color: '#D97757', 
    colorSuave: '#F8E1D5' 
  },
  { 
    id: 'sierra', 
    nombre: 'Sierra', 
    color: '#6E8A70', 
    colorSuave: '#E2EBDD' 
  },
  { 
    id: 'selva', 
    nombre: 'Selva', 
    color: '#3D5A6C', 
    colorSuave: '#DDE8E9' 
  },
].map((region) => ({
  ...region,
  audio: buscarAudioRegion(region.id), // Carga automática del audio de la región por ID
}))

export const plantas = [
  // --- Costa ---
  {
    id: 'algarrobo',
    region: 'costa',
    nombre: 'El Algarrobo',
    ubicacion: 'Costa',
    descripcion: 'Da sombra, y de su fruto sale la algarrobina.',
    color: '#B98A63',
    colorSuave: '#F6E4C6',
  },
  {
    id: 'palta',
    region: 'costa',
    nombre: 'La Palta',
    ubicacion: 'Costa',
    descripcion: 'Fruta cremosa que crece en árbol.',
    color: '#7F9B82',
    colorSuave: '#E6EFE2',
  },
  {
    id: 'algodon',
    region: 'costa',
    nombre: 'El Algodón Nativo',
    ubicacion: 'Costa',
    descripcion: 'De él sale la tela para la ropa.',
    color: '#A9C6C9',
    colorSuave: '#E8F1F2',
  },
  {
    id: 'cactus',
    region: 'costa',
    nombre: 'El Cactus San Pedro',
    ubicacion: 'Costa',
    descripcion: 'Guarda agua para vivir en lugares secos.',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
  // --- Sierra ---
  {
    id: 'papa',
    region: 'sierra',
    nombre: 'La Papa',
    ubicacion: 'Sierra',
    descripcion: 'Crece bajo la tierra, ¡hay más de 4,000 tipos!',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'quinua',
    region: 'sierra',
    nombre: 'La Quinua',
    ubicacion: 'Sierra',
    descripcion: 'Granito pequeño que nos da mucha energía.',
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'maiz-morado',
    region: 'sierra',
    nombre: 'El Maíz Morado',
    ubicacion: 'Sierra',
    descripcion: 'Con él se prepara la chicha morada.',
    color: '#8A6552',
    colorSuave: '#F0E4DA',
  },
  {
    id: 'cantuta',
    region: 'sierra',
    nombre: 'La Kantuta',
    ubicacion: 'Sierra',
    descripcion: 'La flor nacional, roja y amarilla.',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  // --- Selva ---
  {
    id: 'camu-camu',
    region: 'selva',
    nombre: 'El Camu Camu',
    ubicacion: 'Selva',
    descripcion: 'Fruta pequeña con mucha vitamina C.',
    color: '#E8A598',
    colorSuave: '#FBE4DE',
  },
  {
    id: 'sacha-inchi',
    region: 'selva',
    nombre: 'El Sacha Inchi',
    ubicacion: 'Selva',
    descripcion: 'Semilla conocida como "maní del inca".',
    color: '#8FA98F',
    colorSuave: '#E2EBDD',
  },
  {
    id: 'orquideas',
    region: 'selva',
    nombre: 'Las Orquídeas',
    ubicacion: 'Selva',
    descripcion: 'Flores de formas y colores muy variados.',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
  {
    id: 'una-de-gato',
    region: 'selva',
    nombre: 'La Uña de Gato',
    ubicacion: 'Selva',
    descripcion: 'Planta medicinal con forma de enredadera.',
    color: '#7F9B82',
    colorSuave: '#E6EFE2',
  },
]

export function enriquecerPlanta(planta) {
  return {
    ...planta,
    imagen: planta.imagen || buscarImagen(planta.id),
    descripcionAudio: planta.descripcionAudio || buscarAudio(planta.id),
  }
}

export const plantasListas = plantas.map(enriquecerPlanta)
export const obtenerPlanta = (id) => plantasListas.find((planta) => planta.id === id)
export const obtenerPlantas = () => plantasListas
export const plantasPorRegion = (region) =>
  plantasListas.filter((planta) => planta.region === region)
export const obtenerRegion = (id) => regiones.find((region) => region.id === id)