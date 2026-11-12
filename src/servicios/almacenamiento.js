/**
 * Persistencia local del museo.
 * No se envía nada a ningún servidor: todo queda en este dispositivo.
 */
const CLAVES = {
  progreso: 'kusi.progreso.v1',
  galeria: 'kusi.galeria.v1',
  sonido: 'kusi.sonido.v1',
}

export const PROGRESO_INICIAL = {
  estrellas: 0,
  recompensas: [],
  version: 1,
}

export const MAXIMO_GALERIA = 8

function esObjeto(valor) {
  return typeof valor === 'object' && valor !== null
}

export function cargarProgreso() {
  try {
    const crudo = window.localStorage.getItem(CLAVES.progreso)
    if (!crudo) return { ...PROGRESO_INICIAL }
    const datos = JSON.parse(crudo)
    if (!esObjeto(datos)) return { ...PROGRESO_INICIAL }
    const recompensas = Array.isArray(datos.recompensas)
      ? [...new Set(datos.recompensas.filter((id) => typeof id === 'string'))]
      : []
    const estrellas = Number.isFinite(datos.estrellas) && datos.estrellas >= 0 ? datos.estrellas : 0
    return { estrellas, recompensas, version: 1 }
  } catch {
    return { ...PROGRESO_INICIAL }
  }
}

export function guardarProgreso(progreso) {
  try {
    window.localStorage.setItem(CLAVES.progreso, JSON.stringify(progreso))
    return true
  } catch {
    return false
  }
}

export function cargarGaleria() {
  try {
    const crudo = window.localStorage.getItem(CLAVES.galeria)
    if (!crudo) return []
    const datos = JSON.parse(crudo)
    if (!Array.isArray(datos)) return []
    return datos
      .filter(
        (creacion) =>
          esObjeto(creacion) &&
          typeof creacion.id === 'string' &&
          typeof creacion.imagen === 'string' &&
          creacion.imagen.startsWith('data:image/'),
      )
      .slice(0, MAXIMO_GALERIA)
  } catch {
    return []
  }
}

export function guardarGaleria(creaciones) {
  try {
    window.localStorage.setItem(CLAVES.galeria, JSON.stringify(creaciones))
    return true
  } catch {
    return false
  }
}

export function cargarPreferenciaSonido() {
  try {
    return window.localStorage.getItem(CLAVES.sonido) === 'apagado'
  } catch {
    return false
  }
}

export function guardarPreferenciaSonido(silenciado) {
  try {
    window.localStorage.setItem(CLAVES.sonido, silenciado ? 'apagado' : 'encendido')
  } catch {
    // Si el navegador bloquea el almacenamiento, la preferencia solo dura la visita.
  }
}
