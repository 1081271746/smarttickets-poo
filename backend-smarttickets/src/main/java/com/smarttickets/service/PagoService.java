package com.smarttickets.service;

import com.smarttickets.model.Entrada;
import com.smarttickets.model.EstadoPago;
import com.smarttickets.model.MetodoPago;
import com.smarttickets.model.Pago;
import com.smarttickets.repository.EntradaRepository;
import com.smarttickets.repository.PagoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PagoService {

    private final PagoRepository pagoRepository;
    private final EntradaRepository entradaRepository;

    public PagoService(PagoRepository pagoRepository, EntradaRepository entradaRepository) {
        this.pagoRepository = pagoRepository;
        this.entradaRepository = entradaRepository;
    }

    public List<Pago> listarPagos() {
        return pagoRepository.findAll();
    }

    public Pago registrarPago(Long entradaId, MetodoPago metodoPago) {
        Entrada entrada = entradaRepository.findById(entradaId)
                .orElseThrow(() -> new RuntimeException("Entrada no encontrada con id: " + entradaId));

        Pago pago = new Pago();
        pago.setEntrada(entrada);
        pago.setMonto(entrada.getPrecioFinal());
        pago.setMetodoPago(metodoPago);
        pago.setEstadoPago(EstadoPago.PENDIENTE);
        pago.setFechaPago(LocalDateTime.now());

        return pagoRepository.save(pago);
    }

    public Pago aprobarPago(Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado con id: " + pagoId));

        pago.aprobar();

        if (pago.getEntrada() != null && pago.getEntrada().getAsiento() != null) {
            pago.getEntrada().getAsiento().ocupar();
        }

        return pagoRepository.save(pago);
    }

    public Pago rechazarPago(Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado con id: " + pagoId));

        pago.rechazar();

        return pagoRepository.save(pago);
    }
}