import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago, PagoRequest } from '../models/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private readonly apiUrl = 'https://smarttickets-backend.onrender.com/api/pagos';

  constructor(private http: HttpClient) {}

  listarPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  registrarPago(request: PagoRequest): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, request);
  }

  aprobarPago(id: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${id}/aprobar`, null);
  }

  rechazarPago(id: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${id}/rechazar`, null);
  }
}