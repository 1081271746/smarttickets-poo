package com.smarttickets.dto;

public record CompraEntradaRequest(
        Long eventoId,
        Long usuarioId,
        Long asientoId,
        String tipoEntrada
) {
}