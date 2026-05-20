import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = 'https://smarttickets-backend.onrender.com/api/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
}