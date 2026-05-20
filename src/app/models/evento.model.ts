export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  lugar: string;
  fecha: string;
  precioBase: number;
  capacidadTotal: number;
  entradasDisponibles: number;

  artista?: string;
  generoMusical?: string;
  incluyeMeetAndGreet?: boolean;

  ponente?: string;
  tema?: string;
  entregaCertificado?: boolean;

  numeroEscenarios?: number;
  duracionDias?: number;
  incluyeZonaComida?: boolean;
}