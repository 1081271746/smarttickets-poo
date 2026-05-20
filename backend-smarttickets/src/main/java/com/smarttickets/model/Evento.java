package com.smarttickets.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String descripcion;

    private String lugar;

    private LocalDateTime fecha;

    private Double precioBase;

    private Integer capacidadTotal;

    private Integer entradasDisponibles;

    public boolean tieneDisponibilidad() {
        return entradasDisponibles != null && entradasDisponibles > 0;
    }

    public void reducirDisponibilidad() {
        if (!tieneDisponibilidad()) {
            throw new IllegalStateException("No hay entradas disponibles para este evento.");
        }

        this.entradasDisponibles--;
    }
}