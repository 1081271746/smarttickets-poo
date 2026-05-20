import { Routes } from '@angular/router';
import { Eventos } from './pages/eventos/eventos';
import { EventoDetalle } from './pages/evento-detalle/evento-detalle';
import { Pagos } from './pages/pagos/pagos';

export const routes: Routes = [
  {
    path: '',
    component: Eventos
  },
  {
    path: 'eventos/:id',
    component: EventoDetalle
  },
  {
    path: 'pagos',
    component: Pagos
  }
];