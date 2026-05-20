import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asiento } from '../models/asiento.model';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  private readonly apiUrl = 'https://smarttickets-backend.onrender.com/api/asientos';

  constructor(private http: HttpClient) {}

  listarPorEvento(eventoId: number): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/evento/${eventoId}`);
  }

  listarDisponiblesPorEvento(eventoId: number): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/evento/${eventoId}/disponibles`);
  }
}