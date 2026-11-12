/**
 * Reproducción de los audios propios del museo.
 * Los archivos viven en src/activos/audios/ y se registran automáticamente.
 */
const archivos = import.meta.glob('../activos/audios/**/*.wav', {
  eager: true,
  query: '?url',
  import: 'default',
})

const mapa = Object.fromEntries(
  Object.entries(archivos).map(([ruta, url]) => [ruta.split('/').pop().replace('.wav', ''), url]),
)

export const audiosDisponibles = Object.keys(mapa)

export function reproducirArchivo(nombre, { volumen = 0.75 } = {}) {
  const url = mapa[nombre]
  if (!url || typeof Audio === 'undefined') return null
  const audio = new Audio(url)
  audio.volume = volumen
  audio.play().catch(() => {
    // El navegador puede bloquear el audio hasta que haya una interacción.
  })
  return audio
}
