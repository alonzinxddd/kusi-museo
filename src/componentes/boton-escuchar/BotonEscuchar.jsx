import { useEffect, useState } from 'react'
import { Square, Volume2 } from 'lucide-react'
import { detenerVoz, hablar, vozDisponible } from '../../servicios/voz'
import { useProgreso } from '../../contextos/ProgresoContexto'
import './BotonEscuchar.css'

/**
 * Botón de guía por voz.
 *
 * Lee un texto con la voz del navegador. Al desmontar detiene la lectura para
 * que no siga sonando cuando se cambia de página.
 */
export function BotonEscuchar({
  texto,
  etiqueta = 'Escuchar',
  variante = 'secundario',
  grande = false,
  velocidad = 0.92,
  className = '',
  alIniciar,
  alTerminar,
}) {
  const [hablando, setHablando] = useState(false)
  const { mostrarAviso } = useProgreso()

  useEffect(() => () => detenerVoz(), [])

  useEffect(() => {
    if (!texto) setHablando(false)
  }, [texto])

  const alternar = () => {
    if (hablando) {
      detenerVoz()
      setHablando(false)
      return
    }

    if (!vozDisponible()) {
      mostrarAviso('Este navegador no puede leer en voz alta. Puedes leer el texto junto a un adulto.')
      return
    }

    const inicio = hablar(texto, {
      velocidad,
      alTerminar: () => {
        setHablando(false)
        alTerminar?.()
      },
      alFallar: () => {
        setHablando(false)
        mostrarAviso('La voz se detuvo. Puedes intentarlo otra vez o leer con calma.')
      },
    })

    if (inicio) {
      setHablando(true)
      alIniciar?.()
    }
  }

  return (
    <button
      type="button"
      className={`boton boton--${variante}${grande ? ' boton--grande' : ''} boton-escuchar${hablando ? ' boton-escuchar--activo' : ''} ${className}`.trim()}
      onClick={alternar}
      aria-pressed={hablando}
    >
      {hablando ? (
        <Square size={18} strokeWidth={2.4} fill="currentColor" aria-hidden="true" />
      ) : (
        <Volume2 size={20} strokeWidth={2} aria-hidden="true" />
      )}
      <span>{hablando ? 'Detener' : etiqueta}</span>
    </button>
  )
}
