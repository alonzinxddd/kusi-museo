import semilla from '../activos/imagenes/cuentos/la-semilla-curiosa.svg'
import concierto from '../activos/imagenes/cuentos/el-concierto-del-bosque.svg'
import respiracion from '../activos/imagenes/cuentos/el-viaje-de-la-respiracion.svg'

/**
 * Cuentos cortos para leer y escuchar.
 * Cada página tiene un texto breve y una posición distinta de la ilustración
 * para que la imagen acompañe la lectura.
 */
export const cuentos = [
  {
    id: 'semilla',
    titulo: 'La semilla curiosa',
    salaId: 'plantas',
    recompensaId: 'cuento-plantas',
    imagen: semilla,
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
    ],
    preguntas: [
      '¿Qué necesita una semilla para crecer?',
      '¿Qué te gustaría plantar y cuidar?',
    ],
  },
  {
    id: 'concierto',
    titulo: 'El concierto del bosque',
    salaId: 'sonidos',
    recompensaId: 'cuento-sonidos',
    imagen: concierto,
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
    ],
    preguntas: [
      '¿Qué sonido te gustó más?',
      '¿Con qué parte de tu cuerpo puedes hacer música?',
    ],
  },
  {
    id: 'respiracion',
    titulo: 'El viaje de la respiración',
    salaId: 'cuerpo-humano',
    recompensaId: 'cuento-cuerpo',
    imagen: respiracion,
    color: '#E8A598',
    colorSuave: '#FBE4DE',
    resumen: 'Un paseo suave por el aire, el corazón y la calma.',
    bienvenida:
      'Puedes acompañar este cuento respirando despacio. Si quieres, pon una mano sobre tu pecho.',
    paginas: [
      {
        texto:
          'Kusi y Luna se sientan en el jardín. Luna pone una mano suave sobre su pecho y cierra los ojos.',
        posicion: '44% 56%',
      },
      {
        texto:
          'Toma aire por la nariz como una brisa suave... y suéltalo despacio, como una hoja que flota y baja.',
        posicion: '52% 40%',
      },
      {
        texto:
          'Su corazón hace toc, toc, toc. Su cuerpo es una casita que trabaja mientras descansa.',
        posicion: '38% 58%',
      },
      {
        texto:
          'Cuando el aire vuelve, Luna sonríe. Se siente tranquila, liviana y cerca de Kusi.',
        posicion: '62% 54%',
      },
    ],
    preguntas: [
      '¿Cómo se siente tu respiración?',
      '¿Qué parte de tu cuerpo se mueve cuando respiras?',
    ],
  },
]

export const obtenerCuento = (id) => cuentos.find((cuento) => cuento.id === id)
