/**
 * Láminas para colorear.
 *
 * Los SVG se cargan como texto para poder pintar cada región.
 */
const archivos = import.meta.glob('../activos/imagenes/colorear/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const laminas = [
  {
    id: 'manta',
    nombre: 'Bluey con un helado',
    descripcion: 'Un día soleado en el campo con Bluey, un helado dulce y flores.',
    salaId: 'colores',
    recompensaId: 'pintura-colores',
    archivo: 'bluey.svg',
    svg: archivos['../activos/imagenes/colorear/bluey.svg'],
    bienvenida:
      '¡Hola! Vamos a colorear a Bluey. Elige un color y toca el arcoíris, las flores, el sol o el rico helado. ¡Diviértete!',
  },
  {
    id: 'jardin',
    nombre: 'El jardín de Kusi',
    descripcion: 'Flores, una llama y una mariposa esperan tus colores.',
    salaId: 'cultura',
    recompensaId: 'pintura-cultura',
    archivo: 'jardin.svg',
    svg: archivos['../activos/imagenes/colorear/jardin.svg'],
    bienvenida:
      'Elige un color de la paleta y toca una parte del dibujo. Puedes pintar el cielo, las flores y la llama. Si algo no te gusta, puedes deshacerlo.',
  },
]

export const obtenerLamina = (id) => laminas.find((lamina) => lamina.id === id)
