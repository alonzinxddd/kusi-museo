import { animalesListos } from '../../datos/animales'
import { TarjetaAnimal } from '../tarjeta-animal/TarjetaAnimal'
import './SeccionAnimales.css'

export function SeccionAnimales() {
  return (
    <section className="seccion-animales" aria-labelledby="titulo-animales">
      <div className="encabezado-seccion">
        <div>
          <p className="etiqueta">Conoce a los animales</p>
          <h2 id="titulo-animales">Tarjetas de animales</h2>
        </div>
        <p>
          Toca cada tarjeta para escuchar el sonido del animal o su descripción narrada. Puedes
          repetir las veces que quieras.
        </p>
      </div>

      <div className="seccion-animales__grilla">
        {animalesListos.map((animal) => (
          <TarjetaAnimal
            key={animal.id}
            animal={animal}
            imagen={animal.imagen}
            sonido={animal.sonido}
            descripcionAudio={animal.descripcionAudio}
          />
        ))}
      </div>
    </section>
  )
}
