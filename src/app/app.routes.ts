import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Eventos } from './pages/eventos/eventos';
import { EventoDetalle } from './pages/evento-detalle/evento-detalle';
import { Pagos } from './pages/pagos/pagos';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'eventos',
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