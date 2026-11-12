import { useState } from 'react'
import { MapPin, Volume2 } from 'lucide-react'
import { regiones, plantasListas, plantasPorRegion } from '../../datos/plantas'
import { TarjetaPlanta } from '../tarjeta-planta/TarjetaPlanta'
import { hablar, vozDisponible } from '../../servicios/voz'
import './SeccionPlantas.css'

export function SeccionPlantas() {
  const [regionActiva, setRegionActiva] = useState(null)

  const plantasVisibles =
    regionActiva === null ? plantasListas : plantasPorRegion(regionActiva)
  const region = regiones.find((item) => item.id === regionActiva)

  const reproducirRegion = (regionId, nombre) => {
    setRegionActiva(regionId)
    if (vozDisponible()) {
      hablar(`Región ${nombre}.`, { velocidad: 0.95 })
    }
  }

  const mostrarTodos = () => {
    setRegionActiva(null)
    if (vozDisponible()) {
      hablar('Todas las regiones.', { velocidad: 0.95 })
    }
  }

  return (
    <section className="seccion-plantas" aria-labelledby="titulo-plantas">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">Conoce a las plantas</p>
          <h2 id="titulo-plantas">Tarjetas de plantas por región</h2>
        </div>
        <p>
          Elige una región para escuchar su presentación y ver las plantas que crecen allí. Toca cada
          tarjeta para escuchar su descripción narrada.
        </p>
      </div>

      <div className="seccion-plantas__regiones" role="tablist" aria-label="Regiones del Perú">
        <button
          type="button"
          role="tab"
          aria-selected={regionActiva === null}
          className={`seccion-plantas__region${
            regionActiva === null ? ' seccion-plantas__region--activa' : ''
          }`}
          style={{ '--color-region': '#5F7A63', '--color-suave-region': '#E2EBDD' }}
          onClick={mostrarTodos}
        >
          <span className="seccion-plantas__region-icono" aria-hidden="true">
            <Volume2 size={18} strokeWidth={2.2} />
          </span>
          <span className="seccion-plantas__region-nombre">Todas</span>
          <span className="seccion-plantas__region-pista">Ver todas</span>
        </button>

        {regiones.map((item) => (
          <button
            type="button"
            key={item.id}
            role="tab"
            aria-selected={regionActiva === item.id}
            className={`seccion-plantas__region${
              regionActiva === item.id ? ' seccion-plantas__region--activa' : ''
            }`}
            style={{ '--color-region': item.color, '--color-suave-region': item.colorSuave }}
            onClick={() => reproducirRegion(item.id, item.nombre)}
          >
            <span className="seccion-plantas__region-icono" aria-hidden="true">
              <Volume2 size={18} strokeWidth={2.2} />
            </span>
            <span className="seccion-plantas__region-nombre">{item.nombre}</span>
            <span className="seccion-plantas__region-pista">Toca para escuchar</span>
          </button>
        ))}
      </div>

      <p className="seccion-plantas__region-activa" aria-live="polite">
        <MapPin size={16} strokeWidth={2.4} aria-hidden="true" />
        {region
          ? `Región ${region.nombre}: ${plantasVisibles.length} plantas`
          : `Todas las regiones: ${plantasVisibles.length} plantas`}
      </p>

      <div className="seccion-plantas__grilla">
        {plantasVisibles.map((planta) => (
          <TarjetaPlanta
            key={planta.id}
            planta={planta}
            imagen={planta.imagen}
            descripcionAudio={planta.descripcionAudio}
          />
        ))}
      </div>

      <p className="seccion-plantas__nota">
        Para agregar una planta nueva, suma una entrada en <code>src/datos/plantas.js</code> con su{' '}
        <code>region</code> y deja sus archivos en <code>src/activos/imagenes/plantas/</code> y{' '}
        <code>src/activos/audios/descripcion-plantas/</code> con el mismo <code>id</code>.
      </p>
    </section>
  )
}
