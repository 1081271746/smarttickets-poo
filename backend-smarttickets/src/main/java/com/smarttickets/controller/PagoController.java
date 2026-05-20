package com.smarttickets.controller;

import com.smarttickets.dto.PagoRequest;
import com.smarttickets.model.Pago;
import com.smarttickets.service.PagoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    private final PagoService pagoService;

    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @GetMapping
    public List<Pago> listarPagos() {
        return pagoService.listarPagos();
    }

    @PostMapping
    public Pago registrarPago(@RequestBody PagoRequest request) {
        return pagoService.registrarPago(
                request.entradaId(),
                request.metodoPago()
        );
    }

    @PutMapping("/{id}/aprobar")
    public Pago aprobarPago(@PathVariable Long id) {
        return pagoService.aprobarPago(id);
    }

    @PutMapping("/{id}/rechazar")
    public Pago rechazarPago(@PathVariable Long id) {
        return pagoService.rechazarPago(id);
    }
}