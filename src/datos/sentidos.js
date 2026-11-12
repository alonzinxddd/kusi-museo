/**
 * Sentidos del cuerpo humano, para la sala "Cuerpo humano".
 *
 * Cada entrada describe un sentido. Los archivos se buscan automáticamente
 * por el `id`:
 *
 *   src/activos/imagenes/sentidos/{id}.svg (o .png/.jpg/.webp)
 *   src/activos/audios/sentidos/{id}-nombre.wav  (o .mp3/.ogg) -> dice el nombre
 *   src/activos/audios/sentidos/{id}-descripcion.wav (o .mp3/.ogg) -> narración
 *
 * Si no existe un archivo, se usa el marcador de posición y la voz del
 * navegador como respaldo. Para agregar un sentido nuevo suma una entrada
 * aquí y deja los archivos con el mismo `id`.
 */
const imagenes = import.meta.glob('../activos/imagenes/sentidos/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const audios = import.meta.glob('../activos/audios/sentidos/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const placeholder = imagenes['../activos/imagenes/sentidos/placeholder.svg']

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

export const sentidos = [
  {
    id: 'vista',
    nombre: 'La Vista',
    organo: 'Los Ojos',
    ubicacion: 'Los ojos',
    descripcion: 'Con los ojos vemos los colores, las formas y las personas que queremos.',
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'oido',
    nombre: 'El Oído',
    organo: 'Las Orejas',
    ubicacion: 'Las orejas',
    descripcion: 'Con las orejas escuchamos la música, las voces y los sonidos del mundo.',
    color: '#7E9DA1',
    colorSuave: '#E4EEEE',
  },
  {
    id: 'olfato',
    nombre: 'El Olfato',
    organo: 'La Nariz',
    ubicacion: 'La nariz',
    descripcion: 'Con la nariz olemos las flores, la comida y el aire fresco.',
    color: '#8FA98F',
    colorSuave: '#E2EBDD',
  },
  {
    id: 'gusto',
    nombre: 'El Gusto',
    organo: 'La Lengua',
    ubicacion: 'La lengua',
    descripcion: 'Con la lengua probamos los sabores: dulce, salado, ácido y amargo.',
    color: '#E8A598',
    colorSuave: '#FBE4DE',
  },
  {
    id: 'tacto',
    nombre: 'El Tacto',
    organo: 'Las Manos y la Piel',
    ubicacion: 'Las manos y la piel',
    descripcion: 'Con las manos y la piel sentimos si algo es suave, áspero, frío o caliente.',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
]

export function enriquecerSentido(sentido) {
  return {
    ...sentido,
    imagen: sentido.imagen || buscarImagen(sentido.id),
    sonidoNombre: sentido.sonidoNombre || buscarAudio(sentido.id, 'nombre'),
    descripcionAudio: sentido.descripcionAudio || buscarAudio(sentido.id, 'descripcion'),
  }
}

export const sentidosListos = sentidos.map(enriquecerSentido)
export const obtenerSentido = (id) => sentidosListos.find((sentido) => sentido.id === id)
export const obtenerSentidos = () => sentidosListos