package com.smarttickets.model;

import jakarta.persistence.Entity;

@Entity
public class EntradaGeneral extends Entrada {

    @Override
    public Double calcularPrecio(Double precioBase) {
        return precioBase;
    }
}