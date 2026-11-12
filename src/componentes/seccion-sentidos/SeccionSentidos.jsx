import { sentidosListos } from '../../datos/sentidos'
import { TarjetaSentido } from '../tarjeta-sentido/TarjetaSentido'
import './SeccionSentidos.css'

export function SeccionSentidos() {
  return (
    <section className="seccion-sentidos" aria-labelledby="titulo-sentidos">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">Conoce a los sentidos</p>
          <h2 id="titulo-sentidos">Tarjetas de los 5 sentidos</h2>
        </div>
        <p>
          Toca la imagen de cada sentido para oír su nombre. También puedes escuchar su descripción
          narrada con el botón de cada tarjeta.
        </p>
      </div>

      <div className="seccion-sentidos__grilla">
        {sentidosListos.map((sentido) => (
          <TarjetaSentido
            key={sentido.id}
            sentido={sentido}
            imagen={sentido.imagen}
            sonidoNombre={sentido.sonidoNombre}
            descripcionAudio={sentido.descripcionAudio}
          />
        ))}
      </div>
    </section>
  )
}
