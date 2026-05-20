import { Asiento } from './asiento.model';
import { Evento } from './evento.model';
import { Usuario } from './usuario.model';

export type EstadoEntrada = 'ACTIVA' | 'USADA' | 'CANCELADA';
export type TipoEntrada = 'GENERAL' | 'VIP' | 'PREFERENCIAL';

export interface Entrada {
  id: number;
  precioFinal: number;
  estado: EstadoEntrada;
  usuario: Usuario;
  evento: Evento;
  asiento: Asiento;
}

export interface CompraEntradaRequest {
  eventoId: number;
  usuarioId: number;
  asientoId: number;
  tipoEntrada: TipoEntrada;
}