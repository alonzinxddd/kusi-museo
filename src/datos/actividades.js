/**
 * Actividades del museo actualizadas.
 *
 * Salas activas:
 * - animales
 * - colores (Sala de arte)
 * - cultura (Cultura y tradiciones)
 * - sonidos
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
    id: 'pintura-colores',
    nombre: 'Pinta tu obra de arte',
    descripcion: 'Pinta una manta andina con los tonos y figuras que más te gusten.',
    tipo: 'pintar',
    salaId: 'colores',
    ruta: '/salas/colores/pintar/manta',
    recompensaId: 'pintura-colores',
  },
  {
    id: 'burbujas-colores',
    nombre: 'Burbujas mágicas de colores',
    descripcion: 'Revienta las burbujas del color que te pide Kusi. ¡Tócalas todas!',
    tipo: 'juego',
    salaId: 'colores',
    ruta: '/salas/colores/burbujas',
    recompensaId: 'puzzle-colores',
  },
  {
    id: 'pintura-cultura',
    nombre: 'Pinta el jardín de Kusi',
    descripcion: 'Elige un color y dale vida a esta hermosa escena tradicional.',
    tipo: 'pintar',
    salaId: 'cultura',
    ruta: '/salas/cultura/pintar/jardin',
    recompensaId: 'pintura-cultura',
  },
  {
    id: 'juego-danzas',
    nombre: 'Escucha y Descubre las Danzas',
    descripcion: 'Escucha la danza que pide Kusi y toca la imagen correcta entre Marinera, Anaconda y Huayno.',
    tipo: 'danzas',
    salaId: 'cultura',
    ruta: '/salas/cultura/danzas',
    recompensaId: 'cuento-cultura',
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
]

export const actividadesPorSala = (idSala) => actividades.filter((actividad) => actividad.salaId === idSala)

export const obtenerActividad = (idActividad) => actividades.find((actividad) => actividad.id === idActividad)

export const tiposActividad = [
  {
    tipo: 'pintar',
    nombre: 'Pintar una obra',
    descripcion: 'Colores, pinceles y tu imaginación.',
    ruta: '/salas/colores/pintar/manta',
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
    ruta: '/salas/cultura/cuento/semilla',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  {
    tipo: 'sonidos',
    nombre: 'Hacer sonidos',
    descripcion: 'Naturaleza, ritmo y música.',
    ruta: '/salas/sonidos/hacer-sonidos/naturaleza',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
]
