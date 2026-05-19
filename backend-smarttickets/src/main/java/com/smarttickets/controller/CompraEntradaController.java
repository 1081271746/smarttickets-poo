package com.smarttickets.controller;

import com.smarttickets.dto.CompraEntradaRequest;
import com.smarttickets.model.Entrada;
import com.smarttickets.service.CompraEntradaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compras")
public class CompraEntradaController {

    private final CompraEntradaService compraEntradaService;

    public CompraEntradaController(CompraEntradaService compraEntradaService) {
        this.compraEntradaService = compraEntradaService;
    }

    @PostMapping
    public Entrada comprarEntrada(@RequestBody CompraEntradaRequest request) {
        return compraEntradaService.comprarEntrada(
                request.eventoId(),
                request.usuarioId(),
                request.asientoId(),
                request.tipoEntrada()
        );
    }
}