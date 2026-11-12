import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BarraNavegacion } from '../barra-navegacion/BarraNavegacion'
import { PiePagina } from '../pie-pagina/PiePagina'
import { FondoAnimado } from '../fondo-animado/FondoAnimado'
import { ModalRecompensa } from '../modal-recompensa/ModalRecompensa'
import { Aviso } from '../aviso/Aviso'
import './Disposicion.css'

export function Disposicion() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(hash.slice(1))
      if (destino) {
        const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        destino.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return (
    <>
      <a className="salto-contenido" href="#contenido">
        Saltar al contenido
      </a>

      <FondoAnimado />
      <BarraNavegacion />

      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>

      <PiePagina />

      <ModalRecompensa />
      <Aviso />
    </>
  )
}
