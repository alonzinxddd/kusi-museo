/**
 * Lectura en voz alta con la voz del navegador.
 * Sirve como guía de audio sin depender de archivos externos.
 */
let vozElegida = null

export function vozDisponible() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function elegirVoz() {
  if (!vozDisponible()) return null
  const voces = window.speechSynthesis.getVoices()
  if (!voces.length) return null
  vozElegida =
    voces.find((voz) => /^es-PE/i.test(voz.lang)) ||
    voces.find((voz) => /^es-419/i.test(voz.lang)) ||
    voces.find((voz) => /^es/i.test(voz.lang)) ||
    voces.find((voz) => /spanish|español/i.test(voz.name)) ||
    null
  return vozElegida
}

export function hablar(texto, { alTerminar, alFallar, velocidad = 0.92, tono = 1.03 } = {}) {
  if (!vozDisponible()) {
    alFallar?.()
    return false
  }
  window.speechSynthesis.cancel()
  const voz = vozElegida || elegirVoz()
  const mensaje = new SpeechSynthesisUtterance(texto)
  if (voz) {
    mensaje.voice = voz
    mensaje.lang = voz.lang
  } else {
    mensaje.lang = 'es-PE'
  }
  mensaje.rate = velocidad
  mensaje.pitch = tono
  mensaje.volume = 1
  mensaje.onend = () => alTerminar?.()
  mensaje.onerror = () => alFallar?.()
  window.speechSynthesis.speak(mensaje)
  return true
}

export function detenerVoz() {
  if (vozDisponible()) window.speechSynthesis.cancel()
}

if (vozDisponible() && typeof window.speechSynthesis.addEventListener === 'function') {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    vozElegida = null
    elegirVoz()
  })
}
