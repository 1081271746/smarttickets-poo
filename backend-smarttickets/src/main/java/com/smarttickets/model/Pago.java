package com.smarttickets.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double monto;

    private LocalDateTime fechaPago;

    @Enumerated(EnumType.STRING)
    private MetodoPago metodoPago;

    @Enumerated(EnumType.STRING)
    private EstadoPago estadoPago = EstadoPago.PENDIENTE;

    @OneToOne
    @JoinColumn(name = "entrada_id")
    private Entrada entrada;

    public void aprobar() {
        this.estadoPago = EstadoPago.APROBADO;
        this.fechaPago = LocalDateTime.now();
    }

    public void rechazar() {
        this.estadoPago = EstadoPago.RECHAZADO;
    }
}