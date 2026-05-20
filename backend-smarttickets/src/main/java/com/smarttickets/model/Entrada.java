package com.smarttickets.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double precioFinal;

    @Enumerated(EnumType.STRING)
    private EstadoEntrada estado = EstadoEntrada.ACTIVA;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @OneToOne
    @JoinColumn(name = "asiento_id")
    private Asiento asiento;

    public abstract Double calcularPrecio(Double precioBase);

    public void cancelar() {
        this.estado = EstadoEntrada.CANCELADA;
    }

    public void usar() {
        if (this.estado != EstadoEntrada.ACTIVA) {
            throw new IllegalStateException("La entrada no se puede usar.");
        }

        this.estado = EstadoEntrada.USADA;
    }
}