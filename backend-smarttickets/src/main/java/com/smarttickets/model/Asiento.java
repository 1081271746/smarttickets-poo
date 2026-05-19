package com.smarttickets.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Asiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fila;

    private Integer numero;

    @Enumerated(EnumType.STRING)
    private EstadoAsiento estado = EstadoAsiento.DISPONIBLE;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    public Asiento(String fila, Integer numero, Evento evento) {
        this.fila = fila;
        this.numero = numero;
        this.evento = evento;
        this.estado = EstadoAsiento.DISPONIBLE;
    }

    public void reservar() {
        if (this.estado != EstadoAsiento.DISPONIBLE) {
            throw new IllegalStateException("El asiento no está disponible.");
        }

        this.estado = EstadoAsiento.RESERVADO;
    }

    public void ocupar() {
        if (this.estado != EstadoAsiento.RESERVADO) {
            throw new IllegalStateException("El asiento debe estar reservado antes de ocuparlo.");
        }

        this.estado = EstadoAsiento.OCUPADO;
    }

    public boolean estaDisponible() {
        return this.estado == EstadoAsiento.DISPONIBLE;
    }
}