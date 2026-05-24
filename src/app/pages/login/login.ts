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

    console.log('Botón funcionando');

    this.mensajeError = '';

    this.usuarioService
      .iniciarSesion(
        this.correo,
        this.contrasena
      )
      .subscribe({

        next: (usuario) => {

          console.log('LOGIN EXITOSO');
          console.log(usuario);

          localStorage.setItem(
            'usuario',
            JSON.stringify(usuario)
          );

          this.router.navigateByUrl('/eventos');
        },

        error: (error) => {

          console.log('ERROR LOGIN');
          console.log(error);

          this.mensajeError =
            'Correo o contraseña incorrectos';
        }
      });
  }
}