package com.smarttickets.model;

import jakarta.persistence.Entity;

@Entity
public class EntradaPreferencial extends Entrada {

    @Override
    public Double calcularPrecio(Double precioBase) {
        return precioBase * 1.3;
    }
}