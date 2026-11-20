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
  }
]

export const obtenerLamina = (id) => laminas.find((lamina) => lamina.id === id)
