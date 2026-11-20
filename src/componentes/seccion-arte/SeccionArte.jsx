import { useState, useRef, useEffect } from 'react'
import { pinturasListas, videosArteListos } from '../../datos/arte'
import { SeccionColores } from '../seccion-colores/SeccionColores'
import { hablar, detenerVoz, vozDisponible } from '../../servicios/voz'
import { Palette, Film, Headphones, Play, Pause, Volume2, Video, ZoomIn, X } from 'lucide-react'
import './SeccionArte.css'

export function SeccionArte() {
  const [pestanaActiva, setPestanaActiva] = useState('pinturas') // 'pinturas' | 'videos' | 'colores'
  const [reproduciendo, setReproduciendo] = useState(null)
  const [imagenModal, setImagenModal] = useState(null)
  const audioRef = useRef(null)

  const detenerAudio = () => {
    detenerVoz()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setReproduciendo(null)
  }

  useEffect(() => () => detenerAudio(), [])

  const escucharDescripcion = (id, texto, audioUrl) => {
    if (reproduciendo === id) {
      detenerAudio()
      return
    }
    detenerAudio()

    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      audio.addEventListener('ended', () => {
        setReproduciendo(null)
        audioRef.current = null
      })
      audio.play().catch(() => {
        if (vozDisponible()) {
          hablar(texto, { onEnd: () => setReproduciendo(null) })
        }
      })
      setReproduciendo(id)
    } else if (vozDisponible()) {
      hablar(texto, {
        onEnd: () => setReproduciendo(null),
        onError: () => setReproduciendo(null),
      })
      setReproduciendo(id)
    }
  }

  return (
    <section className="seccion-arte" aria-labelledby="titulo-arte">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">
            <Palette size={14} aria-hidden="true" />
            Galería y Creatividad
          </p>
          <h2 id="titulo-arte">Sala de Arte y Colores</h2>
        </div>
        <p>
          Descubre pinturas maravillosas, videos divertidos de arte para inspirarte y el rincón de colores
          con sus nombres y mezclas.
        </p>
      </div>

      {/* Selector de pestañas */}
      <div className="seccion-arte__pestanas" role="tablist" aria-label="Secciones de la sala de arte">
        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'pinturas'}
          className={`seccion-arte__pestana${pestanaActiva === 'pinturas' ? ' seccion-arte__pestana--activa' : ''}`}
          onClick={() => {
            detenerAudio()
            setPestanaActiva('pinturas')
          }}
        >
          <Palette size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>Pinturas</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'videos'}
          className={`seccion-arte__pestana${pestanaActiva === 'videos' ? ' seccion-arte__pestana--activa' : ''}`}
          onClick={() => {
            detenerAudio()
            setPestanaActiva('videos')
          }}
        >
          <Film size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>Vídeos de Arte</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={pestanaActiva === 'colores'}
          className={`seccion-arte__pestana${pestanaActiva === 'colores' ? ' seccion-arte__pestana--activa' : ''}`}
          onClick={() => {
            detenerAudio()
            setPestanaActiva('colores')
          }}
        >
          <Volume2 size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>Colores y Tonos</span>
        </button>
      </div>

      {/* Contenido según pestaña */}
      {pestanaActiva === 'pinturas' && (
        <div className="seccion-arte__panel animar-aparecer">
          <div className="seccion-arte__grilla-pinturas">
            {pinturasListas.map((pintura) => (
              <article
                key={pintura.id}
                className="tarjeta-pintura"
                style={{ '--color-obra': pintura.color, '--color-suave-obra': pintura.colorSuave }}
              >
                <div
                  className="tarjeta-pintura__visual tarjeta-pintura__visual--clickable"
                  onClick={() => pintura.imagen && setImagenModal(pintura)}
                  title="Toca para ver la imagen en grande"
                >
                  {pintura.imagen ? (
                    <>
                      <img src={pintura.imagen} alt={pintura.titulo} loading="lazy" />
                      <div className="tarjeta-pintura__hover-zoom">
                        <ZoomIn size={24} strokeWidth={2.2} />
                        <span>Ver en grande</span>
                      </div>
                    </>
                  ) : (
                    <div className="tarjeta-pintura__placeholder">
                      <span className="tarjeta-pintura__placeholder-icono">
                        <Palette size={28} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span>{pintura.titulo}</span>
                    </div>
                  )}
                  <span className="tarjeta-pintura__tecnica">{pintura.tecnica}</span>
                </div>

                <div className="tarjeta-pintura__cuerpo">
                  <h3 className="tarjeta-pintura__titulo">{pintura.titulo}</h3>
                  <p className="tarjeta-pintura__autor">{pintura.autor}</p>
                  <p className="tarjeta-pintura__descripcion">{pintura.descripcion}</p>

                  <button
                    type="button"
                    className={`boton boton--pequeno tarjeta-pintura__boton${reproduciendo === pintura.id ? ' tarjeta-pintura__boton--activo' : ''
                      }`}
                    onClick={() =>
                      escucharDescripcion(
                        pintura.id,
                        `${pintura.titulo}, obra de ${pintura.autor}. ${pintura.descripcion}`,
                        pintura.descripcionAudio,
                      )
                    }
                  >
                    {reproduciendo === pintura.id ? (
                      <Pause size={16} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                      <Headphones size={16} strokeWidth={2.2} aria-hidden="true" />
                    )}
                    {reproduciendo === pintura.id ? 'Pausar' : 'Escuchar Descripción'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Ventana emergente (Modal) para ver la obra en tamaño completo */}
      {imagenModal && (
        <div className="modal-pintura" onClick={() => setImagenModal(null)}>
          <div className="modal-pintura__contenido" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-pintura__cerrar"
              onClick={() => setImagenModal(null)}
              aria-label="Cerrar vista completa"
            >
              <X size={26} strokeWidth={2.4} />
            </button>
            <div className="modal-pintura__imagen-caja">
              <img
                src={imagenModal.imagen}
                alt={imagenModal.titulo}
                className="modal-pintura__imagen"
              />
            </div>
            <div className="modal-pintura__pie">
              <h3>{imagenModal.titulo}</h3>
              <p><strong>{imagenModal.autor}</strong> &bull; {imagenModal.tecnica}</p>
            </div>
          </div>
        </div>
      )}

      {pestanaActiva === 'videos' && (
        <div className="seccion-arte__panel animar-aparecer">
          <div className="seccion-arte__grilla-videos">
            {videosArteListos.map((video) => (
              <article
                key={video.id}
                className="tarjeta-video"
                style={{ '--color-video': video.color, '--color-suave-video': video.colorSuave }}
              >
                <div className="tarjeta-video__reproductor">
                  {video.archivoVideo ? (
                    video.archivoVideo.includes('youtube.com') || video.archivoVideo.includes('youtu.be') ? (
                      <iframe
                        src={video.archivoVideo}
                        title={video.titulo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video controls poster={video.portada} preload="metadata">
                        <source src={video.archivoVideo} type="video/mp4" />
                        Tu navegador no soporta el video.
                      </video>
                    )
                  ) : (
                    <div className="tarjeta-video__sin-archivo">
                      <Video size={44} strokeWidth={1.6} aria-hidden="true" />
                      <strong>Espacio listo para tu video</strong>
                      <small>Guarda tu video en <code>src/activos/videos/arte/{video.id}.mp4</code></small>
                    </div>
                  )}
                  {video.duracion && <span className="tarjeta-video__duracion">{video.duracion}</span>}
                </div>

                <div className="tarjeta-video__cuerpo">
                  <h3 className="tarjeta-video__titulo">{video.titulo}</h3>
                  <p className="tarjeta-video__descripcion">{video.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {pestanaActiva === 'colores' && (
        <div className="seccion-arte__panel animar-aparecer">
          <SeccionColores />
        </div>
      )}
    </section>
  )
}
