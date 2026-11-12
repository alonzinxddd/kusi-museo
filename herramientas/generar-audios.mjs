/**
 * Generador de audios de Kusi.
 *
 * Crea los archivos .wav que viven en src/activos/audios/.
 * No requiere dependencias: usa matemáticas y el módulo fs de Node.
 *
 * Uso: npm run audios
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SR = 22050
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/activos/audios')

let semilla = 2026
function azar() {
  semilla |= 0
  semilla = (semilla + 0x6d2b79f5) | 0
  let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const seno = (fase) => Math.sin(fase * Math.PI * 2)
const ruido = () => azar() * 2 - 1
const suave = (t) => t * t * (3 - 2 * t)
const limitar = (x, min, max) => Math.min(max, Math.max(min, x))

function crearBuffer(segundos) {
  return new Float32Array(Math.ceil(segundos * SR))
}

function sumar(buffer, desde, duracion, generar) {
  const inicio = Math.floor(desde * SR)
  const total = Math.floor(duracion * SR)
  for (let i = 0; i < total; i += 1) {
    const indice = inicio + i
    if (indice >= 0 && indice < buffer.length) {
      buffer[indice] += generar(i / SR, i)
    }
  }
}

function envolvente(t, ataque, caida, sosten = 0) {
  if (t < ataque) return suave(t / ataque)
  if (t < ataque + sosten) return 1
  const resto = t - ataque - sosten
  if (resto >= caida) return 0
  return 1 - suave(resto / caida)
}

function normalizar(buffer, pico = 0.82, fundido = 0.025) {
  let maximo = 0
  for (let i = 0; i < buffer.length; i += 1) maximo = Math.max(maximo, Math.abs(buffer[i]))
  if (maximo > 0) {
    const escala = pico / maximo
    for (let i = 0; i < buffer.length; i += 1) buffer[i] *= escala
  }
  const n = Math.floor(fundido * SR)
  for (let i = 0; i < n && i < buffer.length; i += 1) {
    const f = i / n
    buffer[i] *= f
    buffer[buffer.length - 1 - i] *= f
  }
  return buffer
}

function guardarWav(rutaRelativa, buffer) {
  const ruta = path.join(DIR, rutaRelativa)
  fs.mkdirSync(path.dirname(ruta), { recursive: true })
  const datos = Buffer.alloc(buffer.length * 2)
  for (let i = 0; i < buffer.length; i += 1) {
    datos.writeInt16LE(Math.round(limitar(buffer[i], -1, 1) * 32767), i * 2)
  }
  const cabecera = Buffer.alloc(44)
  cabecera.write('RIFF', 0)
  cabecera.writeUInt32LE(36 + datos.length, 4)
  cabecera.write('WAVE', 8)
  cabecera.write('fmt ', 12)
  cabecera.writeUInt32LE(16, 16)
  cabecera.writeUInt16LE(1, 20)
  cabecera.writeUInt16LE(1, 22)
  cabecera.writeUInt32LE(SR, 24)
  cabecera.writeUInt32LE(SR * 2, 28)
  cabecera.writeUInt16LE(2, 32)
  cabecera.writeUInt16LE(16, 34)
  cabecera.write('data', 36)
  cabecera.writeUInt32LE(datos.length, 40)
  fs.writeFileSync(ruta, Buffer.concat([cabecera, datos]))
  console.log(`✓ ${rutaRelativa} (${(datos.length / 1024).toFixed(0)} KB)`)
}

// --- Sonidos -------------------------------------------------------------
function campanita() {
  const buffer = crearBuffer(2.6)
  const notas = [523.25, 659.25, 783.99, 1046.5]
  notas.forEach((frecuencia, i) => {
    const inicio = i * 0.28
    sumar(buffer, inicio, 1.9, (t) => {
      const env = Math.exp(-t * 3.2) * Math.min(1, t * 120)
      return env * (seno(frecuencia * t) + 0.32 * seno(frecuencia * 2 * t) + 0.12 * seno(frecuencia * 3 * t))
    })
  })
  return normalizar(buffer, 0.7)
}

function pajaro() {
  const buffer = crearBuffer(1.7)
  const llamadas = [
    [0.05, 0.16, 1900, 3300],
    [0.3, 0.14, 2300, 3600],
    [0.55, 0.2, 1700, 2900],
    [1.0, 0.12, 2600, 3400],
    [1.2, 0.15, 2100, 3200],
  ]
  llamadas.forEach(([inicio, duracion, f1, f2]) => {
    sumar(buffer, inicio, duracion, (t) => {
      const p = t / duracion
      const frecuencia = f1 + (f2 - f1) * Math.sin(p * Math.PI * 0.8) + 140 * seno(38 * t)
      return Math.sin((frecuencia * t) * Math.PI * 2) * envolvente(t, 0.01, duracion * 0.45)
    })
  })
  return normalizar(buffer, 0.5)
}

function rana() {
  const buffer = crearBuffer(1.5)
  ;[0.08, 0.62].forEach((inicio) => {
    sumar(buffer, inicio, 0.26, (t) => {
      const pulso = Math.pow(Math.max(0, Math.sin(t * Math.PI * 26)), 2)
      const tono = seno(115 * t) + 0.5 * seno(230 * t) + 0.25 * seno(345 * t)
      return tono * pulso * envolvente(t, 0.02, 0.2)
    })
    sumar(buffer, inicio + 0.3, 0.24, (t) => {
      const pulso = Math.pow(Math.max(0, Math.sin(t * Math.PI * 22)), 2)
      return (seno(105 * t) + 0.4 * seno(210 * t)) * pulso * envolvente(t, 0.02, 0.19)
    })
  })
  return normalizar(buffer, 0.55)
}

function agua() {
  const buffer = crearBuffer(2.6)
  let filtro = 0
  sumar(buffer, 0, 2.6, (t) => {
    const corte = 0.06 + 0.05 * Math.sin(t * 2.2)
    filtro += (ruido() - filtro) * corte
    const ambiente = filtro * (0.45 + 0.15 * seno(0.9 * t))
    return ambiente * Math.min(1, t * 2) * Math.min(1, (2.6 - t) * 2)
  })
  ;[0.3, 0.75, 1.2, 1.7, 2.1].forEach((inicio, i) => {
    sumar(buffer, inicio, 0.28, (t) => {
      const f = 900 + i * 95
      return seno(f * t) * Math.exp(-t * 12) * envolvente(t, 0.004, 0.25) * 0.28
    })
  })
  return normalizar(buffer, 0.5)
}

function viento() {
  const buffer = crearBuffer(3)
  let filtro = 0
  let filtro2 = 0
  sumar(buffer, 0, 3, (t) => {
    filtro += (ruido() - filtro) * 0.03
    filtro2 += (filtro - filtro2) * 0.05
    const vaiven = 0.55 + 0.35 * Math.sin(t * 1.4) + 0.1 * Math.sin(t * 3.7)
    return filtro2 * vaiven * Math.min(1, t * 1.4) * Math.min(1, (3 - t) * 1.4)
  })
  return normalizar(buffer, 0.55)
}

function grillo() {
  const buffer = crearBuffer(1.8)
  sumar(buffer, 0.06, 1.55, (t) => {
    const pulso = Math.pow(Math.max(0, Math.sin(t * Math.PI * 38)), 6)
    const tono = seno(4200 * t) + 0.3 * seno(8400 * t)
    return tono * pulso * (0.55 + 0.2 * seno(2.2 * t)) * envolvente(t, 0.02, 0.2)
  })
  return normalizar(buffer, 0.28)
}

function tambor() {
  const buffer = crearBuffer(2)
  ;[0.05, 0.62, 1.18, 1.58].forEach((inicio, i) => {
    const fuerza = i === 3 ? 0.7 : 1
    sumar(buffer, inicio, 0.55, (t) => {
      const frecuencia = 135 * Math.exp(-t * 8) + 48
      const golpe = seno(frecuencia * t) * Math.exp(-t * 5.5)
      const cuero = ruido() * Math.exp(-t * 24) * 0.22
      return (golpe + cuero) * fuerza
    })
  })
  return normalizar(buffer, 0.75)
}

function palmada() {
  const buffer = crearBuffer(0.6)
  let filtro = 0
  sumar(buffer, 0, 0.5, (t) => {
    const x = ruido()
    filtro += (x - filtro) * 0.35
    const banda = x - filtro
    return banda * Math.exp(-t * 26) * envolvente(t, 0.002, 0.3) * 1.4
  })
  return normalizar(buffer, 0.7)
}

function golpeBajo(duracion, base) {
  const buffer = crearBuffer(duracion + 0.15)
  sumar(buffer, 0, duracion, (t) => {
    const f = base * Math.exp(-t * 10) + 42
    const cuerpo = seno(f * t) * Math.exp(-t * 9)
    const ataque = ruido() * Math.exp(-t * 45) * 0.18
    return (cuerpo + ataque) * envolvente(t, 0.002, duracion * 0.7)
  })
  return normalizar(buffer, 0.65)
}

function chasquido() {
  const buffer = crearBuffer(0.35)
  sumar(buffer, 0.01, 0.16, (t) => {
    const click = ruido() * Math.exp(-t * 80) * 0.8
    const tono = seno(2800 * t) * Math.exp(-t * 55) * 0.4
    return click + tono
  })
  return normalizar(buffer, 0.6)
}

function latido() {
  const buffer = crearBuffer(1.5)
  ;[0.05, 0.32, 0.85, 1.12].forEach((inicio, i) => {
    const fuerza = i % 2 === 0 ? 1 : 0.65
    sumar(buffer, inicio, 0.3, (t) => {
      const f = 62 * Math.exp(-t * 7) + 36
      return seno(f * t) * Math.exp(-t * 9) * envolvente(t, 0.01, 0.22) * fuerza
    })
  })
  return normalizar(buffer, 0.65)
}

function respiracion() {
  const buffer = crearBuffer(3.2)
  let filtro = 0
  sumar(buffer, 0.08, 0.95, (t) => {
    filtro += (ruido() - filtro) * (0.035 + t * 0.02)
    const env = Math.sin((t / 0.95) * Math.PI)
    return filtro * env * 0.75
  })
  sumar(buffer, 1.5, 1.35, (t) => {
    filtro += (ruido() - filtro) * (0.06 - t * 0.015)
    const env = Math.sin((t / 1.35) * Math.PI)
    return filtro * env * 0.6
  })
  return normalizar(buffer, 0.45, 0.12)
}

function regionSonido(base, duracion = 1.4) {
  const buffer = crearBuffer(duracion)
  const notas = base
  notas.forEach((frecuencia, i) => {
    const inicio = i * 0.32
    sumar(buffer, inicio, 0.9, (t) => {
      const env = Math.exp(-t * 2.6) * Math.min(1, t * 80)
      return env * (seno(frecuencia * t) + 0.4 * seno(frecuencia * 2 * t))
    })
  })
  return normalizar(buffer, 0.6)
}

// --- Generación ----------------------------------------------------------

console.log('Generando audios de Kusi...')
guardarWav('campanita.wav', campanita())
guardarWav('naturaleza/pajaro.wav', pajaro())
guardarWav('naturaleza/rana.wav', rana())
guardarWav('naturaleza/agua.wav', agua())
guardarWav('naturaleza/viento.wav', viento())
guardarWav('naturaleza/grillo.wav', grillo())
guardarWav('naturaleza/tambor.wav', tambor())
guardarWav('cuerpo/palmada.wav', palmada())
guardarWav('cuerpo/muslo.wav', golpeBajo(0.4, 95))
guardarWav('cuerpo/pie.wav', golpeBajo(0.5, 68))
guardarWav('cuerpo/chasquido.wav', chasquido())
guardarWav('cuerpo/latido.wav', latido())
guardarWav('cuerpo/respiracion.wav', respiracion())
guardarWav('regiones/costa.wav', regionSonido([392, 523, 659]))
guardarWav('regiones/sierra.wav', regionSonido([440, 587, 740]))
guardarWav('regiones/selva.wav', regionSonido([330, 440, 554]))
console.log('Listo.')
