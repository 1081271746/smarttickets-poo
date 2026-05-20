import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Pago } from '../../models/pago.model';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos implements OnInit {
  pagos: Pago[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private pagoService: PagoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pagoService.listarPagos().subscribe({
      next: (data) => {
        this.pagos = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los pagos registrados.';
        this.isLoading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  formatearFecha(fecha: string): string {
    if (!fecha) {
      return 'Sin fecha registrada';
    }

    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}