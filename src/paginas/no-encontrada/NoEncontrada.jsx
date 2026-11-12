import { ArrowLeft, LayoutGrid } from 'lucide-react'
import { Link } from 'react-router-dom'
import mascota from '../../activos/imagenes/marca/mascota-kusi.svg'
import { useTitulo } from '../../utilidades/useTitulo'
import './NoEncontrada.css'

export function NoEncontrada({
  titulo = 'Kusi no encuentra esta página',
  mensaje = 'Puede que el camino se haya borrado o que el enlace tenga un error. No pasa nada: podemos volver al inicio y elegir otra sala.',
}) {
  useTitulo(titulo)

  return (
    <div className="no-encontrada">
      <div className="contenedor no-encontrada__caja animar-aparecer">
        <img src={mascota} alt="" className="no-encontrada__mascota" width="150" height="168" />

        <p className="etiqueta">Un pequeño desvío</p>
        <h1>{titulo}</h1>
        <p className="no-encontrada__mensaje">{mensaje}</p>

        <div className="no-encontrada__acciones">
          <Link to="/" className="boton boton--primario boton--grande">
            <ArrowLeft size={20} strokeWidth={2.4} aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link to="/#salas" className="boton boton--secundario boton--grande">
            <LayoutGrid size={19} strokeWidth={2.2} aria-hidden="true" />
            Ver las salas
          </Link>
        </div>

        <p className="no-encontrada__nota">Kusi te espera con las puertas abiertas.</p>
      </div>
    </div>
  )
}
