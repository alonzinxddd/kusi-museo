/**
 * Sonidos de las dos actividades «Hacer sonidos».
 * `archivo` coincide con el nombre del .wav en src/activos/audios/.
 */
export const modosDeSonido = {
  naturaleza: {
    id: 'naturaleza',
    nombre: 'La orquesta del bosque',
    descripcion: 'Sonidos de animales, agua, viento y tambor.',
    instruccion:
      'Toca cada tarjeta para escuchar. Cuando hayas descubierto los seis sonidos, tu colección te espera.',
    color: '#3D5A6C',
    colorSuave: '#DDE8E9',
    sonidos: [
      {
        id: 'pajaro',
        nombre: 'Pájaro',
        descripcion: 'Pío, pío, pío',
        archivo: 'pajaro',
        icono: 'pajaro',
        color: '#E9B44C',
      },
      {
        id: 'rana',
        nombre: 'Rana',
        descripcion: 'Croac, croac',
        archivo: 'rana',
        icono: 'rana',
        color: '#8FA98F',
      },
      {
        id: 'agua',
        nombre: 'Agua',
        descripcion: 'Plip, plop',
        archivo: 'agua',
        icono: 'agua',
        color: '#7E9DA1',
      },
      {
        id: 'viento',
        nombre: 'Viento',
        descripcion: 'Fuuu... shhh',
        archivo: 'viento',
        icono: 'viento',
        color: '#B7C7A7',
      },
      {
        id: 'grillo',
        nombre: 'Grillo',
        descripcion: 'Triii, triii',
        archivo: 'grillo',
        icono: 'grillo',
        color: '#9B7FA8',
      },
      {
        id: 'tambor',
        nombre: 'Tambor',
        descripcion: 'Tum, tum, tum',
        archivo: 'tambor',
        icono: 'tambor',
        color: '#D97757',
      },
    ],
  },
  cuerpo: {
    id: 'cuerpo',
    nombre: 'Mi cuerpo suena',
    descripcion: 'Palmas, pasos, latidos y respiración.',
    instruccion:
      'Haz los sonidos con tu cuerpo si quieres. Toca cada tarjeta y descubre cuántas formas de hacer música tienes.',
    color: '#E8A598',
    colorSuave: '#FBE4DE',
    sonidos: [
      {
        id: 'palmada',
        nombre: 'Palmada',
        descripcion: '¡Clap, clap!',
        archivo: 'palmada',
        icono: 'palmada',
        color: '#E9B44C',
      },
      {
        id: 'muslo',
        nombre: 'Muslo',
        descripcion: '¡Pom, pom!',
        archivo: 'muslo',
        icono: 'muslo',
        color: '#D97757',
      },
      {
        id: 'pie',
        nombre: 'Pie',
        descripcion: '¡Pum, pum!',
        archivo: 'pie',
        icono: 'pie',
        color: '#8A6552',
      },
      {
        id: 'chasquido',
        nombre: 'Chasquido',
        descripcion: '¡Tic!',
        archivo: 'chasquido',
        icono: 'chasquido',
        color: '#7E9DA1',
      },
      {
        id: 'latido',
        nombre: 'Latido',
        descripcion: 'Toc, toc',
        archivo: 'latido',
        icono: 'corazon',
        color: '#E8A598',
      },
      {
        id: 'respiracion',
        nombre: 'Respiración',
        descripcion: 'Fuuu...',
        archivo: 'respiracion',
        icono: 'viento',
        color: '#8FA98F',
      },
    ],
  },
}

export const obtenerModoSonido = (id) => modosDeSonido[id]
