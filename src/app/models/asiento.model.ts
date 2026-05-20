import { Evento } from './evento.model';

export type EstadoAsiento = 'DISPONIBLE' | 'RESERVADO' | 'OCUPADO';

export interface Asiento {
  id: number;
  fila: string;
  numero: number;
  estado: EstadoAsiento;
  evento: Evento;
}