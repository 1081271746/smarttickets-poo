package com.smarttickets.service;

import com.smarttickets.model.*;
import com.smarttickets.repository.AsientoRepository;
import com.smarttickets.repository.EntradaRepository;
import com.smarttickets.repository.EventoRepository;
import com.smarttickets.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CompraEntradaService {

    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AsientoRepository asientoRepository;
    private final EntradaRepository entradaRepository;

    public CompraEntradaService(
            EventoRepository eventoRepository,
            UsuarioRepository usuarioRepository,
            AsientoRepository asientoRepository,
            EntradaRepository entradaRepository
    ) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
        this.asientoRepository = asientoRepository;
        this.entradaRepository = entradaRepository;
    }

    @Transactional
    public Entrada comprarEntrada(Long eventoId, Long usuarioId, Long asientoId, String tipoEntrada) {
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + eventoId));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        Asiento asiento = asientoRepository.findById(asientoId)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado con id: " + asientoId));

        if (!asiento.estaDisponible()) {
            throw new RuntimeException("El asiento seleccionado no está disponible.");
        }

        if (!evento.tieneDisponibilidad()) {
            throw new RuntimeException("No hay entradas disponibles para este evento.");
        }

        Entrada entrada = crearEntradaPorTipo(tipoEntrada);

        Double precioFinal = entrada.calcularPrecio(evento.getPrecioBase());

        asiento.reservar();
        evento.reducirDisponibilidad();

        entrada.setEvento(evento);
        entrada.setUsuario(usuario);
        entrada.setAsiento(asiento);
        entrada.setPrecioFinal(precioFinal);

        asientoRepository.save(asiento);
        eventoRepository.save(evento);

        return entradaRepository.save(entrada);
    }

    private Entrada crearEntradaPorTipo(String tipoEntrada) {
        if (tipoEntrada == null) {
            throw new RuntimeException("El tipo de entrada es obligatorio.");
        }

        return switch (tipoEntrada.toUpperCase()) {
            case "GENERAL" -> new EntradaGeneral();
            case "VIP" -> new EntradaVip();
            case "PREFERENCIAL" -> new EntradaPreferencial();
            default -> throw new RuntimeException("Tipo de entrada no válido: " + tipoEntrada);
        };
    }
}