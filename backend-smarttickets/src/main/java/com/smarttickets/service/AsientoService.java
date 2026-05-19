package com.smarttickets.service;

import com.smarttickets.model.Asiento;
import com.smarttickets.model.EstadoAsiento;
import com.smarttickets.model.Evento;
import com.smarttickets.repository.AsientoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsientoService {

    private final AsientoRepository asientoRepository;
    private final EventoService eventoService;

    public AsientoService(AsientoRepository asientoRepository, EventoService eventoService) {
        this.asientoRepository = asientoRepository;
        this.eventoService = eventoService;
    }

    public List<Asiento> listarPorEvento(Long eventoId) {
        return asientoRepository.findByEventoId(eventoId);
    }

    public List<Asiento> listarDisponiblesPorEvento(Long eventoId) {
        return asientoRepository.findByEventoIdAndEstado(eventoId, EstadoAsiento.DISPONIBLE);
    }

    public Asiento buscarPorId(Long id) {
        return asientoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado con id: " + id));
    }

    public Asiento crearAsiento(Long eventoId, String fila, Integer numero) {
        Evento evento = eventoService.buscarPorId(eventoId);

        Asiento asiento = new Asiento(fila, numero, evento);

        return asientoRepository.save(asiento);
    }
}