import semillaDefecto from '../activos/imagenes/cuentos/la-semilla-curiosa.svg'
import conciertoDefecto from '../activos/imagenes/cuentos/el-concierto-del-bosque.svg'

// Carga automática de todas las imágenes que pongas en activos/imagenes/cuentos
const imagenesCuentos = import.meta.glob(
  '../activos/imagenes/cuentos/*.{svg,png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
)

const buscarImagenCuento = (patron) => {
  for (const ruta in imagenesCuentos) {
    const nombreArchivo = ruta.split('/').pop().toLowerCase()
    if (nombreArchivo.includes(patron.toLowerCase())) {
      return imagenesCuentos[ruta]
    }
  }
  return null
}

const resolverImagenPagina = (cuentoId, numeroPagina, imagenGeneral) => {
  // 1. Busca imagen específica para la página: ej. concierto-1.png, concierto_1.jpg, pagina-1.png
  const porPagina =
    buscarImagenCuento(`${cuentoId}-${numeroPagina}.`) ||
    buscarImagenCuento(`${cuentoId}_${numeroPagina}.`) ||
    buscarImagenCuento(`${cuentoId}-pag-${numeroPagina}.`) ||
    buscarImagenCuento(`${cuentoId}-pagina-${numeroPagina}.`)

  if (porPagina) return porPagina

  // 2. Si no hay por página, busca imagen personalizada general del cuento: ej. concierto.png, concierto.jpg
  const personalizada =
    buscarImagenCuento(`${cuentoId}.png`) ||
    buscarImagenCuento(`${cuentoId}.jpg`) ||
    buscarImagenCuento(`${cuentoId}.jpeg`) ||
    buscarImagenCuento(`${cuentoId}.webp`)

  return personalizada || imagenGeneral
}

/**
 * Cuentos cortos para leer y escuchar.
 */
export const cuentos = [
  {
    id: 'semilla',
    titulo: 'La semilla curiosa',
    salaId: 'cultura',
    recompensaId: 'cuento-cultura',
    imagen: semillaDefecto,
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
    resumen: 'Una semilla pequeñita descubre en qué se puede convertir.',
    bienvenida:
      'Acomódate y escucha. Puedes tocar «Escuchar» para oír la página o leerla tú mismo.',
    paginas: [
      {
        texto:
          'Luna tiene una semilla pequeñita en la mano. Su abuela le dice: «Déjala en la tierra y cuídala con paciencia».',
        posicion: '42% 48%',
      },
      {
        texto:
          'Luna riega la tierra cada mañana. Un día, una hojita verde asoma y saluda al sol con sus dos hojas pequeñas.',
        posicion: '52% 62%',
      },
      {
        texto:
          'La planta crece, crece y crece. Una mañana se abre una flor de cantuta. ¡La semilla curiosa ya sabe en qué quería convertirse!',
        posicion: '62% 46%',
      },
      {
        texto:
          'Luna invita a su llama Kusi a oler la flor. «Gracias, semilla», dice. «Gracias, paciencia», dice la abuela.',
        posicion: '38% 56%',
      },
    ].map((p, idx) => ({
      ...p,
      imagen: resolverImagenPagina('semilla', idx + 1, semillaDefecto),
    })),
    preguntas: [
      '¿Qué necesita una semilla para crecer?',
      '¿Qué te gustaría sembrar y cuidar en tu comunidad?',
    ],
  },
  {
    id: 'concierto',
    titulo: 'El concierto del bosque',
    salaId: 'sonidos',
    recompensaId: 'cuento-sonidos',
    imagen: conciertoDefecto,
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
    resumen: 'Cuando sale la luna, todos los animales tienen algo que cantar.',
    bienvenida:
      'Este cuento suena mejor con las orejas bien abiertas. ¿Qué instrumentos descubrirás?',
    paginas: [
      {
        texto:
          'Cuando sale la luna, el búho sube a su tronco y levanta la batuta. ¡El concierto va a comenzar!',
        posicion: '48% 42%',
      },
      {
        texto:
          'La rana raspa su hoja: croac, croac. El grillo toca su tamborcito: tin, tin, tin. La noche se llena de ritmo.',
        posicion: '34% 58%',
      },
      {
        texto:
          'El tucán canta: ¡tucán, tucán! La llama mueve las orejas. Hasta el viento acompaña con un shhh suave.',
        posicion: '66% 50%',
      },
      {
        texto:
          'Al final, el búho pide silencio. El bosque respira... y ese también es un sonido bonito.',
        posicion: '52% 60%',
      },
    ].map((p, idx) => ({
      ...p,
      imagen: resolverImagenPagina('concierto', idx + 1, conciertoDefecto),
    })),
    preguntas: [
      '¿Qué sonido te gustó más?',
      '¿Con qué parte de tu cuerpo puedes hacer música?',
    ],
  },
]

export const obtenerCuento = (id) => cuentos.find((cuento) => cuento.id === id)
