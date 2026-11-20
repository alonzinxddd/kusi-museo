/**
 * Colección de sellos de Kusi.
 * Cada actividad entrega un sello distinto.
 */
export const coleccion = [
  {
    id: 'puzzle-animales',
    nombre: 'Amistad andina',
    descripcion: 'Por armar el rompecabezas de la llama.',
    salaId: 'animales',
    icono: 'rompecabezas',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'tesoro-animales',
    nombre: 'Ojo de explorador',
    descripcion: 'Por encontrar el tesoro del bosque.',
    salaId: 'animales',
    icono: 'tesoro',
    color: '#B07D3E',
    colorSuave: '#F6E4C6',
  },
  {
    id: 'pintura-colores',
    nombre: 'Manta de arcoíris',
    descripcion: 'Por pintar una manta llena de arte y color.',
    salaId: 'colores',
    icono: 'pintar',
    color: '#D97757',
    colorSuave: '#FAE5D4',
  },
  {
    id: 'puzzle-colores',
    nombre: 'Explosión de colores',
    descripcion: 'Por reventar las burbujas mágicas de colores.',
    salaId: 'colores',
    icono: 'burbujas',
    color: '#FFC837',
    colorSuave: '#FFF5D6',
  },
  {
    id: 'pintura-cultura',
    nombre: 'Guardián de tradiciones',
    descripcion: 'Por descubrir las fiestas y costumbres peruanas en ¡Adivina la tradición!',
    salaId: 'cultura',
    icono: 'tesoro',
    color: '#B07D3E',
    colorSuave: '#F6E4C6',
  },
  {
    id: 'cuento-cultura',
    nombre: 'Explorador de danzas',
    descripcion: 'Por reconocer las danzas típicas del Perú.',
    salaId: 'cultura',
    icono: 'musica',
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'sonidos-naturaleza',
    nombre: 'Oído de búho',
    descripcion: 'Por descubrir los sonidos del bosque.',
    salaId: 'sonidos',
    icono: 'sonidos',
    color: '#9B7FA8',
    colorSuave: '#EEE5F2',
  },
  {
    id: 'cuento-sonidos',
    nombre: 'Noche de concierto',
    descripcion: 'Por escuchar el concierto del bosque.',
    salaId: 'sonidos',
    icono: 'cuento',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
]

export const obtenerRecompensa = (id) => coleccion.find((recompensa) => recompensa.id === id)

export const recompensasPorSala = (idSala) => coleccion.filter((recompensa) => recompensa.salaId === idSala)
