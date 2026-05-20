import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompraEntradaRequest, Entrada } from '../models/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private readonly apiUrl = 'https://smarttickets-backend.onrender.com/api/compras';

  constructor(private http: HttpClient) {}

  comprarEntrada(request: CompraEntradaRequest): Observable<Entrada> {
    return this.http.post<Entrada>(this.apiUrl, request);
  }
}