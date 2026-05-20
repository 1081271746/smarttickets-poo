package com.smarttickets.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Concierto extends Evento {

    private String artista;

    private String generoMusical;

    private Boolean incluyeMeetAndGreet;
}