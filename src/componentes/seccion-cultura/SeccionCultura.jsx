import { useState, useRef, useEffect } from 'react'
import { categoriasCultura, elementosCulturaListos } from '../../datos/cultura'
import { MapPin, Headphones, Pause, Music, Sparkles, Video, X } from 'lucide-react'
import { hablar, vozDisponible } from '../../servicios/voz'
import './SeccionCultura.css'

export function SeccionCultura() {
  const [categoriaActiva, setCategoriaActiva] = useState('danzas')
  const [reproduciendoDesc, setReproduciendoDesc] = useState(null)
  const [videoModal, setVideoModal] = useState(null) // objeto del elemento para ver video
  const audioRef = useRef(null)

  const detenerAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setReproduciendoDesc(null)
  }

  useEffect(() => () => detenerAudio(), [])

  const escucharDescripcion = (id, url, textoAlternativo) => {
    if (reproduciendoDesc === id) {
      detenerAudio()
      return
    }

    detenerAudio()

    if (url) {
      const audio = new Audio(url)
      audioRef.current = audio
      audio.addEventListener('ended', () => {
        setReproduciendoDesc(null)
        audioRef.current = null
      })
      audio.play().catch(() => {
        if (vozDisponible()) {
          hablar(textoAlternativo, { onEnd: () => setReproduciendoDesc(null) })
        }
      })
      setReproduciendoDesc(id)
    } else if (vozDisponible()) {
      hablar(textoAlternativo, {
        onEnd: () => setReproduciendoDesc(null),
        onError: () => setReproduciendoDesc(null),
      })
      setReproduciendoDesc(id)
    }
  }

  const abrirVideo = (elem) => {
    detenerAudio()
    setVideoModal(elem)
  }

  const cerrarVideo = () => {
    setVideoModal(null)
  }

  const elementosVisibles = elementosCulturaListos.filter(
    (item) => item.categoria === categoriaActiva,
  )

  return (
    <section className="seccion-cultura" aria-labelledby="titulo-cultura">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">
            <Sparkles size={14} aria-hidden="true" />
            Nuestras Raíces y Costumbres
          </p>
          <h2 id="titulo-cultura">Cultura y Tradiciones del Perú</h2>
        </div>
        <p>
          Explora las danzas típicas y las fiestas tradicionales más hermosas de nuestro país. Toca
          para ver sus vídeos o escuchar su historia narrada.
        </p>
      </div>

      {/* Pestañas de Danzas vs Fiestas */}
      <div className="seccion-cultura__pestanas" role="tablist">
        {categoriasCultura.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={categoriaActiva === cat.id}
            className={`seccion-cultura__pestana${
              categoriaActiva === cat.id ? ' seccion-cultura__pestana--activa' : ''
            }`}
            onClick={() => {
              detenerAudio()
              setCategoriaActiva(cat.id)
            }}
          >
            {cat.id === 'danzas' ? (
              <Music size={18} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Sparkles size={18} strokeWidth={2.2} aria-hidden="true" />
            )}
            <span>{cat.nombre}</span>
          </button>
        ))}
      </div>

      <div className="seccion-cultura__grilla animar-aparecer">
        {elementosVisibles.map((elem) => {
          const sonandoDesc = reproduciendoDesc === elem.id

          return (
            <article
              key={elem.id}
              className="tarjeta-cultura"
              style={{ '--color-cultura': elem.color, '--color-suave-cultura': elem.colorSuave }}
            >
              <div className="tarjeta-cultura__imagen">
                {elem.imagen ? (
                  <img src={elem.imagen} alt={elem.nombre} loading="lazy" />
                ) : (
                  <div className="tarjeta-cultura__placeholder">
                    <span className="tarjeta-cultura__placeholder-icono">
                      {elem.categoria === 'danzas' ? (
                        <Music size={28} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Sparkles size={28} strokeWidth={2} aria-hidden="true" />
                      )}
                    </span>
                    <span>{elem.nombre}</span>
                  </div>
                )}
                <span className="tarjeta-cultura__origen">
                  <MapPin size={14} strokeWidth={2.4} aria-hidden="true" />
                  {elem.origen}
                </span>
              </div>

              <div className="tarjeta-cultura__cuerpo">
                <h3 className="tarjeta-cultura__nombre">{elem.nombre}</h3>
                <p className="tarjeta-cultura__descripcion">{elem.descripcion}</p>

                <div className="tarjeta-cultura__acciones">
                  <button
                    type="button"
                    className="boton boton--pequeno tarjeta-cultura__boton tarjeta-cultura__boton--video"
                    onClick={() => abrirVideo(elem)}
                    aria-label={`Reproducir vídeo de ${elem.nombre}`}
                  >
                    <Video size={16} strokeWidth={2.2} aria-hidden="true" />
                    Reproducir Vídeo
                  </button>

                  <button
                    type="button"
                    className={`boton boton--pequeno tarjeta-cultura__boton tarjeta-cultura__boton--descripcion${
                      sonandoDesc ? ' tarjeta-cultura__boton--activo' : ''
                    }`}
                    onClick={() =>
                      escucharDescripcion(
                        elem.id,
                        elem.descripcionAudio,
                        `${elem.nombre}, originaria de ${elem.origen}. ${elem.descripcion}`,
                      )
                    }
                    aria-label={`Escuchar descripción de ${elem.nombre}`}
                  >
                    {sonandoDesc ? (
                      <Pause size={16} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                      <Headphones size={16} strokeWidth={2.2} aria-hidden="true" />
                    )}
                    Escuchar Descripción
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Modal / Reproductor de Vídeo */}
      {videoModal && (
        <div className="modal-video" role="dialog" aria-modal="true" aria-label={`Vídeo de ${videoModal.nombre}`}>
          <div className="modal-video__fondo" onClick={cerrarVideo} />
          <div className="modal-video__contenido animar-escala">
            <header className="modal-video__cabecera">
              <div className="modal-video__titulo-bloque">
                <span className="modal-video__icono" aria-hidden="true">
                  <Video size={20} strokeWidth={2.2} />
                </span>
                <div>
                  <h3>{videoModal.nombre}</h3>
                  <small>{videoModal.origen}</small>
                </div>
              </div>
              <button
                type="button"
                className="modal-video__cerrar"
                onClick={cerrarVideo}
                aria-label="Cerrar reproductor de vídeo"
              >
                <X size={22} strokeWidth={2.4} aria-hidden="true" />
              </button>
            </header>

            <div className="modal-video__pantalla">
              {videoModal.videoUrl ? (
                videoModal.videoUrl.includes('youtube.com') || videoModal.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={videoModal.videoUrl}
                    title={videoModal.nombre}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls autoPlay poster={videoModal.imagen} preload="metadata">
                    <source src={videoModal.videoUrl} type="video/mp4" />
                    Tu navegador no soporta reproducción de video.
                  </video>
                )
              ) : (
                <div className="modal-video__sin-archivo">
                  <Video size={56} strokeWidth={1.5} aria-hidden="true" />
                  <h4>Espacio listo para tu vídeo</h4>
                  <p>Guarda el archivo en:</p>
                  <code>src/activos/videos/cultura/{videoModal.id}.mp4</code>
                  <small>o añade un enlace en <code>src/datos/cultura.js</code> con <code>videoUrl: "..."</code></small>
                </div>
              )}
            </div>

            <footer className="modal-video__pie">
              <p>{videoModal.descripcion}</p>
            </footer>
          </div>
        </div>
      )}
    </section>
  )
}
