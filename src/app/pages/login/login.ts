import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  contrasena = '';
  mensajeError = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  iniciarSesion(): void {

    this.mensajeError = '';

    console.log('Intentando login...');

    this.usuarioService
      .iniciarSesion(
        this.correo,
        this.contrasena
      )
      .subscribe({

        next: (usuario) => {

          console.log('LOGIN OK', usuario);

          localStorage.setItem(
            'usuario',
            JSON.stringify(usuario)
          );

          // IR A EVENTOS
          this.router.navigate(['/eventos']);
        },

        error: (error) => {

          console.error(
            'ERROR LOGIN',
            error
          );

          this.mensajeError =
            'Correo o contraseña incorrectos';
        }
      });
  }
}