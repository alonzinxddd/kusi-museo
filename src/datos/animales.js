const imagenes = import.meta.glob('../activos/imagenes/animales/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const audiosSonido = import.meta.glob('../activos/audios/sonido/*.{wav,mp3,MP3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Obtiene un placeholder seguro si existe
const placeholder = Object.values(imagenes)[0]

function buscarImagen(id) {
  const clave = Object.keys(imagenes).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()
    // Coincide si el nombre del archivo contiene el id o viceversa (ej: 'gato' con 'gato.png')
    return nombre === id.toLowerCase() || id.toLowerCase().includes(nombre)
  })
  return clave ? imagenes[clave] : placeholder
}

function buscarAudio(id) {
  const clave = Object.keys(audiosSonido).find((ruta) => {
    const nombre = ruta.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()
    return nombre === id.toLowerCase()
  })
  return clave ? audiosSonido[clave] : null
}

export const animales = [
  {
    id: 'gato',
    nombre: 'El Gato Michi',
    ubicacion: 'Casas y huertos',
    descripcion: 'Duerme muchas horas al día y le encanta ronronear cuando le acaricias las orejitas.',
    color: '#E9B44C',
    colorSuave: '#FFF4DA',
  },
  {
    id: 'burro',
    nombre: 'El Burrito Sabio',
    ubicacion: 'Senderos del campo',
    descripcion: 'Tiene orejas grandes para escuchar los secretos del viento y camina muy seguro por la montaña.',
    color: '#9C7A50',
    colorSuave: '#F5ECE1',
  },
  {
    id: 'caballo',
    nombre: 'El Caballo Veloz',
    ubicacion: 'Praderas y valles',
    descripcion: 'Corre por el campo como el viento y le gusta galopar libre bajo el sol.',
    color: '#A0522D',
    colorSuave: '#F7EDE4',
  },
  {
    id: 'cerdo',
    nombre: 'El Cerdito Rosado',
    ubicacion: 'Granja y lodo fresco',
    descripcion: 'Le encanta jugar en el lodo fresco cuando hace mucho calor para mantener su piel suave.',
    color: '#E0A96D',
    colorSuave: '#FDF3EC',
  },
  {
    id: 'perro',
    nombre: 'El Perrito Fiel',
    ubicacion: 'Alrededor del hogar',
    descripcion: 'Menea la colita con emoción cada vez que te ve llegar a casa.',
    color: '#D4A373',
    colorSuave: '#FAEDCD',
  },
  {
    id: 'vaca',
    nombre: 'La Vaca Lola',
    ubicacion: 'Praderas verdes',
    descripcion: 'Pasa todo el día masticando pastito fresco y produce la leche más rica para el desayuno.',
    color: '#6B705C',
    colorSuave: '#E9EDC9',
  },
  {
    id: 'pavo',
    nombre: 'El Pavo Elegante',
    ubicacion: 'Corral y arbustos',
    descripcion: 'Abre sus plumas en forma de abanico colorido cuando quiere verse muy imponente.',
    color: '#BC6C25',
    colorSuave: '#FEFAE0',
  },
  {
    id: 'pato',
    nombre: 'El Pato Don Pasto',
    ubicacion: 'Lagunas y ríos',
    descripcion: 'Nada tranquilamente en el agua haciendo burbujas y sus patitas parecen remos pequeños.',
    color: '#457B9D',
    colorSuave: '#E0FAFF',
  },
  {
    id: 'cabra',
    nombre: 'La Cabra Montés',
    ubicacion: 'Colinas rocosas',
    descripcion: 'Trepa por las rocas más altas con una habilidad increíble sin perder el equilibrio.',
    color: '#8D99AE',
    colorSuave: '#EDF2F4',
  },
  {
    id: 'oveja',
    nombre: 'La Oveja Nube',
    ubicacion: 'Colinas de pasto tierno',
    descripcion: 'Tiene un abriguito de lana blanca muy suave y mullido que la protege del frío de la colina.',
    color: '#D6CCC2',
    colorSuave: '#F5EBE6',
  },
  {
    id: 'gallina',
    nombre: 'La Gallina Clueca',
    ubicacion: 'Corral de la granja',
    descripcion: 'Cacarea alegremente mientras busca granitos de maíz y cuida con cariño a sus polluelos.',
    color: '#D4A373',
    colorSuave: '#FAEDCD',
  }
]

export function enriquecerAnimal(animal) {
  return {
    ...animal,
    imagen: animal.imagen || buscarImagen(animal.id),
    sonido: animal.sonido || buscarAudio(animal.id),
  }
}

export const animalesListos = animales.map(enriquecerAnimal)
export const obtenerAnimal = (id) => animalesListos.find((animal) => animal.id === id)
export const obtenerAnimales = () => animalesListos