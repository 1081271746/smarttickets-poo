package com.smarttickets.dto;

public record CrearAsientoRequest(
        Long eventoId,
        String fila,
        Integer numero
) {
}