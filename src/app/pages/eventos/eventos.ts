import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, RouterLink],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class Eventos implements OnInit {
  eventos: Evento[] = [];
  mostrarEventos = false;
  menuAbierto = false;
  isLoading = true;
  errorMessage = '';

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los eventos.';
        this.isLoading = false;
      }
    });
  }

  cambiarVistaEventos(): void {
    this.mostrarEventos = !this.mostrarEventos;
  }

  abrirMenu(): void {
    this.menuAbierto = true;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  mostrarSeccionEventos(): void {
    this.mostrarEventos = true;
    this.cerrarMenu();
  }

  verDetalle(eventoId: number): void {
    this.router.navigate(['/eventos', eventoId]);
  }

  eventoAgotado(evento: Evento): boolean {
    return evento.entradasDisponibles <= 0;
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}