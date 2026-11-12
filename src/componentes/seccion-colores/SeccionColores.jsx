import { coloresPorCategoria, categoriasColor } from '../../datos/colores'
import { TarjetaColor } from '../tarjeta-color/TarjetaColor'
import { hablar, vozDisponible } from '../../servicios/voz'
import { Volume2 } from 'lucide-react'
import './SeccionColores.css'

export function SeccionColores() {
  return (
    <section className="seccion-colores" aria-labelledby="titulo-colores">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">Conoce a los colores</p>
          <h2 id="titulo-colores">Tarjetas de colores</h2>
        </div>
        <p>
          Toca la imagen de un color para oír su nombre. También puedes escuchar su descripción
          narrada con el botón de cada tarjeta.
        </p>
      </div>

      {categoriasColor.map((categoria) => {
        const lista = coloresPorCategoria(categoria.id)
        if (!lista.length) return null
        return (
          <div key={categoria.id} className="seccion-colores__grupo">
            <button
              type="button"
              className="seccion-colores__cabecera seccion-colores__cabecera--clicable"
              onClick={() => {
                if (vozDisponible()) hablar(categoria.descripcion, { velocidad: 0.92 })
              }}
              aria-label={`Escuchar la descripción de ${categoria.nombre}`}
            >
              <h3>{categoria.nombre}</h3>
              <p>{categoria.descripcion}</p>
              <span className="seccion-colores__cabecera-pista">
                <Volume2 size={14} strokeWidth={2.4} aria-hidden="true" />
                Toca para escuchar
              </span>
            </button>
            <div className="seccion-colores__grilla">
              {lista.map((color) => (
                <TarjetaColor
                  key={color.id}
                  color={color}
                  sonidoColor={color.sonidoColor}
                  descripcionAudio={color.descripcionAudio}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
