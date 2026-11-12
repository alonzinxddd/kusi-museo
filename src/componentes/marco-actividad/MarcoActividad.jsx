import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import mascota from '../../activos/imagenes/marca/mascota-kusi.svg'
import { BotonEscuchar } from '../boton-escuchar/BotonEscuchar'
import './MarcoActividad.css'

/**
 * Envoltorio común para las páginas de actividad.
 * Mantiene el encabezado, la guía de Kusi y el botón de volver a la sala.
 */
export function MarcoActividad({
  sala,
  titulo,
  descripcion,
  bienvenida,
  acciones,
  children,
  className = '',
}) {
  return (
    <div
      className={`marco-actividad ${className}`.trim()}
      style={{
        '--color-marco': sala?.color || 'var(--terracota)',
        '--color-suave-marco': sala?.colorSuave || 'var(--crema-hondo)',
      }}
    >
      <div className="contenedor">
        <nav className="migas" aria-label="Ruta de navegación">
          <Link to="/" className="migas__enlace">
            <Home size={16} strokeWidth={2.2} aria-hidden="true" />
            Inicio
          </Link>
          <ChevronRight size={15} className="migas__separador" aria-hidden="true" />
          <Link to={`/salas/${sala?.id || ''}`} className="migas__enlace">
            {sala?.nombreCorto || 'Sala'}
          </Link>
          <ChevronRight size={15} className="migas__separador" aria-hidden="true" />
          <span className="migas__actual" aria-current="page">
            {titulo}
          </span>
        </nav>

        <header className="marco-actividad__cabecera">
          <div className="marco-actividad__titulo">
            <p className="etiqueta">{sala?.nombre || 'Actividad'}</p>
            <h1>{titulo}</h1>
            {descripcion && <p className="marco-actividad__descripcion">{descripcion}</p>}
          </div>
          {acciones && <div className="marco-actividad__acciones">{acciones}</div>}
        </header>

        {bienvenida && (
          <aside className="guia-kusi" aria-label="Indicaciones de Kusi">
            <img src={mascota} alt="" className="guia-kusi__mascota" width="74" height="82" />
            <div className="guia-kusi__texto">
              <strong>Kusi te acompaña</strong>
              <p>{bienvenida}</p>
            </div>
            <BotonEscuchar texto={bienvenida} etiqueta="Escuchar" className="guia-kusi__boton" />
          </aside>
        )}

        <div className="marco-actividad__cuerpo">{children}</div>
      </div>
    </div>
  )
}
