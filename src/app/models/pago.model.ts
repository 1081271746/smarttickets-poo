import { Entrada } from './entrada.model';

export type MetodoPago = 'TARJETA' | 'TRANSFERENCIA' | 'PSE' | 'EFECTIVO';
export type EstadoPago = 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

export interface Pago {
  id: number;
  monto: number;
  fechaPago: string;
  metodoPago: MetodoPago;
  estadoPago: EstadoPago;
  entrada: Entrada;
}

export interface PagoRequest {
  entradaId: number;
  metodoPago: MetodoPago;
}