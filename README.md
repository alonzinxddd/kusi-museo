# Kusi · Museo virtual infantil

Frontend estático (React + Vite) para un museo virtual dirigido a niños de 3 a 5 años.
No requiere backend: todo el progreso, los sellos y la galería se guardan en el navegador.

## Estructura

```
src/
  activos/        imágenes (.svg), audios (.wav) y fuentes
  componentes/    piezas reutilizables (barra, pie, modal, tarjetas, etc.)
  contextos/      progreso, galería y preferencia de sonido
  datos/          salas, actividades, colección, cuentos, sonidos, láminas
  estilos/        variables, global y animaciones
  paginas/        una carpeta por página (jsx + css)
  servicios/       almacenamiento, audio, voz, exportación de imágenes
  utilidades/     ayudantes y hooks
herramientas/     generar-audios.mjs (crea los .wav)
```

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run audios     # regenera los archivos .wav
```

## Mantenimiento

- **Nueva sala**: agregar entrada en `src/datos/salas.js`, su imagen en `src/activos/imagenes/salas/` y sus actividades en `src/datos/actividades.js`.
- **Nueva actividad**: crear la ruta en `src/App.jsx`, la página en `src/paginas/` y, si entrega sello, añadirlo en `src/datos/coleccion.js`.
- **Nueva lámina para colorear**: dejar el `.svg` en `src/activos/imagenes/colorear/` (con nodos `[data-region]`) y registrarlo en `src/datos/laminas.js`.
- **Nuevo audio**: añadirlo en `herramientas/generar-audios.mjs`, ejecutar `npm run audios` y referenciarlo en `src/datos/sonidos.js`.
- **Iconos**: `src/componentes/icono/Icono.jsx` mapea nombres a íconos de `lucide-react`.

## Notas pedagógicas

- Sin competencia, puntajes, temporizadores ni castigos.
- Recompensas suaves: +3 estrellitas por sello nuevo (10 en total).
- Guía por voz mediante Web Speech API; los audios propios son archivos `.wav`.
- Todo se guarda en `localStorage`; no hay backend ni datos personales.
