/**
 * Convierte el SVG de una lámina (con sus colores ya puestos) en una imagen
 * para guardarla en la galería local.
 */
export function cargarImagen(url) {
  return new Promise((resolver, rechazar) => {
    const imagen = new Image()
    imagen.onload = () => resolver(imagen)
    imagen.onerror = () => rechazar(new Error('No se pudo preparar la imagen.'))
    imagen.src = url
  })
}

export async function svgAImagen(svg, { ancho = 1000, alto = 750, fondo = '#FFFDF8' } = {}) {
  if (!svg) throw new Error('No hay una lámina para guardar.')
  const copia = svg.cloneNode(true)
  copia.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  copia.setAttribute('width', String(ancho))
  copia.setAttribute('height', String(alto))
  const texto = new XMLSerializer().serializeToString(copia)
  const blob = new Blob([texto], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  try {
    const imagen = await cargarImagen(url)
    const lienzo = document.createElement('canvas')
    lienzo.width = ancho
    lienzo.height = alto
    const contexto = lienzo.getContext('2d')
    if (!contexto) throw new Error('No se pudo crear el lienzo.')
    contexto.fillStyle = fondo
    contexto.fillRect(0, 0, ancho, alto)
    contexto.drawImage(imagen, 0, 0, ancho, alto)
    return lienzo.toDataURL('image/jpeg', 0.84)
  } finally {
    URL.revokeObjectURL(url)
  }
}
