import { Sparkles, X } from 'lucide-react'
import { useProgreso } from '../../contextos/ProgresoContexto'
import './Aviso.css'

export function Aviso() {
  const { aviso, cerrarAviso } = useProgreso()

  return (
    <div className={`aviso${aviso ? ' aviso--visible' : ''}`} role="status" aria-live="polite">
      {aviso && (
        <>
          <Sparkles size={20} aria-hidden="true" />
          <p>{aviso.mensaje}</p>
          <button type="button" onClick={cerrarAviso} aria-label="Cerrar el aviso">
            <X size={17} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}
