import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly apiUrl = 'https://smarttickets-backend.onrender.com/api/eventos';

  constructor(private http: HttpClient) {}

  listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }
}