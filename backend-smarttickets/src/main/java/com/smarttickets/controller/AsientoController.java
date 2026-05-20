package com.smarttickets.controller;

import com.smarttickets.dto.CrearAsientoRequest;
import com.smarttickets.model.Asiento;
import com.smarttickets.service.AsientoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asientos")
public class AsientoController {

    private final AsientoService asientoService;

    public AsientoController(AsientoService asientoService) {
        this.asientoService = asientoService;
    }

    @GetMapping("/evento/{eventoId}")
    public List<Asiento> listarPorEvento(@PathVariable Long eventoId) {
        return asientoService.listarPorEvento(eventoId);
    }

    @GetMapping("/evento/{eventoId}/disponibles")
    public List<Asiento> listarDisponiblesPorEvento(@PathVariable Long eventoId) {
        return asientoService.listarDisponiblesPorEvento(eventoId);
    }

    @PostMapping
    public Asiento crearAsiento(@RequestBody CrearAsientoRequest request) {
        return asientoService.crearAsiento(
                request.eventoId(),
                request.fila(),
                request.numero()
        );
    }
}