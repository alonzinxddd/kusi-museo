import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { actividadesPorSala } from '../../datos/actividades'
import { recompensasPorSala } from '../../datos/coleccion'
import { useProgreso } from '../../contextos/ProgresoContexto'
import './TarjetaSala.css'

export function TarjetaSala({ sala, retraso = 0 }) {
  const { estaDesbloqueada } = useProgreso()
  const actividades = actividadesPorSala(sala.id)
  const sellos = recompensasPorSala(sala.id)
  const logrados = sellos.filter((sello) => estaDesbloqueada(sello.id)).length

  return (
    <Link
      to={`/salas/${sala.id}`}
      className="tarjeta-sala animar-aparecer"
      style={{
        '--color-sala': sala.color,
        '--color-suave-sala': sala.colorSuave,
        '--retraso': `${retraso}ms`,
      }}
    >
      <div className="tarjeta-sala__imagen">
        <img src={sala.imagen} alt="" loading="lazy" />
        {logrados === sellos.length && sellos.length > 0 && (
          <span className="tarjeta-sala__completa">
            <Sparkles size={15} aria-hidden="true" />
            Sala completa
          </span>
        )}
      </div>

      <div className="tarjeta-sala__cuerpo">
        <p className="tarjeta-sala__lema">{sala.lema}</p>
        <h3>{sala.nombre}</h3>
        <p className="tarjeta-sala__descripcion">{sala.descripcion}</p>

        <div className="tarjeta-sala__pie">
          <span>
            {actividades.length} {actividades.length === 1 ? 'actividad' : 'actividades'}
            {sellos.length > 0 && ` · ${logrados} de ${sellos.length} sellos`}
          </span>
          <span className="tarjeta-sala__ir" aria-hidden="true">
            Entrar
            <ArrowRight size={18} strokeWidth={2.4} />
          </span>
        </div>
      </div>
    </Link>
  )
}
