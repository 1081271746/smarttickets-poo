package com.smarttickets.service;

import com.smarttickets.model.Evento;
import com.smarttickets.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public List<Evento> listarEventos() {
        return eventoRepository.findAll();
    }

    public Evento buscarPorId(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
    }

    public Evento guardarEvento(Evento evento) {
        if (evento.getEntradasDisponibles() == null) {
            evento.setEntradasDisponibles(evento.getCapacidadTotal());
        }

        return eventoRepository.save(evento);
    }

    public void eliminarEvento(Long id) {
        Evento evento = buscarPorId(id);
        eventoRepository.delete(evento);
    }
}