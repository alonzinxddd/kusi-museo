import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProveedorSonido } from './contextos/SonidoContexto'
import { ProveedorProgreso } from './contextos/ProgresoContexto'
import { ProveedorGaleria } from './contextos/GaleriaContexto'
import { Disposicion } from './componentes/disposicion/Disposicion'
import { Inicio } from './paginas/inicio/Inicio'
import { Sala } from './paginas/sala/Sala'
import { Pintar } from './paginas/pintar/Pintar'
import { Rompecabezas } from './paginas/rompecabezas/Rompecabezas'
import { Tesoro } from './paginas/tesoro/Tesoro'
import { Cuento } from './paginas/cuento/Cuento'
import { Sonidos } from './paginas/sonidos/Sonidos'
import { MiRincon } from './paginas/coleccion/MiRincon'
import { ParaAcompanantes } from './paginas/acompanantes/ParaAcompanantes'
import { NoEncontrada } from './paginas/no-encontrada/NoEncontrada'

export default function App() {
  return (
    <BrowserRouter>
      <ProveedorSonido>
        <ProveedorProgreso>
          <ProveedorGaleria>
            <Routes>
              <Route element={<Disposicion />}>
                <Route index element={<Inicio />} />
                <Route path="salas/:idSala" element={<Sala />} />
                <Route path="salas/:idSala/pintar/:idLamina" element={<Pintar />} />
                <Route path="salas/:idSala/rompecabezas/:idPuzzle" element={<Rompecabezas />} />
                <Route path="salas/:idSala/tesoro" element={<Tesoro />} />
                <Route path="salas/:idSala/cuento/:idCuento" element={<Cuento />} />
                <Route path="salas/:idSala/hacer-sonidos/:modo" element={<Sonidos />} />
                <Route path="mi-rincon" element={<MiRincon />} />
                <Route path="para-acompanantes" element={<ParaAcompanantes />} />
                <Route path="*" element={<NoEncontrada />} />
              </Route>
            </Routes>
          </ProveedorGaleria>
        </ProveedorProgreso>
      </ProveedorSonido>
    </BrowserRouter>
  )
}
