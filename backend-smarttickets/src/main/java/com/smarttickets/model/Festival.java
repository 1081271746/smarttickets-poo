package com.smarttickets.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Festival extends Evento {

    private Integer numeroEscenarios;

    private Integer duracionDias;

    private Boolean incluyeZonaComida;
}