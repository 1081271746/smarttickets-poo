package com.smarttickets.dto;

import com.smarttickets.model.MetodoPago;

public record PagoRequest(
        Long entradaId,
        MetodoPago metodoPago
) {
}