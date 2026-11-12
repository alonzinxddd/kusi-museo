export function generarId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `kusi-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function barajar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

export function formatearFecha(fechaIso) {
  try {
    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(fechaIso))
  } catch {
    return ''
  }
}
