/**
 * Láminas para colorear.
 *
 * Los SVG se cargan como texto para poder pintar cada región.
 * Para añadir una lámina basta con dejar el archivo en
 * `src/activos/imagenes/colorear/` y agregar su entrada aquí.
 */
const archivos = import.meta.glob('../activos/imagenes/colorear/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const laminas = [
  {
    id: 'jardin',
    nombre: 'El jardín de Kusi',
    descripcion: 'Flores, una llama y una mariposa esperan tus colores.',
    salaId: 'plantas',
    recompensaId: 'pintura-plantas',
    archivo: 'jardin.svg',
    svg: archivos['../activos/imagenes/colorear/jardin.svg'],
    bienvenida:
      'Elige un color de la paleta y toca una parte del dibujo. Puedes pintar el cielo, las flores y la llama. Si algo no te gusta, puedes deshacerlo.',
  },
  {
    id: 'manta',
    nombre: 'La manta de los colores',
    descripcion: 'Una manta andina con franjas, rombos y flecos para pintar.',
    salaId: 'colores',
    recompensaId: 'pintura-colores',
    archivo: 'manta.svg',
    svg: archivos['../activos/imagenes/colorear/manta.svg'],
    bienvenida:
      'Esta manta tiene muchas figuras. Toca cada una con el color que elijas. No hay combinaciones correctas: prueba, mezcla y disfruta.',
  },
]

export const obtenerLamina = (id) => laminas.find((lamina) => lamina.id === id)
