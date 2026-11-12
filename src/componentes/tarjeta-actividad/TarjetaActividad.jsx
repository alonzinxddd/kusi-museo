import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { obtenerRecompensa } from '../../datos/coleccion'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { Icono } from '../icono/Icono'
import './TarjetaActividad.css'

const etiquetas = {
  pintar: 'Pintar',
  rompecabezas: 'Rompecabezas',
  tesoro: 'Buscar un tesoro',
  cuento: 'Cuento',
  sonidos: 'Hacer sonidos',
}

export function TarjetaActividad({ actividad, sala, color, colorSuave }) {
  const { estaDesbloqueada } = useProgreso()
  const recompensa = obtenerRecompensa(actividad.recompensaId)
  const completada = estaDesbloqueada(actividad.recompensaId)

  return (
    <Link
      to={actividad.ruta}
      className={`tarjeta-actividad${completada ? ' tarjeta-actividad--completada' : ''}`}
      style={{
        '--color-actividad': color || sala?.color || 'var(--terracota)',
        '--color-suave-actividad': colorSuave || sala?.colorSuave || 'var(--crema-hondo)',
      }}
    >
      <span className="tarjeta-actividad__icono" aria-hidden="true">
        <Icono nombre={recompensa?.icono || 'magia'} tamano={30} />
      </span>

      <span className="tarjeta-actividad__texto">
        <span className="tarjeta-actividad__tipo">{etiquetas[actividad.tipo] || 'Actividad'}</span>
        <strong>{actividad.nombre}</strong>
        <span className="tarjeta-actividad__descripcion">{actividad.descripcion}</span>
      </span>

      <span className="tarjeta-actividad__estado">
        {completada ? (
          <span className="tarjeta-actividad__sello">
            <Check size={15} strokeWidth={3} aria-hidden="true" />
            Sello logrado
          </span>
        ) : (
          <span className="tarjeta-actividad__flecha" aria-hidden="true">
            <ArrowRight size={20} strokeWidth={2.4} />
          </span>
        )}
      </span>
    </Link>
  )
}
