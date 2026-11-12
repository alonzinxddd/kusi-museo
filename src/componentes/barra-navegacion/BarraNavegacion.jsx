import { Home, LayoutGrid, Sparkles, Star, Users, Volume2, VolumeX } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useProgreso } from '../../contextos/ProgresoContexto'
import { useSonido } from '../../contextos/SonidoContexto'
import estrella from '../../activos/imagenes/marca/estrella-kusi.svg'
import './BarraNavegacion.css'

export function BarraNavegacion() {
  const { estrellas } = useProgreso()
  const { silenciado, alternarSonido } = useSonido()
  const ubicacion = useLocation()
  const navegar = useNavigate()

  const irASalas = (evento) => {
    if (ubicacion.pathname === '/') {
      evento.preventDefault()
      const destino = document.getElementById('salas')
      const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (destino) {
        destino.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' })
      } else {
        navegar('/#salas')
      }
    }
  }

  return (
    <>
      <header className="barra">
        <div className="contenedor barra__contenido">
          <Link to="/" className="marca" aria-label="Kusi, volver al inicio">
            <img className="marca__icono" src={estrella} alt="" width="46" height="46" />
            <span className="marca__texto">
              <strong>Kusi</strong>
              <small>Museo virtual infantil</small>
            </span>
          </Link>

          <nav className="barra__enlaces" aria-label="Navegación principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `barra__enlace${isActive ? ' barra__enlace--activo' : ''}`}
            >
              Inicio
            </NavLink>
            <Link to="/#salas" className="barra__enlace" onClick={irASalas}>
              Salas
            </Link>
            <NavLink
              to="/mi-rincon"
              className={({ isActive }) => `barra__enlace${isActive ? ' barra__enlace--activo' : ''}`}
            >
              Mi rincón
            </NavLink>
            <NavLink
              to="/para-acompanantes"
              className={({ isActive }) => `barra__enlace${isActive ? ' barra__enlace--activo' : ''}`}
            >
              Para acompañantes
            </NavLink>
          </nav>

          <div className="barra__acciones">
            <Link
              to="/mi-rincon"
              className="contador-estrellas"
              aria-label={`${estrellas} estrellitas en tu colección. Ir a Mi rincón`}
            >
              <Star size={20} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
              <span>{estrellas}</span>
            </Link>
            <button
              type="button"
              className="boton-sonido"
              onClick={alternarSonido}
              aria-pressed={!silenciado}
              title={silenciado ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {silenciado ? <VolumeX size={22} aria-hidden="true" /> : <Volume2 size={22} aria-hidden="true" />}
              <span className="solo-lectores">{silenciado ? 'Activar sonido' : 'Silenciar sonido'}</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="barra-inferior" aria-label="Navegación rápida">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `barra-inferior__enlace${isActive ? ' barra-inferior__enlace--activo' : ''}`}
        >
          <Home size={23} strokeWidth={1.9} aria-hidden="true" />
          <span>Inicio</span>
        </NavLink>
        <Link to="/#salas" className="barra-inferior__enlace" onClick={irASalas}>
          <LayoutGrid size={23} strokeWidth={1.9} aria-hidden="true" />
          <span>Salas</span>
        </Link>
        <NavLink
          to="/mi-rincon"
          className={({ isActive }) => `barra-inferior__enlace${isActive ? ' barra-inferior__enlace--activo' : ''}`}
        >
          <Sparkles size={23} strokeWidth={1.9} aria-hidden="true" />
          <span>Mi rincón</span>
        </NavLink>
        <NavLink
          to="/para-acompanantes"
          className={({ isActive }) => `barra-inferior__enlace${isActive ? ' barra-inferior__enlace--activo' : ''}`}
        >
          <Users size={23} strokeWidth={1.9} aria-hidden="true" />
          <span>Guía</span>
        </NavLink>
      </nav>
    </>
  )
}
