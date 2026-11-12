import {
  AudioLines,
  Bird,
  BookOpen,
  Bug,
  Compass,
  Drum,
  Droplets,
  Footprints,
  Hand,
  Heart,
  HeartPulse,
  Music2,
  MousePointerClick,
  Palette,
  PersonStanding,
  Puzzle,
  Sparkles,
  Star,
  Wind,
} from 'lucide-react'

const mapa = {
  rompecabezas: Puzzle,
  tesoro: Compass,
  compass: Compass,
  manos: Hand,
  pintar: Palette,
  cuento: BookOpen,
  sonidos: Music2,
  corazon: Heart,
  latido: HeartPulse,
  viento: Wind,
  pajaro: Bird,
  rana: Bug,
  agua: Droplets,
  grillo: AudioLines,
  tambor: Drum,
  palmada: Hand,
  muslo: PersonStanding,
  pie: Footprints,
  chasquido: MousePointerClick,
  estrella: Star,
  magia: Sparkles,
}

export function Icono({ nombre, tamano = 26, ...propiedades }) {
  const Componente = mapa[nombre] || Sparkles
  return <Componente size={tamano} strokeWidth={1.9} aria-hidden="true" {...propiedades} />
}
