import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Evento } from '../../models/evento.model';
import { Asiento } from '../../models/asiento.model';
import { Entrada, TipoEntrada } from '../../models/entrada.model';
import { MetodoPago, Pago } from '../../models/pago.model';

import { EventoService } from '../../services/evento.service';
import { AsientoService } from '../../services/asiento.service';
import { CompraService } from '../../services/compra.service';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-evento-detalle',
  imports: [CommonModule, FormsModule],
  templateUrl: './evento-detalle.html',
  styleUrl: './evento-detalle.css'
})
export class EventoDetalle implements OnInit {
  evento?: Evento;
  asientos: Asiento[] = [];

  eventoId = 0;
  usuarioId = 2;

  asientoSeleccionadoId?: number;
  tipoEntradaSeleccionada: TipoEntrada = 'GENERAL';
  metodoPagoSeleccionado: MetodoPago = 'PSE';

  mostrarPanelPago = false;

  entradaComprada?: Entrada;
  pagoRegistrado?: Pago;
  pagoConfirmado?: Pago;

  isLoading = true;
  isBuying = false;
  isPaying = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private asientoService: AsientoService,
    private compraService: CompraService,
    private pagoService: PagoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Evento no válido.';
      this.isLoading = false;
      return;
    }

    this.eventoId = id;
    this.cargarDetalle();
  }

  cargarDetalle(): void {
    this.isLoading = true;

    this.eventoService.buscarPorId(this.eventoId).subscribe({
      next: (evento) => {
        this.evento = evento;
        this.cargarAsientos();
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el evento.';
        this.isLoading = false;
      }
    });
  }

  cargarAsientos(): void {
    this.asientoService.listarPorEvento(this.eventoId).subscribe({
      next: (asientos) => {
        this.asientos = asientos;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los asientos.';
        this.isLoading = false;
      }
    });
  }

  seleccionarAsiento(asiento: Asiento): void {
    if (asiento.estado !== 'DISPONIBLE') {
      return;
    }

    this.asientoSeleccionadoId = asiento.id;
    this.mostrarPanelPago = false;
    this.entradaComprada = undefined;
    this.pagoRegistrado = undefined;
    this.pagoConfirmado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  continuarAlPago(): void {
    if (!this.hayAsientosDisponibles()) {
      this.errorMessage = 'No hay asientos disponibles para este evento.';
      return;
    }

    if (!this.asientoSeleccionadoId) {
      this.errorMessage = 'Selecciona un asiento disponible antes de continuar.';
      return;
    }

    this.mostrarPanelPago = true;
    this.errorMessage = '';
    this.successMessage = 'Entrada lista para pago. Confirma el método de pago para finalizar.';
  }

  registrarPago(): void {
    if (!this.asientoSeleccionadoId) {
      this.errorMessage = 'Selecciona un asiento disponible antes de pagar.';
      return;
    }

    this.isPaying = true;
    this.isBuying = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.compraService.comprarEntrada({
      eventoId: this.eventoId,
      usuarioId: this.usuarioId,
      asientoId: this.asientoSeleccionadoId,
      tipoEntrada: this.tipoEntradaSeleccionada
    }).subscribe({
      next: (entrada) => {
        this.entradaComprada = entrada;
        this.registrarPagoDeEntrada(entrada.id);
      },
      error: () => {
        this.errorMessage = 'No se pudo generar la entrada.';
        this.isBuying = false;
        this.isPaying = false;
      }
    });
  }

  private registrarPagoDeEntrada(entradaId: number): void {
    this.pagoService.registrarPago({
      entradaId,
      metodoPago: this.metodoPagoSeleccionado
    }).subscribe({
      next: (pago) => {
        this.pagoRegistrado = pago;
        this.aprobarPago(pago.id);
      },
      error: () => {
        this.errorMessage = 'La entrada fue generada, pero no se pudo registrar el pago.';
        this.isBuying = false;
        this.isPaying = false;
      }
    });
  }

  aprobarPago(pagoId: number): void {
    this.pagoService.aprobarPago(pagoId).subscribe({
      next: (pagoAprobado) => {
        this.pagoConfirmado = pagoAprobado;
        this.pagoRegistrado = pagoAprobado;
        this.entradaComprada = undefined;
        this.mostrarPanelPago = false;
        this.asientoSeleccionadoId = undefined;

        this.successMessage = 'Pago aprobado correctamente. Tu entrada fue confirmada.';
        this.isBuying = false;
        this.isPaying = false;

        this.cargarDetalle();
      },
      error: () => {
        this.errorMessage = 'El pago fue registrado, pero no se pudo aprobar.';
        this.isBuying = false;
        this.isPaying = false;
      }
    });
  }

  cancelarPago(): void {
    this.mostrarPanelPago = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  hayAsientosDisponibles(): boolean {
    return this.asientos.some((asiento) => asiento.estado === 'DISPONIBLE');
  }

  obtenerAsientoSeleccionado(): Asiento | undefined {
    return this.asientos.find((asiento) => asiento.id === this.asientoSeleccionadoId);
  }

  calcularPrecioEstimado(): number {
    if (!this.evento) {
      return 0;
    }

    if (this.tipoEntradaSeleccionada === 'VIP') {
      return this.evento.precioBase * 1.8;
    }

    if (this.tipoEntradaSeleccionada === 'PREFERENCIAL') {
      return this.evento.precioBase * 1.3;
    }

    return this.evento.precioBase;
  }

  limpiarConfirmacion(): void {
    this.pagoConfirmado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}