import marineraImg from '../activos/imagenes/danzas-juego/marinera.jpg'
import anacondaImg from '../activos/imagenes/danzas-juego/anaconda.jpg'
import huaynoImg from '../activos/imagenes/danzas-juego/huayno.jpg'

export const danzasDelJuego = [
  {
    id: 'marinera',
    nombre: 'La Marinera',
    nombreCorto: 'Marinera',
    region: 'Costa del Perú',
    frase: '¡Encuentra la Marinera! Se baila con pañuelos blancos al aire y elegante zapateo.',
    imagen: marineraImg,
    color: '#D97757',
    colorSuave: '#F8E1D5',
  },
  {
    id: 'anaconda',
    nombre: 'Danza de la Anaconda',
    nombreCorto: 'Anaconda',
    region: 'Selva amazónica',
    frase: '¡Encuentra la Danza de la Anaconda! Con vasijas en la cabeza, ritmo alegre y respeto a la naturaleza.',
    imagen: anacondaImg,
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
  },
  {
    id: 'huayno',
    nombre: 'El Huayno',
    nombreCorto: 'Huayno',
    region: 'Sierra y Andes',
    frase: '¡Encuentra el Huayno! Con polleras coloridas bordadas y zapateo lleno de energía.',
    imagen: huaynoImg,
    color: '#6E8A70',
    colorSuave: '#E2EBDD',
  },
]
