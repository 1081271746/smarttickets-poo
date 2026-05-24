package com.smarttickets.controller;

import com.smarttickets.model.Usuario;
import com.smarttickets.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // LISTAR USUARIOS
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    // LOGIN
    @PostMapping("/login")
    public Usuario iniciarSesion(@RequestBody Map<String, String> datos) {

        String correo = datos.get("correo");
        String contrasena = datos.get("contrasena");

        return usuarioService.iniciarSesion(correo, contrasena);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Usuario buscarUsuarioPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // CREAR USUARIO
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    // ELIMINAR USUARIO
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
    }
}