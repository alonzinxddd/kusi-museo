/**
 * Colección de sellos de Kusi.
 * Cada actividad entrega un sello distinto; no hay puntajes ni comparaciones.
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
    id: 'pintura-plantas',
    nombre: 'Jardín florecido',
    descripcion: 'Por pintar el jardín de Kusi.',
    salaId: 'plantas',
    icono: 'pintar',
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
  {
    id: 'cuento-plantas',
    nombre: 'Semilla valiente',
    descripcion: 'Por escuchar la historia de la semilla curiosa.',
    salaId: 'plantas',
    icono: 'cuento',
    color: '#5F7A63',
    colorSuave: '#E6EFE2',
  },
  {
    id: 'pintura-colores',
    nombre: 'Manta de arcoíris',
    descripcion: 'Por pintar una manta llena de color.',
    salaId: 'colores',
    icono: 'pintar',
    color: '#D97757',
    colorSuave: '#FAE5D4',
  },
  {
    id: 'puzzle-colores',
    nombre: 'Piezas de alegría',
    descripcion: 'Por completar el rompecabezas de colores.',
    salaId: 'colores',
    icono: 'rompecabezas',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
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
  {
    id: 'sonidos-cuerpo',
    nombre: 'Corazón que late',
    descripcion: 'Por hacer sonidos con tu cuerpo.',
    salaId: 'cuerpo-humano',
    icono: 'corazon',
    color: '#E8A598',
    colorSuave: '#FBE4DE',
  },
  {
    id: 'cuento-cuerpo',
    nombre: 'Respiración de brisa',
    descripcion: 'Por escuchar el cuento de la respiración.',
    salaId: 'cuerpo-humano',
    icono: 'viento',
    color: '#7E9DA1',
    colorSuave: '#E4EEEE',
  },
]

export const obtenerRecompensa = (id) => coleccion.find((recompensa) => recompensa.id === id)

export const recompensasPorSala = (idSala) => coleccion.filter((recompensa) => recompensa.salaId === idSala)
