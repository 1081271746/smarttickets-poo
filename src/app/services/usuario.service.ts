import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Backend LOCAL para pruebas del login
  private readonly apiUrl =
    'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(
      this.apiUrl,
      usuario
    );
  }

  iniciarSesion(
    correo: string,
    contrasena: string
  ): Observable<Usuario> {

    return this.http.post<Usuario>(
      `${this.apiUrl}/login`,
      {
        correo,
        contrasena
      }
    );
  }
}