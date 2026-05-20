package com.smarttickets.controller;

import com.smarttickets.model.Concierto;
import com.smarttickets.model.Conferencia;
import com.smarttickets.model.Evento;
import com.smarttickets.model.Festival;
import com.smarttickets.service.EventoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping
    public List<Evento> listarEventos() {
        return eventoService.listarEventos();
    }

    @GetMapping("/{id}")
    public Evento buscarEventoPorId(@PathVariable Long id) {
        return eventoService.buscarPorId(id);
    }

    @PostMapping("/conciertos")
    public Evento crearConcierto(@RequestBody Concierto concierto) {
        return eventoService.guardarEvento(concierto);
    }

    @PostMapping("/conferencias")
    public Evento crearConferencia(@RequestBody Conferencia conferencia) {
        return eventoService.guardarEvento(conferencia);
    }

    @PostMapping("/festivales")
    public Evento crearFestival(@RequestBody Festival festival) {
        return eventoService.guardarEvento(festival);
    }

    @DeleteMapping("/{id}")
    public void eliminarEvento(@PathVariable Long id) {
        eventoService.eliminarEvento(id);
    }
}