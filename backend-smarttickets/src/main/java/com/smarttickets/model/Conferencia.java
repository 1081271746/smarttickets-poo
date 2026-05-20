package com.smarttickets.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Conferencia extends Evento {

    private String ponente;

    private String tema;

    private Boolean entregaCertificado;
}