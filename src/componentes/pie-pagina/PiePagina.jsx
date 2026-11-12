import { Heart, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import estrella from '../../activos/imagenes/marca/estrella-kusi.svg'
import './PiePagina.css'

export function PiePagina() {
  const anio = new Date().getFullYear()

  return (
    <footer className="pie">
      <div className="contenedor pie__contenido">
        <div className="pie__marca">
          <img src={estrella} alt="" width="48" height="48" />
          <div>
            <strong>Kusi</strong>
            <p>Un museo para mirar, escuchar y crear sin prisa.</p>
          </div>
        </div>

        <nav className="pie__enlaces" aria-label="Enlaces del pie de página">
          <Link to="/">Inicio</Link>
          <Link to="/#salas">Salas temáticas</Link>
          <Link to="/mi-rincon">Mi rincón</Link>
          <Link to="/para-acompanantes">Para familias y docentes</Link>
        </nav>

        <div className="pie__nota">
          <p className="pie__privacidad">
            <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
            Sin registro y sin publicidad. Tu progreso y tus dibujos quedan solo en este dispositivo.
          </p>
          <p className="pie__credito">Proyecto educativo · Museo Virtual Infantil · <br />
                                      Universidad Cesar Vallejo - Piura <br />
                                      {anio}</p>
        </div>
      </div>

      <div className="contenedor pie__final">
        <span>Hecho con cariño para explorar acompañados.</span>
        <Heart size={17} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
      </div>
    </footer>
  )
}
