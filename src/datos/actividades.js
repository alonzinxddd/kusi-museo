/**
 * Actividades del museo.
 *
 * `tipo` decide qué página se abre y qué datos necesita la ruta.
 * `recompensaId` debe existir en `datos/coleccion.js`.
 */
export const actividades = [
  {
    id: 'rompecabezas-animales',
    nombre: 'La llama y sus amigos',
    descripcion: 'Toca dos piezas para cambiarlas de lugar hasta completar la imagen.',
    tipo: 'rompecabezas',
    salaId: 'animales',
    ruta: '/salas/animales/rompecabezas/llama',
    recompensaId: 'puzzle-animales',
  },
  {
    id: 'tesoro-animales',
    nombre: 'El tesoro del bosque',
    descripcion: 'Busca cinco objetos escondidos entre las plantas y las piedras.',
    tipo: 'tesoro',
    salaId: 'animales',
    ruta: '/salas/animales/tesoro',
    recompensaId: 'tesoro-animales',
  },
  {
    id: 'pintura-plantas',
    nombre: 'Pinta el jardín de Kusi',
    descripcion: 'Elige un color y pinta cada parte del jardín a tu manera.',
    tipo: 'pintar',
    salaId: 'plantas',
    ruta: '/salas/plantas/pintar/jardin',
    recompensaId: 'pintura-plantas',
  },
  {
    id: 'cuento-plantas',
    nombre: 'La semilla curiosa',
    descripcion: 'Escucha la historia de una semilla que crece con paciencia.',
    tipo: 'cuento',
    salaId: 'plantas',
    ruta: '/salas/plantas/cuento/semilla',
    recompensaId: 'cuento-plantas',
  },
  {
    id: 'pintura-colores',
    nombre: 'La manta de los colores',
    descripcion: 'Pinta una manta andina con los tonos que más te gusten.',
    tipo: 'pintar',
    salaId: 'colores',
    ruta: '/salas/colores/pintar/manta',
    recompensaId: 'pintura-colores',
  },
  {
    id: 'rompecabezas-colores',
    nombre: 'Piezas de colores',
    descripcion: 'Arma la imagen del rincón de arte y descubre sus detalles.',
    tipo: 'rompecabezas',
    salaId: 'colores',
    ruta: '/salas/colores/rompecabezas/manta',
    recompensaId: 'puzzle-colores',
  },
  {
    id: 'sonidos-naturaleza',
    nombre: 'La orquesta del bosque',
    descripcion: 'Toca cada tarjeta y escucha los sonidos de la naturaleza.',
    tipo: 'sonidos',
    salaId: 'sonidos',
    ruta: '/salas/sonidos/hacer-sonidos/naturaleza',
    recompensaId: 'sonidos-naturaleza',
  },
  {
    id: 'cuento-sonidos',
    nombre: 'El concierto del bosque',
    descripcion: 'Acompaña al búho y a sus amigos en un concierto bajo la luna.',
    tipo: 'cuento',
    salaId: 'sonidos',
    ruta: '/salas/sonidos/cuento/concierto',
    recompensaId: 'cuento-sonidos',
  },
  {
    id: 'sonidos-cuerpo',
    nombre: 'Mi cuerpo suena',
    descripcion: 'Haz palmas, pasos y latidos. Tu cuerpo también es un instrumento.',
    tipo: 'sonidos',
    salaId: 'cuerpo-humano',
    ruta: '/salas/cuerpo-humano/hacer-sonidos/cuerpo',
    recompensaId: 'sonidos-cuerpo',
  },
  {
    id: 'cuento-cuerpo',
    nombre: 'El viaje de la respiración',
    descripcion: 'Un cuento para respirar despacio y sentir los latidos.',
    tipo: 'cuento',
    salaId: 'cuerpo-humano',
    ruta: '/salas/cuerpo-humano/cuento/respiracion',
    recompensaId: 'cuento-cuerpo',
  },
]

export const actividadesPorSala = (idSala) => actividades.filter((actividad) => actividad.salaId === idSala)

export const obtenerActividad = (idActividad) => actividades.find((actividad) => actividad.id === idActividad)

export const tiposActividad = [
  {
    tipo: 'pintar',
    nombre: 'Pintar una obra',
    descripcion: 'Colores, pinceles y tu imaginación.',
    ruta: '/salas/plantas/pintar/jardin',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    tipo: 'rompecabezas',
    nombre: 'Armar un rompecabezas',
    descripcion: 'Piezas que buscan su lugar.',
    ruta: '/salas/animales/rompecabezas/llama',
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
  {
    tipo: 'tesoro',
    nombre: 'Buscar un tesoro',
    descripcion: 'Ojos curiosos y pequeños hallazgos.',
    ruta: '/salas/animales/tesoro',
    color: '#B07D3E',
    colorSuave: '#F6E4C6',
  },
  {
    tipo: 'cuento',
    nombre: 'Escuchar un cuento',
    descripcion: 'Historias para imaginar y conversar.',
    ruta: '/salas/plantas/cuento/semilla',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  {
    tipo: 'sonidos',
    nombre: 'Hacer sonidos',
    descripcion: 'Naturaleza, ritmo y cuerpo.',
    ruta: '/salas/sonidos/hacer-sonidos/naturaleza',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
]
